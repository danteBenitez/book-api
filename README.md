# API de libros, autores y géneros

La presente aplicación expone una API que permite:
- Realizar las cuatro operaciones básicas (Creación, Lectura, Eliminación y Modificación) de las siguientes entidades:
    - Autores
    - Libros
- Listar los libros por género o simplemente obtener el conteo.

La aplicación utiliza *MongoDB* como base de datos, y *mongoose* como librería para modelar los datos. 

Se exponen, además, vistas HTML que permiten interactuar con la API con una interfaz gráfica.

## Requisitos del proyecto

- Entorno de ejecución: Node.js
- Gestor de paquetes como npm o pnpm.
- Servidor de base de datos de MongoDB, con mongod para el desarrollo local.

## Instalación

1. Para instalar el proyecto, comience por clonar el repositorio, con:

```bash
git clone https://github.com/danteBenitez/book-api.git
```

2. Dentro del directorio raíz del proyecto, ejecute:

```bash
npm install
```

3. Cree un archivo llamado .env que contenga la siguiente información:

```bash
PORT=                 # El puerto en que escuchará el servidor
DB_URI=               # La URI de conexión a un servidor de Mongo
```

Recuerde tener corriendo alguna forma de servicio de base de datos a la hora de iniciar el servidor. La herramienta CLI [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/) permite ejecutar un servidor de base de datos Mongo de modo local.

4. Inicie el servidor en modo desarrollo ejecutando:

