import mongoose, { model, Schema } from "mongoose";

const classSchema = new Schema({

    portadaImg: { type: String, required: true },
    nombre:     { type: String, required: true },
    materia:    { type: String, required: true },
    periodo:    { type: String, required: true },
    maestro:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug:       { type: String, required: true },
    codigo:     { type: String, required: true },

    alumnos: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],

}, {
    timestamps: true,
})

const Class = mongoose.models.Class || model('Class', classSchema);

export default Class;