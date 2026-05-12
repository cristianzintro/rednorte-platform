# RedNorte Auth Service

Microservicio local para registro e inicio de sesion de usuarios RedNorte.

## Ejecutar en VS Code

```powershell
.\mvnw spring-boot:run
```

Si usas terminal Git Bash o Linux/Mac:

```bash
./mvnw spring-boot:run
```

El servicio corre en:

```txt
http://localhost:8081
```

## Base local H2

Consola H2:

```txt
http://localhost:8081/h2-console
```

Datos de conexion:

```txt
JDBC URL: jdbc:h2:mem:rednorte_auth
User Name: sa
Password: dejar vacio
```

## Endpoints

### Registrar paciente

POST `http://localhost:8081/api/auth/registro`

```json
{
  "rut": "18777905-7",
  "nombre": "Cristian",
  "apellido": "Caceres",
  "email": "cristian@rednorte.cl",
  "password": "123456",
  "telefono": "912345678",
  "fechaNacimiento": "1994-03-23",
  "rol": "PACIENTE"
}
```

### Registrar administrador

POST `http://localhost:8081/api/auth/registro`

```json
{
  "rut": "11111111-1",
  "nombre": "Admin",
  "apellido": "RedNorte",
  "email": "admin@rednorte.cl",
  "password": "admin123",
  "telefono": "900000000",
  "fechaNacimiento": "1990-01-01",
  "rol": "ADMINISTRADOR"
}
```

### Login con email

POST `http://localhost:8081/api/auth/login`

```json
{
  "identificador": "cristian@rednorte.cl",
  "password": "123456"
}
```

### Login con RUT

POST `http://localhost:8081/api/auth/login`

```json
{
  "identificador": "18777905-7",
  "password": "123456"
}
```

### Listar usuarios

GET `http://localhost:8081/api/usuarios`

### Buscar usuario por ID

GET `http://localhost:8081/api/usuarios/1`

### Buscar usuario por RUT

GET `http://localhost:8081/api/usuarios/rut/18777905-7`

## Tabla principal

La entidad `Usuario` genera la tabla `usuarios` con estos campos principales:

- id
- rut
- email
- password encriptada con BCrypt
- nombre
- apellido
- telefono
- fecha_nacimiento
- rol: PACIENTE o ADMINISTRADOR
- estado: ACTIVO o INACTIVO
- fecha_registro

## PostgreSQL despues

Por ahora usa H2 local. Para PostgreSQL, editar `src/main/resources/application.properties` y reemplazar la configuracion H2 por la configuracion PostgreSQL comentada.
