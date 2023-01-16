import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import bcrypt from 'bcryptjs'
import { signToken } from "../../../utils/jwt";

export default function (req, res) {
    
    switch ( req.method ) {
        case 'POST':
           return loginUser(req, res);
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });

    }
};

const loginUser = async( req, res ) => {

    const { email = '', password = '' } = req.body;

    await connect();
    const user = await User.findOne({ email });
    await disconnect();

    if( !user ) {
        return res.status(400).json({ msg: 'Correo o contraseña no validos - EMAIL' })
    };

    if( !bcrypt.compareSync( password, user.password ) ){
        return res.status(400).json({ msg: 'Bad request - PASSWORD' })
    };

    const { _id, nombre, apellidos } = user;

    const token = signToken({ _id, nombre, apellidos, email });

    return res.status(200).json({
        token,
        user: {
            nombre, apellidos, email
        }
    })
};