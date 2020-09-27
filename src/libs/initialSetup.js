// archivo de configuracion inicial. Este archivo corre solo la primera vez que se ejcute el backend en el servidor
import Usuario from '../models/usuarios';
import Role from "../models/role";
import bcrypt from 'bcryptjs';

const initialSetups = {};

// crear roles
initialSetups.createRoles = async () => {
  try {
    // verifico si hay roles creados en la coleccion de roles
    const cantidad = await Role.estimatedDocumentCount();
    // si hay roles no hago nada xq ya están creados
    if (cantidad > 0) return;

    //si no hay los creo. Uso este metodo de Promise all para ejecutar las 3 al mismo tiempo.lo hace mas eficiente
    const roles = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "editor" }).save(),
    ]);
    console.log(roles);
  } catch (error) {
    console.log(error);
  }
};


initialSetups.createAdmin = async () =>{
  try {
    const user = await Usuario.findOne({usuario:'admin'});
  // obtengo los roles de la bd
  const roles = await Role.find({name:{$in: ["admin","editor","user"]}})
  
  // si no existe el usuario lo creo
  if(!user){
    await Usuario.create({
      usuario:'admin',
      password: await bcrypt.hash("admin",10),
      email:'admin@admin.com',
      userActive: true,
      sessionState:false,
      role: roles.map((item)=>item._id),
    })
    console.log('Rol admin creado!');
  }
  } catch (error) {
    console.log(error);
  }
}

export default initialSetups;