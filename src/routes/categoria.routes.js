import { Router } from "express";
import categoriaController from "../controllers/categoria.controllers";

const {
  crearCategoria,
  listarCategorias,
  eliminarCategoria,
  editarCategoria,
} = categoriaController;

const router = Router();

router.route("/").get(listarCategorias).post(crearCategoria);

router.route("/:idCategoria").delete(eliminarCategoria).put(editarCategoria);

export default router;
