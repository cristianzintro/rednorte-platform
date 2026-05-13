import { useState } from "react";

function CreateRequest({ usuario, onBack }) {
  const [formData, setFormData] = useState({
    especialidad: "Medicina General",
    motivo: "",
    prioridad: "Media",
    centro: "Hospital RedNorte Central",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enviarSolicitud = (e) => {
    e.preventDefault();

    setMensaje(
      `Solicitud ingresada para ${formData.especialidad}. Estado inicial: En espera.`
    );
  };

  return (
    <div className="page">
      <div className="card">
        <button className="link-button" onClick={onBack}>
          Volver
        </button>

        <h1>Solicitar hora médica</h1>
        <p className="subtitle">
          Paciente: {usuario?.nombre || "Paciente RedNorte"}
        </p>

        {mensaje && <div className="message success">{mensaje}</div>}

        <form className="form" onSubmit={enviarSolicitud}>
          <label>Especialidad</label>
          <select
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
          >
            <option>Medicina General</option>
            <option>Cardiología</option>
            <option>Traumatología</option>
            <option>Pediatría</option>
            <option>Neurología</option>
          </select>

          <label>Motivo de consulta</label>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Describe brevemente el motivo de atención"
            required
          />

          <label>Prioridad</label>
          <select
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
          >
            <option>Baja</option>
            <option>Media</option>
            <option>Alta</option>
          </select>

          <label>Centro preferido</label>
          <select name="centro" value={formData.centro} onChange={handleChange}>
            <option>Hospital RedNorte Central</option>
            <option>CESFAM RedNorte</option>
            <option>Clínica RedNorte Norte</option>
          </select>

          <button className="btn" type="submit">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRequest;