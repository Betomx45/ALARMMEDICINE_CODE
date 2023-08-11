
import db from "database/models/"

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return TratamientoList(req, res);
        case 'POST':
            return addTratamiento(req, res);
        case 'PUT':
            return editTratamiento(req, res);
        case 'DELETE':
            return deleteTratamiento(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });
    }
}

//POST: /Tratamiento
const addTratamiento = async (req, res) => {
    try {
        //los datos que vienen en el req.body
        //console.log(req.body);

        //guardar los datos del Tratamiento
        const tratamiento = await db.Tratamiento.create({ ...req.body }, { include: 'medicamento'});

        res.json({
            tratamiento,
            message: 'Se registro el Tratamiento'
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

// GET: /Tratamiento
const TratamientoList = async (req, res) => {
    try {
        const id = req.query.id; // Obtener el id de la consulta

        if (id) {
            // Si se proporciona un id, buscar un dato específico
            const tratamiento = await db.Tratamiento.findOne({ where: { id } });

            if (!tratamiento) {
                // Si el id proporcionado no existe, devolver un error 400
                return res.status(400).json({
                    error: true,
                    message: "El id proporcionado no existe"
                });
            }

            return res.json(tratamiento);
        } else {
            // Si no se proporciona un id, mostrar la lista completa con todos los datos
            const tratamientos = await db.Tratamiento.findAll({});

            return res.json(tratamientos);
        };

    } catch (error) {
        return res.status(400).json({
            error: true,
            message: `Ocurrió un error al procesar la petición: ${error.message}`
        });
    }
};

//PUT: /Tratamiento
const editTratamiento = async (req, res) => {
    try {
        const { id } = req.query;

        // Verificar si el tratamiento existe antes de intentar actualizarlo
        const tratamiento = await db.Tratamiento.findByPk(id);

        if (!tratamiento) {
            return res.status(404).json({
                error: true,
                message: 'Tratamiento no encontrado',
            });
        }

        // Actualizar los datos del tratamiento
        await db.Tratamiento.update({ ...req.body }, {
            where: {
                id
            }
        });

        res.status(200).json({
            message: 'Se actualizó el tratamiento'
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


//DELETE: /Tratamiento
const deleteTratamiento = async (req, res) => {
    try {
        const { id } = req.query;

        // Verificar si el tratamiento existe antes de intentar eliminarlo
        const tratamiento = await db.Tratamiento.findByPk(id);

        if (!tratamiento) {
            return res.status(404).json({
                error: true,
                message: 'Tratamiento no encontrado',
            });
        }

        // Eliminar los datos del tratamiento
        await db.Tratamiento.destroy({
            where: {
                id
            }
        });

        res.json({
            message: 'Fue eliminado correctamente el tratamiento.'
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
