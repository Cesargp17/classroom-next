import Cookies from "js-cookie";
import { connect, disconnect } from "../database/db";
import Class from "../models/Class";
import jwt_decode from "jwt-decode";

export const getUserClasses = async( id ) => {

    let todasLasClases = []

    await connect();
    const clases = await Class.find({ alumnos: id }).populate('maestro', 'nombre').select('materia nombre portadaImg slug -_id');
    const clasesMaestro = await Class.find({ maestro: id }).populate('maestro', 'nombre').select('materia nombre portadaImg slug -_id');
    await disconnect();

    clases.map( clase => {
        todasLasClases.push(clase);
    });

    clasesMaestro.map( clase => {
        todasLasClases.push(clase);
    });

    return JSON.parse( JSON.stringify(todasLasClases) );
};

export const getClassesSlug = async() => {

    await connect();
    const slugs = await Class.find().select('slug -_id').lean();
    await disconnect();

    return slugs;
}

export const getClassBySlug = async( slug ) => {

    await connect();
    const clase = await Class.find({ slug }).select('alumnos codigo maestro materia periodo portadaImg nombre -_id slug').populate('alumnos', 'nombre apellidos');
    await disconnect();

    return JSON.parse( JSON.stringify( clase[0] ) );
}

// http://localhost:3000/class/2b494a1b-46ef-4787-96f0-f5264a6a7c84