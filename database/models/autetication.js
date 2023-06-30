import db from "./index"

export const checkUserEmailPassword = async( _correo, password) => {
    
    const user = await db.Usuario.findOne({ where: {correo: _correo} });

    if (!user) {
        return null;
    }

    if (!user.isValidPassword(password)) {
        return null;
    }

    const {
        id,
        nombre,
        correo,
    } = user;

    return {
        id,
        nombre,
        correo,
    }
}