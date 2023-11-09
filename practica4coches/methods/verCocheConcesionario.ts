// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ConcesionarioModel } from "../types/types.ts";

export const verCocheConcesionario = async (req: Request, res: Response) => {
  const concesionarioID = req.params.id; // Obtendremos el id
  try {
    const buscarConcesionario = await ConcesionarioModel.findOne({
      id: concesionarioID,
    });
    // se busca el id si no se encuentra, lanza un error, si no se sigue
    if (!buscarConcesionario) {
      res.status(400).json({
        message:
          "No se ha encontrado ese id de concesionario, introduce uno valido",
      });
      return;
    }
    //si se encuentra el id, mostrara la lista de los coches guardados en ese concesionario
    return res.json({ listaCoches: buscarConcesionario.coches });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema al conectar con la base de datos MongoDb",
    });
  }
};
