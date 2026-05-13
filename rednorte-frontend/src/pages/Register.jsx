import { useState } from "react";

function Register({ apiUrl, onRegisterSuccess, onBack }) {
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

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRegistroData({
      ...registroData,
      [e.target.name]: e.target.value,
    });
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await fetch(`${apiUrl}/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroData),
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar el usuario. Revisa RUT o email duplicado.");
      }

      setMensaje("Paciente registrado correctamente. Ahora puedes iniciar sesión.");

      setTimeout(() => {
        onRegisterSuccess();
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <button className="link-button" onClick={onBack}>
          Volver al login
        </button>

        <h1>Registro paciente</h1>
        <p className="subtitle">
          Crea tu cuenta para consultar solicitudes y listas de espera.
        </p>

        {mensaje && <div className="message success">{mensaje}</div>}
        {error && <div className="message error">{error}</div>}

        <form onSubmit={registrarUsuario} className="form">
          <label>RUT</label>
          <input
            name="rut"
            value={registroData.rut}
            onChange={handleChange}
            required
          />

          <label>Nombre</label>
          <input
            name="nombre"
            value={registroData.nombre}
            onChange={handleChange}
            required
          />

          <label>Apellido</label>
          <input
            name="apellido"
            value={registroData.apellido}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={registroData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={registroData.password}
            onChange={handleChange}
            required
          />

          <label>Teléfono</label>
          <input
            name="telefono"
            value={registroData.telefono}
            onChange={handleChange}
            required
          />

          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={registroData.fechaNacimiento}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Registrar paciente
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;