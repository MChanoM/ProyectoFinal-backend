import { Router } from 'express';
import noticiaController from '../controllers/noticia.controllers';

const { getPrueba, crearNoticia, listarNoticias, borrarNoticia, editarNoticia } = noticiaController;
const router = Router();

router.route('/')
    .get(listarNoticias)
    .post(crearNoticia)

router.route('/:id')
    .delete(borrarNoticia)
    .put(editarNoticia)

export default router;
