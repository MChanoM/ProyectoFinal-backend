import Usuario from '../models/usuarios';
import Role from '../models/role';
import config from "../config";

const userCtrl = {};


// listar usuarios
userCtrl.listarUsuarios = async (req,res) => {
  try {
    const listaUsuarios = await Usuario.find({},{password:0}).populate({path:'role',select:'name'});
    if(listaUsuarios){
      res.status(200).json(listaUsuarios);
    }else{
      res.status(404).json({
        mensaje:'Error al traer lista de usuarios'
      })
    }
  } catch (error) {
    console.log(error);
  }
}


// enviar mis credenciales
userCtrl.autenticar = async (req, res) => {
    try {
      // en caso de que haya token lo vamos a decodificar para verificarlo
      // busco el id decodificado en la bd y le digo q no me traiga la password xq no la quiero
      const usuarioBuscado = await Usuario.findById(req.usuarioId, {
        password: 0,
      }).populate({path:'role',select:'name'});
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

// agregar nuevo usuario

// registracion
userCtrl.signUp = async (req, res) => {
  try {
    const { usuario, password, userActive, email } = req.body;
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


// alta de usuario desde el admin
userCtrl.nuevoUsuario = async (req, res) => {
  try {
    const { usuario, password, userActive, email, role } = req.body;
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

    // // genero el token aunque como la sesion está cerrada no sería necesario todavia
    // const token = jsonwebtoken.sign({ id: nuevoUsuario._id }, config.secret, {
    //   expiresIn: 86400,
    // });

    res.json({
      // auth: true,
      // token: token,
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

// eliminar usuarios
userCtrl.eliminarUsuario = async (req, res) => {
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


// editar usuarios existentes
userCtrl.editarUsuario = async (req,res) => {
  console.log(req.body)
  try {
    await Usuario.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
      mensaje:'Usuario editado correctamente!'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensaje:'Imposible editar el usuario'
    })
  }
}



// eliminar un usuario



// cambiar estado
userCtrl.cambiarEstado = async (req,res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
      mensaje:'estado modificado correctamente'
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje:'error al modificar estado'
    })
  }
}




// enviar roles de usuario
userCtrl.enviarRoles = async (req,res) => {
    try {
     
        
    } catch (error) {
        console.log(error);
    }
}

//recuperar usuario
userCtrl.recuperar = async (req, res) => {
  try {
    // en caso de que haya token lo vamos a decodificar para verificarlo
    // busco el id decodificado en la bd y le digo q no me traiga la password xq no la quiero
    const usuarioBuscado = await Usuario.findById(req.email);
    console.log(usuarioBuscado);
    if (!usuarioBuscado) {
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





export default userCtrl;