// @ts-expect-error
import { Request, Response } from "npm:express@4.18.2";
import { CocheModel } from "../types/types.ts";

export const crearCoche = async (req: Request, res: Response) => {
  const { id, matricula, marca, precio } = req.params;

  //comrpobar que todos los campos han sido rellenados para crear un coche
  if (!id || !matricula || !marca || !precio) {
    res.status(400).json({
      message:
        "Introduce todos los campos para crear un coche: id, matricula, marca, precio",
    });
    return;
  }

  //Comprobar si el coche ua eiste por su id y matricula
  const cocheExistenteID = await CocheModel.exists({ id });
  if (cocheExistenteID) {
    res.status(409).json({
      message: "Coche ya existente. Crea otro con id y matricula distinta",
    });
    return;
  }
  const cocheExistenteMatricula = await CocheModel.exists({ matricula });
  if (cocheExistenteMatricula) {
    res.status(409).json({
      message: "Coche ya existente. Crea otro con id y matricula distinta",
    });
    return;
  }

  //se crea un nuevo coche
  try {
    const nuevoCoche = new CocheModel({
      id,
      matricula,
      marca,
      precio,
    });
    await nuevoCoche.save();
    res.status(200).json({ message: "Coche guardado" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Problema al guardar datos en MongoDB",
    });
    return;
  }
};
