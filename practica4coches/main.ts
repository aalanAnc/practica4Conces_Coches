// @ts-expect-error
import express, { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.4";
import { crearCoche } from "./methods/crearCoche.ts";
import { crearConcesionario } from "./methods/crearConcesionario.ts";
import { crearCliente } from "./methods/crearCliente.ts";
import { enviarCocheConces } from "./methods/enviarCocheConces.ts";
import { anadirDineroCliente } from "./methods/anadirDineroCliente.ts";
import { eliminarCocheConcesionario } from "./methods/eliminarCocheConcesionario.ts";
import { eliminarCocheCliente } from "./methods/eliminarCocheCliente.ts";
import { verCocheCliente } from "./methods/verCocheCliente.ts";
import { verCocheConcesionario } from "./methods/verCocheConcesionario.ts";
import { venderCocheCliente } from "./methods/venderCocheCliente.ts";

/**
 * Consegui mucha ayuda para la realizacion de la practica el github de valero:
 * https://github.com/Nebrija-Programacion/web-backend/tree/master
 */

try {
  await mongoose.connect(
    "mongodb+srv://aanconao:12345@practicacuatro.fypy2pd.mongodb.net/coches?retryWrites=true&w=majority",
  );

  const myapp = express();

  myapp.post("/crearCoche/:id/:matricula/:marca/:precio", crearCoche);
  myapp.post("/crearConcesionario/:id", crearConcesionario);
  myapp.post("/crearCliente/:id/:nombre/:dinero", crearCliente);

  myapp.post(
    "/enviarCocheConcesionario/:concesionarioID/:cocheID",
    enviarCocheConces,
  );
  myapp.post("/anadirDineroCliente/:id/:cantidad", anadirDineroCliente);

  myapp.delete(
    "/eliminarCocheConcesionario/:concesionarioID/:cocheID",
    eliminarCocheConcesionario,
  );
  myapp.delete(
    "/eliminarCocheCliente/:clienteID/:cocheID",
    eliminarCocheCliente,
  );

  myapp.post(
    "/venderCocheCliente/:concesionarioID/:cocheID/:clienteID",
    venderCocheCliente,
  );

  myapp.get("/verCocheCliente/:clienteID", verCocheCliente);
  myapp.get("/verCocheConcesionario/:concesionarioID", verCocheConcesionario);

  myapp.listen(3000, () => {
    console.log("Conectado en el puerto 3000");
  });
} catch (error) {
  console.error("No se ha conectado a mongodb", error.message);
}
