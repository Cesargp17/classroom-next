import jwt_decode from "jwt-decode";
import { connect, disconnect } from "../../../database/db";
import Class from "../../../models/Class";

export default function (req, res) {
    
    switch (req.method) {
        case 'GET':
            return getClasses( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });
    }
};

const getClasses = async( req, res ) => {

    console.log('hola')

    const { token } = req.token;

    if( !token ){
        return res.status(401).json({ msg: 'Debe estar autenticado.' });
    };

    const user = jwt_decode( token );
    const { _id } = user;

    if( !user ){
        return res.status(401).json({ msg: 'No existe ese usuario.' });
    }

    await connect();
    const clases = await Class.find();
    await disconnect();

    if( !clases ){
        return res.status(400).json({ msg: 'No hay clases' });
    }

    return res.status(200).json({ clases });

}