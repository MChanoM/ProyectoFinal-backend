import {Router} from 'express';
import noticiaController from '../controllers/noticia.controllers';

const {getPrueba} = noticiaController;
const router = Router();

router.route('/').get(getPrueba);


export default router;
