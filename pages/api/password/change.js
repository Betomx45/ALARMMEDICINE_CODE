import db from "database/models/index"
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

export default async function handler(req, res) {
  try {
    //buscar usuario 
    const user = await db.Usuario.findOne(
      {
        where: {
            passwordResetToken: req.body.token,
            passwordResetExpire: {[Op.gt]: new Date()},
        },
      }
    );
    
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'El link de recuperacion ha expirado.'
      });
    }

    if(!req.body.password) {
        return res.status(400).json({
            error: true,
            message: 'La contrase;a es obligatoria.'
          });
    }

    const salt = await bcrypt.genSalt(10);

    //cifrar la contraseña y meterla en los datos del usuario
    user.datosUsuario.password = await bcrypt.hash(req.body.password, salt);

    //limpiar el token 
    user.passwordResetToken = '',
    user.passwordResetExpire = null,
    await user.save();

    res.json({
        message: 'La contrasena ha sido guardada',
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

    res. json({ error: true, message: 'Error al guardar la nueva contraseña.' });
  }
}