import { connect, disconnect } from "../../../database/db";
import User from "../../../models/User";
import { signToken } from "../../../utils/jwt";
import { isValidEmail } from "../../../utils/validations";
import bcrypt from 'bcryptjs'

export default function (req, res) {

    switch ( req.method ) {
        case 'POST':
            return registerUser( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad Request' });

    }
};

const registerUser = async( req, res ) => {

    const { nombre = '', apellidos = '', email = '', password = '' } = req.body;

    if( password.length < 6 ){
        return res.status(400).json({ msg: 'La contrasena debe de ser de 6 caracteres o mas' });
    };

    if( nombre.length < 3 ){
        return res.status(400).json({ msg: 'El nombre debe de ser mayor a dos letras' });
    };

    if( apellidos.length < 3 ){
        return res.status(400).json({ msg: 'Los apellidos deben de ser mayor a dos letras' });
    };

    if( !isValidEmail(email) ){
        return res.status(400).json({ msg: 'El correo no es valido' });
    };

    await connect();
    const user = await User.findOne({ email });

    if( user ){
        await disconnect();
        return res.status(400).json({ msg: 'Ese correo ya existe en la aplicación' });
    };

    const newUser = new User({
        nombre: nombre,
        apellidos: apellidos, 
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
    });

    try {
        await newUser.save({ validateBeforeSave: true });
        await disconnect();
    } catch (error) {
        await disconnect();
        console.log(error)
        return res.status(500).json({ msg: 'Revisar logs del servidor' });
    };

    const { _id } = newUser;

    const token = signToken({ _id, nombre, apellidos, email });

    return res.status(200).json({
        token,
        user: {
            nombre, apellidos, email
        }
    });

};