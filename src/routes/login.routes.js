import { Router } from "express";
import loginCtrl from "../controllers/login.controller";

const { loginAdmin } = loginCtrl;

const router = Router();

router.route('/admin')
    .post(loginAdmin)




export default router;











