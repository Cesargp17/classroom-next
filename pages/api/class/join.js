import { connect, disconnect } from "../../../database/db";
import Class from "../../../models/Class";
import jwt_decode from "jwt-decode";

export default function (req, res) {
    
    switch ( req.method ) {
        case 'POST':
          return joinClass( req, res );
    
        default:
          return res.status(400).json({ msg: 'Bad Request' });
    }
}

const joinClass = async( req, res ) => {

    const { codigo = '' } = req.body;
    const { token } = req.cookies;

    if( !token ){
        return res.status(401).json({ msg: 'Debe estar autenticado para unirse a la clase.' });
    };

    let alumnosEnClases = [];

        await connect();
        const clase = await Class.findOne({ codigo: codigo }).populate('maestro', 'nombre');
        await disconnect();

        
        if( !clase ){
            return res.status(400).json({ msg: 'No existe ninguna clase con ese código.' });
        };
        
        alumnosEnClases.push(clase.alumnos);
        
        const user = jwt_decode( token );
        const { _id } = user;

        if( !user ){
            return res.status(401).json({ msg: 'No tiene permisos para unirte a la clase.' });
        }

        if( clase.maestro.toString() === _id ){
            return res.status(400).json({ msg: 'No te puedes unir a esta clase porque eres el Maestro' });
        }

        const alumnoEnClase = alumnosEnClases.find( alumno => alumno.toString() === _id );

        if( alumnoEnClase ){
            return res.status(400).json({ msg: 'Ya estas en la clase.' });
        }

        clase.alumnos = [...clase.alumnos, user];

        try {
            await connect();
            await clase.save();
            await disconnect();
        } catch (error) {
            console.log(error);
            await disconnect();
        }


        return res.status(200).json( clase );
}