// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel } from "../types/types.ts";

export const enviarCocheConces = async (req: Request, res: Response) => {
  const { concesionarioID, cocheID } = req.params;
  try {
    // verificamos que se introduce el id tanto de concesionario y de coche
    if (!concesionarioID || !cocheID) {
      res.status(400).json({
        message: "Debes proporcionar el id del concesionario y del coche",
      });
    }

    //buscamos el concesionario a traves de su id donde si no se encuentra, salta error
    const buscarConcesionario = await ConcesionarioModel.findOne({
      id: concesionarioID,
    });

    if (!buscarConcesionario) {
      res.status(400).json({
        message: "Concesionario no encontrado, crea uno o introduce bien el id",
      });
      return;
    }

    //buscamos igual el coche por su id donde si no se encuentra lanza un error
    const buscarCoche = await CocheModel.findOne({ id: cocheID });
    if (!buscarCoche) {
      res.status(400).json({
        message:
          "No se ha encontrado el coche con es id, introduce bien el id o crea un nuevo coche",
      });
      return;
    }

    //si todo va bien entonces lo que hacemos es introducir el coche en el array de coches creado
    buscarConcesionario.coches.push(buscarCoche.toObject());

    await buscarConcesionario.save();

    res.status(200).json({ message: "Coche enviado al concesionario" });
  } catch (error) {
    //si algun error sucede se manda un error
    res.status(400).json({
      error: error.message,
      message: "Error al enviar coche al concesionario",
    });
  }
};
