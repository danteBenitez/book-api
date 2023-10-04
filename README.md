# Ejemplo de autenticación y autorización basada en roles

## Requisitos del proyecto

- Node.js, entorno de ejecución de JavaScript.
- Un motor de datos compatible con Sequelize corriendo al momento de ejecutar el servidor. Puede ver los dialectos disponibles [aquí](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/).

## Instrucciones de instalación

1. Configure la emulación de variables de entorno creando un archivo .env en la carpeta raíz del proyecto, y siguiendo la pauta dada en .env.example.

```env
PORT=        # El puerto de la aplicación

DB_NAME=     # El nombre de la base de datos
DB_PASSWORD= # La contraseña de la base de datos
DB_USER=     # El nombre de usuario
DB_HOST=     # El host 
DB_PORT=     # El puerto de la base de datos

SECRET=      # String secreto utilizado para firmar Json Web Tokens (JWT)
```

2. Ejecute el siguiente comando:

```bash
npm install
```

Para instalar las dependencias del proyecto.

3. Por último, ejecute 

```bash
npm run dev
```

para iniciar el servidor en modo de desarrollo. Aquí la base de datos se sincronizará de modo automático con los modelos, borrando datos preexistentes.

Por otro lado puede ejecutar el comando

```bash
npm start
```

para iniciar el servidor en entorno de producción. Esto no sincronizará los modelos ni sobreescribirá datos de la base de datos.