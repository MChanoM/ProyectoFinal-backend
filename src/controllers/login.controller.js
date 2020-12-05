import Usuario from "../models/usuarios";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";

const loginCtrl = {};


// LOGIN
loginCtrl.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const usuarioLogueado = await Usuario.findOne({
      usuario: usuario,
    });
    // verifico que exista el usuario
    if(usuarioLogueado){
      // valido password con el metodo validatePassword que cree en el modelo
    const passwordIsValid = await usuarioLogueado.validatePassword(password);
    // si no es valida la contraseña terminamos acá
    if (!passwordIsValid) {
      return res.status(401).json({
        auth: false,
        token: null,
        mensaje: "La contraseña es incorrecta",
      });
    }
    // si el password es valido genero el token
    const token = jsonwebtoken.sign(
      { id: usuarioLogueado._id },
      config.secret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    // modifico el sessionState a true para que pueda loguearse
    usuarioLogueado.sessionState = true;
    await usuarioLogueado.save();

    // res.cookie('tokennewspro',token,{maxAge: 60*60*24, httpOnly:true, secure:false});
    res.status(200).json({
      auth:true,
      token:token
    })
    


    
    }else{
      return res.status(404).json({
        mensaje:"El usuario no existe"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al loguearse",
    });
  }
};

//LOGOUT
loginCtrl.logout = async (req, res) => {
  console.log(req.body._id)
  try {
    // busco con el token primero con el middleware x eso uso el usuarioId de la funcion verificarToken
    const usuarioBuscado = await Usuario.findById(req.body._id);
    
    // verifico si existe el usuario
    if (usuarioBuscado) {
      // si existe validamos primero el session state
      if (usuarioBuscado.sessionState) {
        // el sessionState está en true asiq cerramos la sesion
        usuarioBuscado.sessionState = false;
        await usuarioBuscado.save();
        return res.status(200).json({
          auth: true,
          mensaje: "Sesion cerrada correctamente",
        });
      } else {
        //si la sesion ya estaba cerrada de antes devolver error
        return res.status(500).json({
          mensaje: "La sesion no está abierta",
        });
      }
    } else {
      // si el usuario no existe
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      auth: false,
      token: null,
      mensaje: "Error al cerrar sesion",
    });
  }
};

//recuperar usuario
loginCtrl.recuperar = async (req, res) => {
  try {
    // en caso de que haya token lo vamos a decodificar para verificarlo
    // busco el id decodificado en la bd y le digo q no me traiga la password xq no la quiero
    console.log({email:req.body.email});
    const usuarioBuscado = await Usuario.findOne({email:req.body.email});
    console.log(usuarioBuscado.email);
    if (!usuarioBuscado.email) {
      return res.status(404).send("No user found");
    } else {
      res.json(usuarioBuscado);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      users: false,
      mensaje: "no se encontró usuario",
    });
  }
};




export default loginCtrl;
