import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new Schema({
    usuario: {
        type: String,
        maxlength:20,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    role: [{
        type:Schema.Types.ObjectId,
        ref:"Role"
    }],
    userActive: {
        type: Boolean,
        required:true
    },
    sessionState:{
        type:Boolean,
        required:true
    }
},
{
    timestamps: true
}
)
// Encriptamos el password antes de guardarlo en la bd
userSchema.methods.encryptPassword = async (password) =>{
    // genSalt es para decirle cuantas veces quiero q aplique el algoritmo
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// no usamos funcion flecha y usamos funcion de ecmas5 para usar el "this"
userSchema.methods.validatePassword = function(password){
    // usamos el metodo compare de bcrypt para comparar ambas passwords
    return bcrypt.compare(password,this.password); //devuelve true/false
}

const Usuario = mongoose.model('Usuario',userSchema);

export default Usuario;