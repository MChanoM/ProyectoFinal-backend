import Noticia from '../models/noticia';
const noticiaCtrl = {};

noticiaCtrl.getPrueba = (req, res) => {
    res.send("esto es una prueba")
}

noticiaCtrl.crearNoticia = async (req, res) => {
    console.log(req.body)
    try {
        const { noticiaDestacada, tituloNoticia, descripcionNoticia, imagen, cuerpoNoticia, autorNoticia, fechaNoticia, categoria } = req.body;

        const noticiaNueva = new Noticia({
            noticiaDestacada: noticiaDestacada,
            tituloNoticia: tituloNoticia,
            descripcionNoticia: descripcionNoticia,
            imagen: imagen,
            cuerpoNoticia: cuerpoNoticia,
            autorNoticia: autorNoticia,
            fechaNoticia: fechaNoticia,
            categoria: categoria
        })
        //guardamos en ls bd
        await noticiaNueva.save();
        //envio respuesta al front
        res.status(201).json({
            mensaje: "La noticia se agregó correctamente"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrió un error"
        })
    }
}

noticiaCtrl.listarNoticias = async (req, res) => {
    try{
        const arregloNoticias = await Noticia.find();
        //agregamos respuesta al front
        res.status(200).json(arregloNoticias);

    } catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrió un error"
        })
    }
}

noticiaCtrl.borrarNoticia = async (req, res) => {
    try{
        console.log(req.params.idNoticias); //extraemos el parametro id de la url
        await Noticia.findByIdAndDelete(req.params.idNoticias);
        res.status(200).json({
            mensaje: "Se eliminó la noticia"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrió un error"
        })
    }
}

noticiaCtrl.editarNoticia = async (req, res) => {
    try{
        await Noticia.findByIdAndUpdate(req.params.idNoticias, req.body);
        res.status(200).json({
            mensaje: "Se actualizó la noticia"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrió un error"
        })
    }
}

export default noticiaCtrl;