import jwt_decode from "jwt-decode";
import { connect, disconnect } from "../../../database/db";
import Class from "../../../models/Class";

export default function (req, res) {
    switch (req.method) {
        case 'GET':
            return getAlumnos(req, res);
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });
    }
}

const getAlumnos = async( req, res ) => {
    const { token = '' } = req.cookies;
    const { slug = '' } = req.query;

    if( !token ) return res.status(401).json({ msg: 'Debe estar autenticado' });
    const user = jwt_decode( token );
    if( !user ) return res.status(401).json({ msg: 'No tiene permisos para ver el contenido.' });

    try {
        await connect();
        const alumnos = await Class.find({ slug }).select('alumnos').populate('alumnos', 'nombre apellidos email');
        await disconnect();

        return res.status(200).json( alumnos[0].alumnos )
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Revisar logs del servidor' });
    }
}