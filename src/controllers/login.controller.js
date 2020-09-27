import Usuario from "../models/usuarios";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";

const loginCtrl = {};

// registracion
loginCtrl.signUp = async (req, res) => {
  try {
    const { usuario, password, userType, userActive, email } = req.body;
    const sessionState = false; // apenas me registro no estoy logueado
    const nuevoUsuario = new Usuario({
      usuario,
      password,
      role,
      userActive,
      email,
      sessionState,
    });

    // encripto el password antes de guardarlo
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(
      nuevoUsuario.password
    );
    // console.log(nuevoUsuario);
    // guardo el nuevo usuario en la bd
    await nuevoUsuario.save();

    // genero el token aunque como la sesion está cerrada no sería necesario todavia
    const token = jsonwebtoken.sign({ id: nuevoUsuario._id }, config.secret, {
      expiresIn: 86400,
    });

    res.json({
      auth: true,
      token: token,
      mensaje: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    console.log("Error en signup" + error);
    res.status(500).json({
      mensaje: "Error al crear usuario",
    });
  }
};

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
    usuarioLogueado.save();

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
  try {
    // busco con el token primero con el middleware x eso uso el usuarioId de la funcion verificarToken
    const usuarioBuscado = await Usuario.findById(req.body.usuarioId);
    // verifico si existe el usuario
    if (usuarioBuscado) {
      // si existe validamos primero el session state
      if (usuarioBuscado.sessionState) {
        // el sessionState está en true asiq cerramos la sesion
        usuarioBuscado.sessionState = false;
        usuarioBuscado.save();
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

// crear tipo de usuario
loginCtrl.crearTipoUsuario = async (req, res) => {
  try {
    const { tipoUsuario } = req.body;
    const nuevoTipo = new TiposUsuarios({ tipoUsuario });
    await nuevoTipo.save();
    res.status(201).json({
      mensaje: "Tipo Creado ok",
    });
  } catch (error) {
    res.status(500).json();
    console.log(error);
  }
};

// autenticar
loginCtrl.autenticar = async (req, res) => {
  try {
    // en caso de que haya token lo vamos a decodificar para verificarlo
    // busco el id decodificado en la bd y le digo q no me traiga la password xq no la quiero
    const usuarioBuscado = await Usuario.findById(req.usuarioId, {
      password: 0,
    });
    if (!usuarioBuscado) {
      return res.status(404).send("No user found");
    } else {
      res.json(usuarioBuscado);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      auth: false,
      mensaje: "Token invalido",
    });
  }
};

// eliminar usuarios
loginCtrl.eliminarUsuario = async (req, res) => {
  try {
    //extraigo el id
    const idUsuario = req.params.id;
    // busco si existe primero
    const usuarioBuscado = await Usuario.findById(idUsuario);
    if (usuarioBuscado) {
      await Usuario.findByIdAndRemove(idUsuario);
      res.status(200).json({
        mensaje: "Usuario eliminado correctamente",
      });
    } else {
      return res.status(404).json({
        mensaje: "Usuario no encontrado!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
};

export default loginCtrl;
