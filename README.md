# practica4Conces_Coches
En esta practica4 creamos Concesionarios, Coches y Clientes.
Los types estan en un mismo .ts donde:

Concesionario tendra = {id:string, tamano: number, coches:coches[]}. en coches se guardaran los coches que creemos
Coche = {id:string, matricula : string, marca: string, precio : number}
Cliente = {id : string, nombre:string, dinero: number, coche:coche[]}. Aqui igual se guardan los coches que el cliente compre

Cada type tendra su propia conexion con mongoo. Se crean los schema, los model y modelType de cada type creado.

Host que se usa :
http://localhost:3000
En los metodos encontramos:

crearCoche -> para crear lo necesitamos un id, matricula, marca y precio = myapp.post("/crearCoche/:id/:matricula/:marca/:precio", crearCoche);
crearConcesionario -> para crear lo necesitamos un id = myapp.post("/crearConcesionario/:id", crearConcesionario);
crearCliente -> para crear lo necesitamos id, nombre y dinero = myapp.post("/crearCliente/:id/:nombre/:dinero", crearCliente);

enviarCocheConcesionario -> para enviar necesitamos el id tanto de concesionario como el de coche = myapp.post("/enviarCocheConcesionario/:concesionarioID/:cocheID",enviarCocheConces,);

anadirDineroCliente ->  myapp.post("/anadirDineroCliente/:id/:cantidad", anadirDineroCliente);
eliminarCocheConcesionario -> myapp.delete("/eliminarCocheConcesionario/:concesionarioID/:cocheID",eliminarCocheConcesionario,);

eliminarCocheCliente->myapp.delete("/eliminarCocheCliente/:clienteID/:cocheID",eliminarCocheCliente,);
venderCocheCliente-> myapp.post("/venderCocheCliente/:concesionarioID/:cocheID/:clienteID",venderCocheCliente,);

verCocheCliente->myapp.get("/verCocheCliente/:clienteID", verCocheCliente);
verCocheConcesionario->myapp.get("/verCocheConcesionario/:concesionarioID", verCocheConcesionario);
