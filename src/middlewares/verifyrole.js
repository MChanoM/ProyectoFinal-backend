// https://www.youtube.com/watch?v=lV7mxivGX_I&ab_channel=FaztCode

import Usuario from '../models/usuarios';
import Role from '../models/role';

// lo uso para verificar permisos de usuario

const verifyRole = {};

verifyRole.isAdmin = async (req,res,next) => {
    
    try {
        //busco el id provisto por el verifyToken
        const user = await Usuario.findById(req.usuarioId);
        const rolUser = await Role.find({_id: {$in: user.role}});
        // si el rol del usuario es admin entonces continuar con la sig funcion

       for(let i = 0; i < rolUser.length;i++){
           if(rolUser[i].name === 'admin'){
               next();
               return;
           }
       }
        
        // si no tiene rol dar error de forbidden 
        return res.status(403).json({
            mensaje:'No tiene permiso para realizar la accion'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje:'Error al verificar permiso de usuario'
        })
    }
}

verifyRole.isEditor = async(req,res,next) => {
    try {
        //busco el id provisto por el verifyToken
        const user = await Usuario.findById(req.usuarioId);
        const rolUser = await Role.find({_id: user.role});
        // si el rol del usuario es admin entonces continuar con la sig funcion
        for(let i = 0; i < rolUser.length;i++){
           if(rolUser[i].name === 'editor'){
               next();
               return;
           }
       }
        
        // si no tiene rol dar error de forbidden 
        return res.status(403).json({
            mensaje:'No tiene permiso para realizar la accion'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje:'Error al verificar permiso de usuario'
        })
    }
}


export default verifyRole;


