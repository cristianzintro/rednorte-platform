import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8081/api/auth";

function App() {
  const [modo, setModo] = useState("login");

  const [loginData, setLoginData] = useState({
    identificador: "",
    password: "",
  });

  const [registroData, setRegistroData] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    fechaNacimiento: "",
    rol: "PACIENTE",
  });

  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const limpiarMensajes = () => {
    setMensaje("");
    setError("");
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistroChange = (e) => {
    setRegistroData({
      ...registroData,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    limpiarMensajes();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("RUT/email o contraseña incorrectos");
      }

      const data = await response.json();
      setUsuario(data);
      setMensaje("Inicio de sesión exitoso");
    } catch (err) {
      setError(err.message);
    }
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    limpiarMensajes();

    try {
      const response = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroData),
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar el usuario. Revisa RUT o email duplicado.");
      }

      const data = await response.json();
      setMensaje("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
      setModo("login");

      setLoginData({
        identificador: data.rut || registroData.rut,
        password: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setLoginData({
      identificador: "",
      password: "",
    });
    setMensaje("");
    setError("");
  };

  if (usuario) {
    return (
      <div className="page">
        <div className="card dashboard-card">
          <h1>RedNorte</h1>
          <p className="subtitle">Sistema de acceso de usuarios</p>

          <div className="success-box">
            <h2>Sesión iniciada</h2>
            <p>
              Bienvenido/a, <strong>{usuario.nombre}</strong>
            </p>
            <p>
              RUT: <strong>{usuario.rut}</strong>
            </p>
            <p>
              Email: <strong>{usuario.email}</strong>
            </p>
            <p>
              Rol: <strong>{usuario.rol}</strong>
            </p>
          </div>

          {usuario.rol === "ADMINISTRADOR" ? (
            <div className="role-box admin">
              <h3>Panel Administrador</h3>
              <p>
                Tienes acceso a funciones administrativas del sistema RedNorte,
                como gestión de usuarios, listas de espera y control interno.
              </p>
            </div>
          ) : (
            <div className="role-box paciente">
              <h3>Portal Paciente</h3>
              <p>
                Puedes consultar información relacionada con tus solicitudes,
                estado de atención y datos asociados a tu cuenta.
              </p>
            </div>
          )}

          <button className="btn secondary" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1>RedNorte</h1>
        <p className="subtitle">Login y registro de usuarios</p>

        <div className="tabs">
          <button
            className={modo === "login" ? "tab active" : "tab"}
            onClick={() => {
              setModo("login");
              limpiarMensajes();
            }}
          >
            Iniciar sesión
          </button>

          <button
            className={modo === "registro" ? "tab active" : "tab"}
            onClick={() => {
              setModo("registro");
              limpiarMensajes();
            }}
          >
            Registrar usuario
          </button>
        </div>

        {mensaje && <div className="message success">{mensaje}</div>}
        {error && <div className="message error">{error}</div>}

        {modo === "login" ? (
          <form onSubmit={iniciarSesion} className="form">
            <label>RUT o email</label>
            <input
              type="text"
              name="identificador"
              placeholder="Ej: 18777905-7 o correo@rednorte.cl"
              value={loginData.identificador}
              onChange={handleLoginChange}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <button className="btn" type="submit">
              Ingresar
            </button>
          </form>
        ) : (
          <form onSubmit={registrarUsuario} className="form">
            <label>RUT</label>
            <input
              type="text"
              name="rut"
              placeholder="Ej: 18777905-7"
              value={registroData.rut}
              onChange={handleRegistroChange}
              required
            />

            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Cristian"
              value={registroData.nombre}
              onChange={handleRegistroChange}
              required
            />

            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              placeholder="Ej: Caceres"
              value={registroData.apellido}
              onChange={handleRegistroChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ej: cristian@rednorte.cl"
              value={registroData.email}
              onChange={handleRegistroChange}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Crea una contraseña"
              value={registroData.password}
              onChange={handleRegistroChange}
              required
            />

            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              placeholder="Ej: 912345678"
              value={registroData.telefono}
              onChange={handleRegistroChange}
              required
            />

            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={registroData.fechaNacimiento}
              onChange={handleRegistroChange}
              required
            />

            <label>Rol de usuario</label>
            <select
              name="rol"
              value={registroData.rol}
              onChange={handleRegistroChange}
              required
            >
              <option value="PACIENTE">Paciente</option>
              <option value="ADMINISTRADOR">Administrador</option>
            </select>

            <button className="btn" type="submit">
              Registrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;