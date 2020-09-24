import { Router } from "express";
import loginCtrl from "../controllers/login.controller";
import verifyToken from '../controllers/verifytoken';

const { login, signUp,crearTipoUsuario, autenticar } = loginCtrl;

const router = Router();

router.route('/login')
    .post(login) // en el login se genera el token


router.route('/signup')
    .post(signUp) // en el signup tambien se genera un token

    // el me sería para autenticar cada vez que el usuario quiera hacer algo
router.route('/me')
    .get(verifyToken, autenticar) // verifica token antes de continuar

router.route('/crear-tipo')
    .post(crearTipoUsuario)


export default router;











