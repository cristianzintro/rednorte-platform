# AGENTS.md

## Alcance del repo
- Este repo contiene **dos proyectos independientes** (no monorepo con workspace):
  - `rednorte-auth-service`: backend Spring Boot (Maven, Java 17).
  - `rednorte-frontend`: frontend React + Vite (npm).
- Ejecuta comandos en la carpeta correcta; no hay scripts root que orquesten ambos proyectos.

## Comandos verificados

### Backend (`rednorte-auth-service`)
- Ejecutar app (PowerShell en Windows): `./mvnw spring-boot:run`
- Ejecutar tests: `./mvnw test`
- Ejecutar un test/clase puntual: `./mvnw -Dtest=RednorteAuthServiceApplicationTests test`

### Frontend (`rednorte-frontend`)
- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Flujo local esperado
- Backend levanta en `http://localhost:8081` (`server.port=8081`).
- Frontend asume backend en `http://localhost:8081/api/auth` (constante `API_URL` en `src/App.jsx`).
- CORS backend permite `http://localhost:5173` y `http://localhost:3000` (`SecurityConfig` + `@CrossOrigin`).

## Arquitectura real (entrypoints y límites)
- Backend entrypoint: `rednorte-auth-service/src/main/java/cl/rednorte/authservice/RednorteAuthServiceApplication.java`.
- Endpoints auth: `POST /api/auth/registro` y `POST /api/auth/login` en `AuthController`.
- Endpoints usuarios: `GET /api/usuarios`, `GET /api/usuarios/{id}`, `GET /api/usuarios/rut/{rut}` en `UsuarioController`.
- Lógica de negocio crítica en `UsuarioService`:
  - normaliza RUT (quita puntos/espacios, uppercase),
  - valida duplicados por RUT/email,
  - guarda password con BCrypt,
  - login por email o RUT normalizado.
- Frontend actual está concentrado en `src/App.jsx` (login/registro + dashboard simple); no hay capa de API separada.

## Datos y persistencia
- Config por defecto usa H2 en memoria: `jdbc:h2:mem:rednorte_auth`.
- `spring.jpa.hibernate.ddl-auto=update` (esquema evoluciona al iniciar).
- Consola H2 habilitada en `/h2-console`.
- Hay dependencia PostgreSQL en `pom.xml`, pero no está activa por defecto (solo propiedades comentadas).

## Validación antes de cerrar cambios
- Si cambias backend: correr `./mvnw test` en `rednorte-auth-service`.
- Si cambias frontend: correr al menos `npm run lint` en `rednorte-frontend`; para entrega, también `npm run build`.
- Si cambias contrato frontend-backend (URLs, payloads, CORS), verifica ambos proyectos en conjunto con backend + frontend levantados.
