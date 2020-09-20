import Categoria from "../models/categoria";

const categoriaController = {};

categoriaController.crearCategoria = async (req, res) => {
  console.log(req.body);
  try {
    const { nombreCategoria, estado } = req.body;
    const categoriaNueva = new Categoria({
      nombreCategoria: nombreCategoria,
      estado: estado,
    });
    //con esto guardo en la BD
    await categoriaNueva.save();

    res.status(201).json({
      mensaje: "La categoria se agrego a la BD"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Hubo un error para agregar la categoria a la BD"
    });
  }
};

categoriaController.listarCategorias = async (req, res) => {
  try {
    const datos = await Categoria.find();
    res.status(200).json(datos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Hubo un error para listar las categorias"
    });
  }
};

categoriaController.eliminarCategoria = async (req, res) => {
  try {
    console.log(req.params.idCategoria);
    await Categoria.findByIdAndDelete(req.params.idCategoria);
    res.status(200).json({
      mensaje: "La categoria se elimino de la BD"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Hubo un error para eliminar la categoria de la BD"
    });
  }
};

categoriaController.editarCategoria = async (req, res) => {
  try {
    await Categoria.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "La categoria se edito correctamente en la BD"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Hubo un error para editar la categoria en la BD"
    });
  }
};

export default categoriaController;
