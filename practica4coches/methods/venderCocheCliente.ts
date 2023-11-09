// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import {
  ClienteModel,
  CocheModel,
  ConcesionarioModel,
} from "../types/types.ts";

export const venderCocheCliente = async (req: Request, res: Response) => {
  const { concesionarioID, cocheID, clienteID } = req.body;
  try {
    // buscaremos tanto concesionario, coche y cliente por su id y verificaremos que existen
    const concesionarioExiste = await ConcesionarioModel.findOne({
      id: concesionarioID,
    });
    if (!concesionarioExiste) {
      res.status(400).json({
        message:
          "Concesionario no encontrado por su id, crea un concesionario o introduce un id correcto",
      });
      return;
    }
    const cocheExiste = await CocheModel.findOne({ id: cocheID });
    if (!cocheExiste) {
      res.status(400).json({
        message:
          "No se ha encontrado el coche por ese id, crea un nuevo coche o introduce un id correcto",
      });
      return;
    }
    const clienteExiste = await ClienteModel.findOne({ id: clienteID });
    if (!clienteExiste) {
      res.status(400).json({
        message:
          "Cliente no encontrado por ese id, debes crear un nuevo cliente o introduce un id correcto",
      });
      return;
    }
    //tras comprobar que todos los ids existen se sigue el programa
    // primero verificamos si el cliente tiene dinero
    if (clienteExiste.dinero < cocheExiste.precio) {
      res.status(400).json({
        message: "No tienes dinero para comprar el coche",
      });
      return;
    }
    //si tiene dinero se sigue el programa donde le resto el dinero del cliente con el precio del coche
    // y meto el coche en el array del cliente con sus coches y finalizo guradando los cambios
    clienteExiste.dinero = clienteExiste.dinero - cocheExiste.precio;
    clienteExiste.coche.push(cocheExiste.toObject());

    await clienteExiste.save();
    await concesionarioExiste.save();
    await cocheExiste.save();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error al concetar con MongoDB",
    });
  }
};
