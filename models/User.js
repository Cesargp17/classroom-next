import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    nombre: { type: String, requred: true },
    apellidos: { type: String, requred: true },
    email: { type: String, requred: true },
    password: { type: String, requred: true },
}, {
    timestamps: true,
})

const User = mongoose.models.User || model('User', userSchema);

export default User;