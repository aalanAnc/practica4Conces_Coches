import mongoose from "npm:mongoose@7.6.4";

export type Coche = {
  id: string;
  matricula: string;
  marca: string;
  precio: number;
};

export type Concesionario = {
  id: string;
  tamano: number;
  coches: Coche[]; // coches que hay en concesionario
};

export type Cliente = {
  id: string;
  nombre: string;
  dinero: number;
  coche: Coche[]; // aqui guardamos los coches que posee el cliente
};

export type anadirDinero = {
  cantidad: number;
};

/**
 * Con los Schema definimos la estructura en la base de dato y con la que interactuamos con ellos
 * a traves de mongoose
 */

const Schema = mongoose.Schema;

//creacion del shcema de Coche

const cocheSchema = new Schema({
  id: { type: String, required: true },
  matricula: { type: String, required: true },
  marca: { type: String, required: true },
  precio: { type: String, required: true },
}, {
  timestamps: true,
});

export type CochesModelType = mongoose.Document & Omit<Coche, "matricula">;

export const CocheModel = mongoose.model<CochesModelType>(
  "coche",
  cocheSchema,
);

// creacion de Schema de concesionario

const concesionarioSchema = new Schema({
  id: { type: String, required: true },
  tamano: { type: Number, required: true },
  coche: { type: [cocheSchema], required: true },
}, {
  timestamps: true,
});

export type ConcesionarioModelType =
  & mongoose.Document
  & Omit<Concesionario, "concesionario">;

export const ConcesionarioModel = mongoose.model<ConcesionarioModelType>(
  "concesionario",
  concesionarioSchema,
);

// creacion de Schema de cliente

const ClienteSchema = new Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  dinero: { type: Number, required: true },
  coche: { type: [cocheSchema], required: true },
}, {
  timestamps: true,
});

export type ClienteModelType = mongoose.Document & Omit<Cliente, "cliente">;

export const ClienteModel = mongoose.model<ClienteModelType>(
  "cliente",
  ClienteSchema,
);
