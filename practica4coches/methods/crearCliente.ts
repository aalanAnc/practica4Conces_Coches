// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ClienteModel } from "../types/types.ts";

export const crearCliente = async (req: Request, res: Response) => {
  const { id, nombre, dinero } = req.params;

  if (!id || !nombre || !dinero) {
    res.status(400).json({
      message: "Debes introducir todos los campos para crear un cliente",
    });
    return;
  }

  //comprobar si el cliente existe por su id y nombre
  const clienteExistenteID = await ClienteModel.exists({ id });
  if (clienteExistenteID) {
    res.status(400).json({
      message: "Cliente ya creado con ese ID",
    });
    return;
  }
  const clienteExistenteNombre = await ClienteModel.exists({ nombre });
  if (clienteExistenteNombre) {
    res.status(400).json({
      message: "Cliente ya existente con ese nombre",
    });
    return;
  }

  // crear el cliente nuevo
  try {
    const nuevoCliente = new ClienteModel({
      id,
      nombre,
      dinero,
    });
    await nuevoCliente.save();
    res.status(200).json({ message: "Cliente creado " });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "No se ha podido guardar los datos en mongoDB",
    });
  }
};
