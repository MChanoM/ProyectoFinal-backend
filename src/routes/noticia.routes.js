import { Router } from 'express';
import noticiaController from '../controllers/noticia.controllers';
import verifyToken from '../verifytoken';

const { getPrueba, crearNoticia, listarNoticias, borrarNoticia, editarNoticia } = noticiaController;
const router = Router();

router.route('/')
    .get(verifyToken, listarNoticias)
    .post(verifyToken, crearNoticia)

router.route('/:id')
    .delete(verifyToken, borrarNoticia)
    .put(verifyToken, editarNoticia)

export default router;
