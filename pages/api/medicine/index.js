
import db from "database/models/"

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return MedicineList(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });
    }
}



// GET: /Tratamiento
const MedicineList = async (req, res) => {
    try {
        const id = req.query.id; // Obtener el id de la consulta

        if (id) {
            // Si se proporciona un id, buscar un dato específico
            const medicamento = await db.Medicamento.findOne({ where: { id } });

            if (!medicamento) {
                // Si el id proporcionado no existe, devolver un error 400
                return res.status(400).json({
                    error: true,
                    message: "El id proporcionado no existe"
                });
            }

            return res.json(medicamento);
        } else {
            // Si no se proporciona un id, mostrar la lista completa con todos los datos
            const medicamento = await db.Medicamento.findAll({});

            return res.json(medicamento);
        };

    } catch (error) {
        return res.status(400).json({
            error: true,
            message: `Ocurrió un error al procesar la petición: ${error.message}`
        });
    }
};