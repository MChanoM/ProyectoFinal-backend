import mongoose, {Schema} from 'mongoose';

const noticiaSchema = new Schema({
    noticiaDestacada: {
        type: String
    },
    tituloNoticia: {
        type: String,
        maxlength: 300,
        required: true,
        unique: true
    },
    descripcionNoticia: {
        type: String,
        maxlength: 1500,
        required: true
    },
    imagen: {
        type: String,
        required: true,
    },
    cuerpoNoticia: {
        type: String,
        required: true
    },
    autorNoticia: {
        type: String,
        required: true
    },
    fechaNoticia: {
        type: Date
    },
    categoria: {
        type: String,
        required: true
    }
})

const Noticia = mongoose.model('noticia', noticiaSchema);

export default Noticia;