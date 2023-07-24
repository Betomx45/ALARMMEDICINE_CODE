import db from "database/models/";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return UbicacionList(req, res);
        case 'POST':
            return obtenerUbicacionDispositivo(req, res);
        case 'PUT':
            return editUbicacion(req, res);
        case 'DELETE':
            return deleteUbicacion(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });
    }
}

// POST: /ObtenerUbicacionDispositivo
const obtenerUbicacionDispositivo = async (req, res) => {
    try {
        const { latitud, longitud } = req.body;

        // Validar que se proporcionen todos los datos necesarios
        if (!latitud || !longitud) {
            return res.status(400).json({
                error: true,
                message: "Los campos latitud y longitud son requeridos"
            });
        }

        // Aquí puedes procesar la ubicación enviada desde el frontend
        // Por ejemplo, almacenarla en una base de datos, hacer alguna acción específica, etc.
        // Crear una nueva ubicación en la base de datos
        const ubicacion = await db.Ubicacion.create({
            latitud,
            longitud,
        });

        return res.json({
            ubicacion,
            message: 'Ubicación del dispositivo obtenida correctamente'
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

// GET: /Ubicacion
const UbicacionList = async (req, res) => {
    try {
        const id = req.query.id; // Obtener el id de la consulta

        if (id) {
            // Si se proporciona un id, buscar un dato específico
            const ubicaciones = await db.Ubicacion.findOne({ where: { id } });

            if (!ubicaciones) {
                // Si el id proporcionado no existe, devolver un error 400
                return res.status(400).json({
                    error: true,
                    message: "El id proporcionado no existe"
                });
            }

            return res.json(ubicaciones);
        } else {
            // Si no se proporciona un id, mostrar la lista completa con todos los datos
            const ubicacion = await db.Ubicacion.findAll({});

            return res.json(ubicacion);
        };

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

// PUT: /Ubicacion?id=<ubicacionId>
const editUbicacion = async (req, res) => {
    try {
        const { id } = req.query;
        const { latitud, longitud } = req.body;

        // Validar que se proporcionen todos los datos necesarios
        if (!latitud || !longitud) {
            return res.status(400).json({
                error: true,
                message: "Los campos latitud y longitud son requeridos"
            });
        }

        // Buscar la ubicación por el ID
        const ubicacion = await db.Ubicacion.findOne({ where: { id } });

        if (!ubicacion) {
            return res.status(400).json({
                error: true,
                message: "La ubicación no existe"
            });
        }

        // Actualizar la ubicación
        ubicacion.latitud = latitud;
        ubicacion.longitud = longitud;
        await ubicacion.save();

        return res.json({
            ubicacion,
            message: 'Se actualizo la ubicación'
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

// DELETE: /Ubicacion?id=<ubicacionId>
const deleteUbicacion = async (req, res) => {
    try {
        const { id } = req.query;

        // Buscar la ubicación por el ID
        const ubicacion = await db.Ubicacion.findOne({ where: { id } });

        if (!ubicacion) {
            return res.status(400).json({
                error: true,
                message: "La ubicación no existe"
            });
        }

        // Eliminar la ubicación
        await ubicacion.destroy();

        return res.json({
            message: 'Se eliminó correctamente la ubicación'
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