import jwt from "jsonwebtoken";

export const signToken = ({ _id, nombre, apellidos, email }) => {

    if( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    };

    return jwt.sign({ _id, nombre, apellidos, email }, process.env.JWT_SECRET_SEED, { expiresIn: '30d' });

};

export const isValidToken = ( token ) => {
    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return new Promise( (resolve, reject) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if ( err ) return reject('JWT no es válido');

                const { _id } = payload;

                resolve(_id);

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

};