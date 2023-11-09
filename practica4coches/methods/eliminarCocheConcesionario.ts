// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel } from "../types/types.ts";

export const eliminarCocheConcesionario = async (
  req: Request,
  res: Response,
) => {
  const { concesionarioID, cocheID } = req.params;
  try {
    // Se comprueba que tanto el concesionario como el coche existen con sus respectivos ids
    const concesionarioExisteID = await ConcesionarioModel.findOne({
      id: concesionarioID,
    });

    if (!concesionarioExisteID) {
      res.status(400).json({
        message: "No se ha encontrado el id del concesionario",
      });
      return;
    }

    const cocheExistenteID = await CocheModel.findOne({
      id: cocheID,
    });

    if (!cocheExistenteID) {
      res.status(400).json({
        message: "No se ha encontrado el id de ese coche",
      });
      return;
    }

    concesionarioExisteID.coches = concesionarioExisteID.coches.filter(
      (coche) => coche.id !== cocheExistenteID.id,
    );

    //guardamos lo modificado
    await concesionarioExisteID.save();
    await cocheExistenteID.save();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema para conecyat con MongoDb",
    });
  }
};
