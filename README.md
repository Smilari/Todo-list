# 📝 Todo List API - UTN INSPT

Bienvenido al repositorio de la **API REST para gestionar una Todo List**. Este proyecto fue desarrollado como parte de
la cursada de Programación III en la **UTN INSPT**. Es el backend de un sistema de gestión de tareas.

## 📋 Descripción

La **Todo List API** permite realizar operaciones CRUD en tareas, proyectos y comentarios, con roles diferenciados para
usuarios y administradores. La API está desarrollada en **Node.js** con **Express.js** y utiliza **MongoDB** para la
persistencia de datos. Está diseñada para ser escalable, segura y eficiente, y se puede desplegar de manera sencilla
tanto en ambientes locales como en la nube.

## 🚀 Despliegue ![Vercel](https://vercelbadge.vercel.app/api/Smilari/Todo-list?style=for-the-badge)

La API está desplegada en **Vercel** y puede ser utilizada desde el siguiente
enlace [todografo.vercel.app](https://todografo.vercel.app/). Podés probar utilizando herramientas como **Postman**.

---

## 🛠 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el backend.
- **Express.js**: Framework para crear el servidor y gestionar rutas.
- **MongoDB Atlas**: Base de datos NoSQL, escalable y en la nube.
- **Mongoose**: ODM para gestionar las consultas y modelos de datos.
- **bcrypt**: Para encriptar contraseñas.
- **jsonwebtoken**: Para gestionar la autenticación con tokens.
- **helmet**: Para asegurar cabeceras HTTP.
- **cors**: Middleware para permitir CORS.
- **morgan**: Logger de solicitudes HTTP.
- **cookie-parser**: Para analizar cookies.
- **dotenv**: Para gestionar variables de entorno.
- **auto-bind**: Para vincular automáticamente métodos de clase al contexto.

---

## 🔧 Instalación y Configuración

Seguí estos pasos para ejecutar la API de manera local:

#### Prerrequisitos

- **Node.js:** Version 14 o superior
- **MongoDB Atlas:** Credenciales y cadena de conexión (alternativamente, se puede
  utilizar [MongoDB Compass](https://www.mongodb.com/products/compass) para trabajar en local)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Smilari/Todo-list.git
```

### 2. Instalar las dependencias

```bash
cd Todo-list
npm install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (ajustadas a tu entorno):

```env
MONGO_URI=<Your MongoDB Connection URI>
PORT=3000
ACCESS_TOKEN_SECRET=<Your JWT Secret Key>
REFRESH_TOKEN_SECRET=<Your JWT Secret Key>
ACCESS_TOKEN_EXPIRY=<The time you want for expiration>
REFRESH_TOKEN_EXPIRY=<The time you want for expiration>
NODE_ENV=development
```

### 4. Ejecutar el servidor

Para ejecutar en modo de desarrollo:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

---

## 🔒 Seguridad y Autenticación

Para proteger los endpoints, se utiliza un middleware de autenticación basado en JWT (jsonwebtoken) y se aplica
autorización en cada ruta según el rol del usuario.

Una vez autenticado, los tokens se almacenan en la cookie `access_token` y `refresh_token` para ser utilizados en las
siguientes peticiones.

### Permisos de usuario

La API soporta dos tipos de usuarios:

- **Usuario final**: Puede gestionar sus propias tareas y proyectos.
- **Administrador**:  Tiene acceso total y puede gestionar todos los usuarios, tareas y proyectos en el sistema.

## 🌐 Endpoints

> Nota: La documentación detallada de cada endpoint se encuentra en Postman y no se incluye aquí para evitar
> redundancia.

### Rutas para usuarios

| Ruta                                 | Método | Descripción                       |
|--------------------------------------|--------|-----------------------------------|
| `/api/auth/login`                    | POST   | Autenticar usuario                |
| `/api/auth/register`                 | POST   | Registrar usuario                 |
| `/api/auth/refreshAccessToken`       | POST   | Actualizar tokens                 |
| `/api/auth/logout`                   | POST   | Cerrar sesión                     |
| `/api/me/profile`                    | GET    | Obtener el perfil del usuario     |
| `/api/me/profile`                    | PATCH  | Actualizar el perfil del usuario  | 
| `/api/me/tasks`                      | GET    | Obtener las tareas del usuario    |
| `/api/me/tasks`                      | POST   | Crear tarea                       |
| `/api/me/tasks/:id`                  | GET    | Obtener tarea                     |
| `/api/me/tasks/:id`                  | DELETE | Eliminar tarea                    |
| `/api/me/tasks/:id`                  | PATCH  | Actualizar tarea                  |
| `/api/me/projects`                   | GET    | Obtener los proyectos del usuario |
| `/api/me/projects`                   | POST   | Crear proyecto                    |
| `/api/me/projects/:id`               | GET    | Obtener proyecto                  |
| `/api/me/projects/:id`               | DELETE | Eliminar proyecto                 |
| `/api/me/projects/:id`               | PATCH  | Actualizar proyecto               |
| `/api/me/tasks/:taskId/comments`     | GET    | Obtener los comentarios           |
| `/api/me/tasks/:taskId/comments`     | POST   | Crear comentario                  |
| `/api/me/tasks/:taskId/comments/:id` | GET    | Obtener comentario                |
| `/api/me/tasks/:taskId/comments/:id` | DELETE | Eliminar comentario               |
| `/api/me/tasks/:taskId/comments/:id` | PATCH  | Actualizar comentario             |

### Rutas para administradores

| Ruta                                      | Método | Descripción                             |
|-------------------------------------------|--------|-----------------------------------------|
| `/api/users`                              | GET    | Obtener todos los usuarios              |
| `/api/users`                              | POST   | Crear un usuario                        |
| `/api/users/:id`                          | GET    | Obtener un usuario                      |
| `/api/users/:id`                          | DELETE | Eliminar un usuario                     |
| `/api/users/:id`                          | PATCH  | Actualizar un usuario                   |
| `/api/:userId/tasks`                      | GET    | Obtener todas las tareas del usuario    |
| `/api/:userId/tasks`                      | POST   | Crear tarea                             |
| `/api/:userId/tasks/:id`                  | GET    | Obtener tarea                           |
| `/api/:userId/tasks/:id`                  | DELETE | Eliminar tarea                          |
| `/api/:userId/tasks`                      | PATCH  | Actualizar tarea                        |
| `/api/:userId/projects`                   | GET    | Obtener todos los proyectos del usuario |
| `/api/:userId/projects`                   | POST   | Crear proyecto                          |
| `/api/:userId/projects/:id`               | GET    | Obtener proyecto                        |
| `/api/:userId/projects/:id`               | DELETE | Eliminar proyecto                       |
| `/api/:userId/projects/:id`               | PATCH  | Actualizar proyecto                     |
| `/api/:userId/tasks/:taskId/comments`     | GET    | Obtener todos los comentarios           |
| `/api/:userId/tasks/:taskId/comments`     | POST   | Crear comentario                        |
| `/api/:userId/tasks/:taskId/comments/:id` | GET    | Obtener comentario                      |
| `/api/:userId/tasks/:taskId/comments/:id` | DELETE | Eliminar comentario                     |
| `/api/:userId/tasks/:taskId/comments/:id` | PATCH  | Actualizar comentario                   |

## 📂 Estructura del proyecto

El proyecto sigue una arquitectura basada en el patrón MVC (Model-View-Controller) para mantener una separación clara
entre la lógica de negocio y la interacción con la base de datos:

```bash
    ├── Server.js # Archivo principal del servidor
    ├── api # Se encuentra el index.js del servidor
    ├── controllers # Contiene los controladores de las rutas
    ├── helpers # Contiene funciones de utilidad y manejo de errores
    ├── middlewares # Contiene middlewares para validar las peticiones
    ├── models # Gestiona las consultas y operaciones CRUD
    ├── routes # Contiene las rutas del servidor
    └── schemas # Contiene los esquemas de la base de datos
```

