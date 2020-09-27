import { Router } from 'express';
import noticiaController from '../controllers/noticia.controllers';
import verifyToken from '../middlewares/verifytoken';
import verifyRole from '../middlewares/verifyrole';

const { getPrueba, crearNoticia, listarNoticias, borrarNoticia, editarNoticia } = noticiaController;
const { isAdmin, isEditor } = verifyRole;

const router = Router();

router.route('/')
    .get(verifyToken, listarNoticias)
    .post(verifyToken, crearNoticia)

router.route('/:id')
    .delete(verifyToken, isAdmin, borrarNoticia)
    .put([verifyToken, isEditor], editarNoticia)

export default router;
