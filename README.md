# Eco Vida S.A.S. - Frontend

## Descripción

Eco Vida S.A.S. es una aplicación web orientada a la gestión de residuos reciclables.

El frontend fue desarrollado con React y permite interactuar con los módulos de autenticación, usuarios, clientes, residuos y recolecciones.

La aplicación se comunica con el backend mediante servicios REST y utiliza Axios para realizar las solicitudes.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Axios
- CSS

## Requisitos

Para ejecutar el frontend se necesita:

- Node.js
- npm
- Backend de Eco Vida ejecutándose en http://localhost:8080

## Instalación

1. Clonar el repositorio.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Ejecutar:

npm install

Este comando instala las dependencias necesarias para ejecutar la aplicación.

## Ejecución

Para iniciar el proyecto en modo desarrollo:

npm run dev

La aplicación estará disponible normalmente en:

http://localhost:5173

## Comunicación con el backend

El frontend utiliza Axios para comunicarse con el backend desarrollado con Spring Boot.

La URL base utilizada por la aplicación es:

http://localhost:8080

Las solicitudes protegidas incluyen automáticamente el token JWT almacenado durante la sesión.

## Autenticación

El sistema cuenta con un formulario de inicio de sesión mediante correo electrónico y contraseña.

Cuando las credenciales son correctas, el backend devuelve un token JWT y el rol correspondiente al usuario autenticado.

El frontend almacena el token y el rol durante la sesión y los utiliza para controlar el acceso a las funciones protegidas.

El sistema también permite cerrar sesión. Al utilizar esta opción se eliminan del almacenamiento local el token y el rol del usuario y se retorna a la pantalla de inicio de sesión.

La sesión se mantiene al recargar la página mientras exista un token almacenado.

## Roles

El sistema fue probado con los siguientes roles:

- Administrador
- Usuario

El rol Administrador dispone de las funciones administrativas, incluyendo la gestión de usuarios.

El rol Usuario dispone de las funciones permitidas para su perfil y no tiene acceso a las opciones administrativas.

## Dashboard

La aplicación cuenta con un dashboard que presenta información obtenida desde el backend.

Los indicadores se cargan utilizando los registros existentes de los módulos del sistema.

El dashboard cambia según el rol autenticado.

El Administrador puede consultar información general, incluyendo usuarios, clientes, residuos y recolecciones.

El Usuario puede consultar los indicadores correspondientes a las funciones disponibles para su rol.

## Módulos principales

El frontend integra los siguientes módulos:

- Inicio y dashboard
- Autenticación
- Usuarios
- Clientes
- Residuos
- Recolecciones

## Módulo de Usuarios

Permite al Administrador gestionar los usuarios del sistema, incluyendo el registro, consulta, actualización, eliminación, asignación de roles y estado de activación.

## Módulo de Clientes

Permite registrar y administrar la información de los clientes relacionados con el proceso de gestión de residuos.

## Módulo de Residuos

Permite registrar, consultar, actualizar y eliminar residuos, relacionándolos con el cliente correspondiente.

## Módulo de Recolecciones

Permite registrar y administrar las recolecciones de residuos.

La información de clientes y residuos utilizada en este módulo proviene de los registros existentes en el sistema.

## Estructura general

La aplicación se encuentra organizada principalmente en:

src/
├── components/
├── pages/
├── services/
└── styles/

Los componentes contienen elementos reutilizables de la interfaz.

Las páginas representan los módulos del sistema.

Los servicios contienen las funciones utilizadas para comunicarse con el backend.

La carpeta styles contiene los archivos CSS de los diferentes módulos.

## Usuarios de prueba

Durante el desarrollo y las pruebas se utilizaron usuarios correspondientes a los roles:

- Administrador
- Usuario

Las contraseñas y tokens utilizados durante las pruebas no se incluyen en el repositorio.

## Repositorio

https://github.com/yulianaya939-cpu/ecovida-react