# mini-task-tracker

Mini Task Tracker es una pequeña aplicación para gestionar tareas (to‑dos). Permite crear, editar, listar y marcar tareas como completadas. Está pensada como una base sencilla para aprender o para ampliarla con más funcionalidades (autenticación, filtros, prioridades, etiquetas, sincronización, etc.).

Este README explica de qué trata el proyecto y los comandos más habituales para instalarlo y ejecutarlo. Ajusta las secciones de "Comandos" si tu proyecto usa otro gestor de paquetes (yarn/pnpm) o un stack distinto (Python, Ruby, etc.).

## Características principales
- Crear nuevas tareas (título, descripción, fecha límite opcional).
- Editar tareas existentes.
- Marcar tareas como completadas / pendientes.
- Listar tareas (todas, completadas, pendientes).
- Estructura mínima para añadir persistencia (archivo/DB) y APIs o UI.

## Requisitos 
- Git
- Node.js >= 14 (si el proyecto es Node.js)
- npm o yarn (según el proyecto)
- (Opcional) Base de datos si el proyecto la utiliza (SQLite, PostgreSQL, MongoDB...)

Si tu repo usa otro stack, reemplaza estas indicaciones por las correspondientes.

## Instalación (Node.js / npm)
1. Clonar el repositorio:
   git clone https://github.com/BiggieJr1/mini-task-tracker.git
2. Entrar en el directorio:
   cd mini-task-tracker
3. Instalar dependencias:
   npm install

(Si usas yarn: yarn install)

## Comandos habituales
Nota: verifica los scripts en package.json para confirmar los nombres exactos. Aquí hay comandos comunes:

- Desarrollo (servidor en modo desarrollo, recarga en caliente):
  npm run dev
  ó
  npm start

- Construir para producción:
  npm run build

- Ejecutar versión de producción (después de build):
  npm run serve
  ó
  npm start

- Tests:
  npm test

- Linter:
  npm run lint
  npm run lint:fix

- Ver scripts disponibles:
  cat package.json
  (o abre package.json y revisa la sección "scripts")

## Variables de entorno 
Si la aplicación necesita configuración, crea un archivo `.env` en la raíz con variables como estas:

PORT=3000
DATABASE_URL=sqlite://db.sqlite
JWT_SECRET=tu_secreto_aqui

Ajusta las variables según la implementación real.

## Estructura sugerida
- /src — código fuente (API, frontend, etc.)
- /test — pruebas
- package.json — scripts y dependencias
Asegúrate de adaptar la estructura a la del repositorio real si difiere.

## Uso básico (ejemplo de flujo)
1. Levantar la aplicación:
   npm run dev
2. Abrir el navegador en http://localhost:3000 (o el puerto configurado).
3. Crear tareas desde la UI o mediante la API (si existe).
4. Editar o marcar tareas como completadas desde la UI.

## Contribuir
1. Haz fork del repositorio.
2. Crea una rama con un nombre descriptivo: git checkout -b feat/nueva-funcionalidad
3. Realiza tus cambios, añade tests cuando sea posible.
4. Abre un pull request describiendo los cambios.

## Solución de problemas
- Si hay errores al instalar dependencias, intenta borrar `node_modules` y el lockfile (`package-lock.json` o `yarn.lock`) y reinstalar.
- Comprueba la versión de Node.js: node -v
- Revisa logs en la consola al arrancar la app para encontrar pistas.

