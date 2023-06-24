import db from "@/database/models";
//import customer from "@/database/models/customer";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return usersList(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const usersList = async (req, res) => {
    try {
       
        const customers = await db.Usuario.findOne({
            where: {id: req.query.slug},
            include:[
                {
                    model: db.Tratamiento,
                    as: 'tratamiento',
                    include:[
                        {
                            model: db.Medicamento,
                            as: 'medicamento'
                        }
                    ]
                }
            ]
        }); 

        if(!customers) {
            return res.status(404).json({
                message: 'El usuario no existe',
            });
        }
    
      return res.json({ ...customers.dataValues});
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }