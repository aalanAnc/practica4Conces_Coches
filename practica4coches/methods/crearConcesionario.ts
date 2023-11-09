// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { ConcesionarioModel } from "../types/types.ts";

export const crearConcesionario = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Debes crear un id para el concesionario",
    });
    return;
  }

  //comprobar si el concesionario ya existe
  const concesionarioExiste = await ConcesionarioModel.exists({ id });
  if (concesionarioExiste) {
    res.status(400).json({
      message: "Concesionario ya existente, crea uno nuevo o usa este",
    });
    return;
  }

  //se crea un nuevo concesionario si aun no ha sido creado
  // este al ser creado tendra un tamaño de 10 y un array de coches vacio
  try {
    const nuevoConcesionario = new ConcesionarioModel({
      id,
      tamano: 10,
      coche: [],
    });
    await nuevoConcesionario.save();
    res.status(200).json({ message: "Concesionario creado" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema al crear un nuevo Concesionario en MongoDB",
    });
  }
};
