import { Router } from "express";
import categoriaController from "../controllers/categoria.controllers";
import verifyToken from '../verifytoken';

const {
  crearCategoria,
  listarCategorias,
  eliminarCategoria,
  editarCategoria,
} = categoriaController;

const router = Router();

router.route("/")
    .get(verifyToken,listarCategorias)
    .post(verifyToken,crearCategoria);

router.route("/:idCategoria").delete(eliminarCategoria).put(editarCategoria);

export default router;
