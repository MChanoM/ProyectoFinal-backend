import mongoose, {Schema} from 'mongoose';

const userTypeSchema = new Schema({

    userType: {
        type: String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})


const TipoUsuario = mongoose.model('tiposusuarios',userTypeSchema);

export default TipoUsuario