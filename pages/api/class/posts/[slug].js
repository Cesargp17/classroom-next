
import jwt_decode from "jwt-decode";
import { connect, disconnect } from "../../../../database/db";
import Class from "../../../../models/Class";

export default function (req, res) {

    switch (req.method) {
        case 'GET':
            return searchPosts( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad request' });
    }
}

const searchPosts = async( req, res ) => {

    const { token = '' } = req.cookies;
    const { slug = '' } = req.query;

    if( !token ) return res.status(401).json({ msg: 'Debe estar autenticado' });
    const user = jwt_decode( token );
    if( !user ) return res.status(401).json({ msg: 'No tiene permisos para ver el contenido.' });

    await connect();
    const clase = await Class.findOne({ slug });
    await disconnect();

    if( !clase ) return res.status(400).json({ msg: 'No existe la clase' });

    return res.status(200).json( clase.post );
}