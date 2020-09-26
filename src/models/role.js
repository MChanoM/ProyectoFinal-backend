import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    
  },
},
{
    timestamps:true
});

const Role = mongoose.model("Role",roleSchema);

export default Role;