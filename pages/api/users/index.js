import db from "database/models/index"
import bcrypt from 'bcrypt';


export default function handler (req, res) {
    switch (req.method) {
        case 'GET':
            return getUser (req, res);
        case 'POST':
            return addUser (req, res);
        case 'PUT':
            return updateUser (req, res);
        case 'DELETE':
            return deleteUser (req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });
    }
}

//GET FUNCTION
const getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Supongo que el ID se encuentra en los parámetros de la solicitud
        const usuario = await db.Usuario.findOne({ where: { id: userId } });

        if (!usuario) {
            return res.status(404).json({
                error: true,
                message: `Usuario con ID ${userId} no encontrado`
            });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: `Ocurrió un error al procesar la petición: ${error.message}`
        });
    }
};


//POST FUNCTION
const addUser = async (req, res) => {
    try {
        //validar que venga la contraseña
        if(!req.body.password){
            return res.status(400).json({message: 'La contraseña es obligatoria'});
        }

        //datos del usuario
        const datosUsuario = {...req.body}

        //asegurar la contraseña
        //usar bcrypt
        //salt: generación de una cadena aleatoria deN longitud
        const salt = await bcrypt.genSalt(10);

        //cifrar la contraseña y meterla en los datos del usuario
        datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

        //guardar los datos del cliente
        const usuarios = await db.Usuario.create(datosUsuario);

        usuarios.password = null; //evitar enviarlo en la respuesta

        res.status(200).json({
            usuarios,
            message: 'El usuario fue registrado correctamente.'
        });
    } catch (error) {
        console.log(error);

        let errors = [];

        if (error.errors) {
            //extraer la información de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }


        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la información: ${error.message}`,
                errors,
            }
        )
    }
}

//PUT FUNCITON
const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        
        const usuario = await db.Usuario.findOne({ where: { id } });

        if (!usuario) {
            return res.status(404).json({
                error: true,
                message: `Usuario con ID ${id} no encontrado, no se puede actualizar`
            });
        }

        await db.Usuario.update({ ...req.body },
            {
                where: {
                    id
                }
            }
        );

        res.status(200).json({
            message: 'El usuario fue actualizado correctamente.'
        });
     } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            //extraer la información de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la información: ${error.message}`,
                errors,
            }
        )
    }
}

//DELETE FUNCTION
const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await db.Usuario.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Usuario no encontrado.'
            });
        }

        await db.Usuario.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: 'El usuario fue eliminado correctamente.'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json({
            error: true,
            message: `Ocurrió un error al procesar la información: ${error.message}`,
            errors,
        });
    }
}