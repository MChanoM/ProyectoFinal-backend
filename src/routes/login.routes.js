import { Router } from "express";
import loginCtrl from "../controllers/login.controller";
import verifyToken from '../middlewares/verifytoken';

const { login, logout, signUp, autenticar } = loginCtrl;

const router = Router();

router.route('/signup')
    .post(signUp) // en el signup tambien se genera un token

router.route('/login')
    .post(login) // en el login se genera el token

router.route('/logout')
    .post(verifyToken,logout)

    // el me sería para autenticar cada vez que el usuario quiera hacer algo
router.route('/me')
    .get(verifyToken, autenticar) // verifica token antes de continuar





export default router;












