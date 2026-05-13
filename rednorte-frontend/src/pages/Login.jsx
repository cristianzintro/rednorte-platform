import { useState } from "react";

function Login({ apiUrl, userType, onLoginSuccess, onGoRegister, onBack }) {
  const [loginData, setLoginData] = useState({
    identificador: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await fetch(`${apiUrl}/login`, {
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
      setMensaje("Inicio de sesión exitoso");
      onLoginSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <button className="link-button" onClick={onBack}>
          Volver al inicio
        </button>

        <h1>RedNorte</h1>
        <p className="subtitle">
          Ingreso {userType === "trabajador" ? "trabajador" : "paciente"}
        </p>

        {mensaje && <div className="message success">{mensaje}</div>}
        {error && <div className="message error">{error}</div>}

        <form onSubmit={iniciarSesion} className="form">
          <label>RUT o email</label>
          <input
            type="text"
            name="identificador"
            placeholder="Ej: 18777905-7 o correo@rednorte.cl"
            value={loginData.identificador}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Ingresar
          </button>
        </form>

        {userType !== "trabajador" && (
          <button className="btn secondary full" onClick={onGoRegister}>
            Crear cuenta paciente
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;