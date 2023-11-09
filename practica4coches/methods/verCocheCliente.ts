//aqui hago lo mismo que en verCocheConcesionario solo que con el cliente
// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ClienteModel } from "../types/types.ts";

export const verCocheCliente = async (res: Response, req: Request) => {
  const clienteID = req.params.id;
  try {
    const clienteExistenteID = await ClienteModel.findOne({ id: clienteID });
    if (!clienteExistenteID) {
      res.status(400).json({
        message:
          "No se ha encontrado ese cliente con ese id, crea un cliente o introduce bien el id ",
      });
      return;
    }
    return res.json({ listaCoches: clienteExistenteID.coche });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema al conectar con monfoDB",
    });
  }
};
