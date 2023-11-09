//hago lom mismo que eliminar coche de concesionario solo que ahora con el cliente
// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ClienteModel, CocheModel } from "../types/types.ts";

export const eliminarCocheCliente = async (
  req: Request,
  res: Response,
) => {
  const { clienteID, cocheID } = req.params;
  try {
    // Se comprueba que tanto el cliente como el coche existen con sus respectivos ids
    const clienteExistenteID = await ClienteModel.findOne({
      id: clienteID,
    });

    if (!clienteExistenteID) {
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

    clienteExistenteID.coche = clienteExistenteID.coche.filter(
      (coche) => coche.id !== cocheExistenteID.id,
    );

    //guardamos lo modificado
    await clienteExistenteID.save();
    await cocheExistenteID.save();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema para conecyat con MongoDb",
    });
  }
};
