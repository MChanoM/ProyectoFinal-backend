import { Router } from "express";
import loginCtrl from "../controllers/login.controller";
import verifyToken from '../middlewares/verifytoken';

const { login, logout, recuperar} = loginCtrl;

const router = Router();


router.route('/login')
    .post(login) // en el login se genera el token

router.route('/logout')
    .post(verifyToken,logout)

router.route("/recuperar")
    .post(recuperar);

export default router;












