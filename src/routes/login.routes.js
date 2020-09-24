import { Router } from "express";
import loginCtrl from "../controllers/login.controller";
import verifyToken from '../verifytoken';

const { login, logout, signUp, crearTipoUsuario, autenticar, eliminarUsuario } = loginCtrl;

const router = Router();

router.route('/login')
    .post(login) // en el login se genera el token

router.route('/logout')
    .post(verifyToken,logout)


router.route('/signup')
    .post(signUp) // en el signup tambien se genera un token

    // el me sería para autenticar cada vez que el usuario quiera hacer algo
router.route('/me')
    .get(verifyToken, autenticar) // verifica token antes de continuar

router.route('/crear-tipo')
    .post(crearTipoUsuario)

router.route('/eliminar-usuario/:id')
    .delete(eliminarUsuario)


export default router;











