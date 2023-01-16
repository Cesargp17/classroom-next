import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import { isValidToken, signToken } from "../../../utils/jwt";
import jwt_decode from "jwt-decode";

export default function (req, res) {
    
    switch ( req.method ) {
        case 'GET':
           return checkJWT( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }
}

const checkJWT = async( req, res ) => {

    const { token = '' } = req.cookies;

    if(!token) return;

    let decoded = jwt_decode(token);
    const { _id } = decoded;

    await connect();
    const user = await User.findById( _id ).lean();
    await disconnect();

    if( !user ){
        return res.status(400).json({ msg: 'No existe ese usuario con ese id' });
    }

    const { nombre, apellidos, email } = user;
    const newToken =  signToken({ _id, nombre, apellidos, email });

    return res.status(200).json({
        newToken,
        user: {
            nombre, apellidos, email
        }
    })

}