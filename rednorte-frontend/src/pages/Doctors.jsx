const doctors = [
  {
    nombre: "Dra. Camila Torres",
    especialidad: "Cardiología",
    centro: "Hospital RedNorte Central",
    disponibilidad: "Alta",
  },
  {
    nombre: "Dr. Martín Fuentes",
    especialidad: "Traumatología",
    centro: "Clínica RedNorte Norte",
    disponibilidad: "Media",
  },
  {
    nombre: "Dra. Valentina Rojas",
    especialidad: "Medicina General",
    centro: "CESFAM RedNorte",
    disponibilidad: "Alta",
  },
];

function Doctors({ onBack }) {
  return (
    <div className="page">
      <div className="dashboard-shell">
        <button className="link-button" onClick={onBack}>
          Volver
        </button>

        <h1>Doctores disponibles</h1>
        <p className="subtitle">Profesionales asociados a la red RedNorte.</p>

        <section className="dashboard-grid">
          {doctors.map((doctor) => (
            <article className="option-card" key={doctor.nombre}>
              <h3>{doctor.nombre}</h3>
              <p>{doctor.especialidad}</p>
              <p>{doctor.centro}</p>
              <strong>Disponibilidad: {doctor.disponibilidad}</strong>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Doctors;