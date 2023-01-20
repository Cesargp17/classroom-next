import jwt_decode from "jwt-decode";
import { connect, disconnect } from "../../../../database/db";
import Class from "../../../../models/Class";

export default function (req, res) {
    switch ( req.method ) {
        case 'POST':
            return createPost( req, res );
        
        case 'GET':
            return getClassPosts( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });
    }
}

const getClassPosts = async( req, res ) => {

    // // const { token = '' } = req.cookies;
    // const { codigo = '' } = req.body; 

    // console.log({slug, token})

    // if( !token ) return res.status(401).json({ msg: 'Debe estar autenticado' });

    // const user = jwt_decode( token );

    // if( !user ) return res.status(401).json({ msg: 'No tiene permisos para ver el contenido.' });

    // console.log(codigo)

    // await connect();
    // const clase = await Class.findOne({ codigo });
    // await disconnect();

    // if( !clase ) return res.status(400).json({ msg: 'No existe la clase' });

    // return res.status(200).json( clase.post );
}

const createPost = async( req, res ) => {

    const { token = '' } = req.cookies;
    const { titulo = '', anuncio = '', Enlaces: enlaces = [], uploadedImages = [] ,codigo = '', isHomework = false } = req.body; 

    if( !token ) return res.status(401).json({ msg: 'Debe estar autenticado' });

    const user = jwt_decode( token );

    if( !user ) return res.status(401).json({ msg: 'No tiene permisos para crear una clase.' });

    await connect();
    const clase = await Class.findOne({ codigo });
    const index = clase.post.length;
    await disconnect();

    if( !clase ) return res.status(400).json({ msg: 'No existe la clase' });

    const claseParseada = JSON.parse( JSON.stringify(clase) );

    if( user._id === claseParseada.maestro) {

        const nuevoPost = {
            autor: user._id, index, titulo, anuncio, enlaces, uploadedImages, isHomework
        };

        clase.post = [...clase.post, nuevoPost];

        try {
            await connect();
            await clase.save();
            await disconnect();
            return res.status(200).json( nuevoPost );
        } catch (error) {
            console.log(error);
            await disconnect();
        }

    } else if ( claseParseada.alumnos.some( alumno => alumno === user._id )) {

        if( titulo !== '' ){
            return res.status(401).json({ msg: 'No tiene permisos para crear una tarea.' });
        }

        const nuevoPost = {
            autor: user._id, index, titulo, anuncio, enlaces, uploadedImages, isHomework
        };

        clase.post = [...clase.post, nuevoPost];
        try {
            await connect();
            await clase.save();
            await disconnect();
            return res.status(200).json( nuevoPost );
        } catch (error) {
            console.log(error);
            await disconnect();
        }

    } else {

        return res.status(401).json({ msg: 'No tiene permisos para crear una clase.' });

    }
}