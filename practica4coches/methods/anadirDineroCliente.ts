// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { anadirDinero, ClienteModel } from "../types/types.ts";

export const anadirDineroCliente = async (req: Request, res: Response) => {
  const clienteExistenteID = req.params.id;
  const cantidadIngresar = req.params;
  try {
    const clienteExiste = await ClienteModel.findOne({
      id: clienteExistenteID,
    });
    if (!clienteExiste) {
      res.status(400).json({
        message: "No se ha enconrado al cliente por ese id",
      });
      return;
    }
    clienteExiste.dinero += cantidadIngresar;
    await clienteExiste.save();
    res.status(200).json({
      message:
        "Dinero agrado correctamente al dinero del cliente. Ya puedes comprar un coche",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema al conectar en MongoDB",
    });
  }
};
