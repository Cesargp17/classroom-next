import rn from 'random-number';
import jwt_decode from "jwt-decode";
import { uuid } from 'uuidv4';
import { connect, disconnect } from '../../../database/db';
import Class from '../../../models/Class';

export default function (req, res) {
    
    switch ( req.method ) {
        case 'POST':
           return createClass( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });
    }
};

const createClass = async( req, res ) => {

    const { nombre = '', materia = '', periodo = '' } = req.body;
    const { token } = req.cookies;

    if( !token ){
        return res.status(401).json({ msg: 'Debe estar autenticado para crear una clase.' });
    }

    const user = jwt_decode( token );

    if( !user ){
        return res.status(401).json({ msg: 'No tiene permisos para crear una clase.' });
    }

    const imagesNumber = [
        { number: 1, img: 'Book.jpg' },
        { number: 2, img: 'Breakfast.jpg' },
        { number: 3, img: 'Honors.jpg' },
        { number: 4, img: 'Music.jpg' },
        { number: 5, img: 'PC.jpg' },
        { number: 6, img: 'Reachout.jpg' },
        { number: 7, img: 'School.jpg' },
    ]
    
    const options = {
        min: 1,
        max: 7,
        integer: true
    }

    const numero = rn(options);
    const imagen = imagesNumber.find( img => img.number === numero );
    const slug = uuid();
    
    const nuevaClase = {
        portadaImg: imagen.img,
        nombre: nombre,
        materia: materia,
        periodo: periodo,
        maestro: user._id,
        slug: slug,
        codigo: slug.substring(0, 6),
        post: [],
        alumnos: [],
    }

    try {
        await connect();
        const clase = new Class( nuevaClase );
        await clase.save();
        await disconnect();
        return res.status(200).json( clase );
    } catch (error) {
        console.log(error)
        await disconnect();
        return res.status(400).json({ msg: 'Revisar logs del servidor' });
    }
}