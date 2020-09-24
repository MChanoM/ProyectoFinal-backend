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
    userType: {
        type: String
    },
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


userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password,this.password);
}

const Usuario = mongoose.model('Usuario',userSchema);

export default Usuario;