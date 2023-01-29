import mongoose, { model, Schema } from "mongoose";
import User from "./User";

const classSchema = new Schema({

    portadaImg: { type: String, required: true },
    nombre:     { type: String, required: true },
    materia:    { type: String, required: true },
    periodo:    { type: String, required: true },
    maestro:    { type: Schema.Types.ObjectId, ref: User, required: true },
    slug:       { type: String, required: true },
    codigo:     { type: String, required: true },
    post:       [{
        autor: { type: Schema.Types.ObjectId, ref: User, required: true },
        numerador: { type: Number, required: true },
        titulo: { type: String },
        anuncio: { type: String, required: true },
        enlaces: [{ type: String }],
        uploadedImages: [{ type: String }],
        isHomework: { type: String, required: true },

        entregados: [{ type: Schema.Types.ObjectId, ref: User }],
        noEntregados: [{ type: Schema.Types.ObjectId, ref: User }],

        comentarios: [{
            texto: { type: String, required: true },
            autor: { type: Schema.Types.ObjectId, ref: User, required: true }
        }],
    }],

    alumnos: [{ type: Schema.Types.ObjectId, ref: User, required: true }],

}, {
    timestamps: true,
})

const Class = mongoose.models.Class || model('Class', classSchema);

export default Class;