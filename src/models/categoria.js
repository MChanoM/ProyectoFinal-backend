const { Schema } = require("mongoose")

import mongoose, { Schema } from 'mongoose';

const categoriaSchema = new Schema({
    nombreCategoria:{
        type: String,
        maxlength: 20,
        required: true,
        unique:true
    },
    estado:{
        type: String
    }
});

const Categoria = mongoose.model('categoria', categoriaSchema);

export default Categoria;