import { verify } from "jsonwebtoken";
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';



// creo un middleware para pasarselo a todos los controladores que lo necesiten
const verifyToken = (req,res,next) => {
     // traigo el token del front a traves de x-access-token
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
          auth: false,
          mensaje: "No se recibió ningun token",
        });
    }
    try{
      // si el token existe lo voy a decodificar
      const decoded = jsonwebtoken.verify(token, config.secret);
      // invento un metodo de req porque todas las funciones del controlador tienen el req como parametro
      req.usuarioId = decoded.id;
      next()
    }catch(error){
      console.log(error);
      return res.status(500).json({
        auth:false,
        mensaje: "token invalido"
      })

    }
}

export default verifyToken;