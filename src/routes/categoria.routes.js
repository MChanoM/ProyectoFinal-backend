import { Router } from "express";
import categoriaController from "../controllers/categoria.controllers";
import verifyToken from '../middlewares/verifytoken';
import verifyRole from '../middlewares/verifyrole';


const {
  crearCategoria,
  listarCategorias,
  eliminarCategoria,
  editarCategoria,
} = categoriaController;

const { isAdmin, isEditor } = verifyRole;

const router = Router();

router.route("/")
    .get(listarCategorias)
    .post([verifyToken, isAdmin],crearCategoria);

router.route("/:idCategoria")
    .delete([verifyToken, isAdmin], eliminarCategoria)
    .put([verifyToken, isAdmin], editarCategoria);

export default router;
