import { connect, disconnect } from "../../../../database/db";
import Class from "../../../../models/Class";
import jwt_decode from "jwt-decode";

export default function (req, res) {
    switch (req.method) {
        case 'POST':
            return createComment(req, res);
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });
    }
}

const createComment = async( req, res ) => {
    const { token = '' } = req.cookies;
    const { texto = '', anuncio = '' } = req.body;

    console.log(process.env.NODE_ENV)

    if( !token ) return res.status(401).json({ msg: 'Debe estar autenticado' });

    const user = jwt_decode( token );

    if( !user ) return res.status(401).json({ msg: 'No tiene permisos para agregar un comentario.' });

    const newComment = {
        texto,
        autor: user._id
    }

    try {
        await connect();
        const clase = await Class.findOne({ "post.anuncio": anuncio }, {'post.$': 1});
        // const comentario = `post.${ clase.post[0].index }.comentarios`;
        await Class.updateOne( {"post.anuncio": anuncio}, { $push: { [`post.${ clase.post[0].numerador }.comentarios`] : newComment } });
        await disconnect();
    
        return res.status(200).json( newComment )
    } catch (error) {
        console.log(error)
        await disconnect();
        return res.status(400).json({ msg: 'Bad Request' })
    }
}