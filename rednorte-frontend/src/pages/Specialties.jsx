const specialties = [
  "Medicina General",
  "Cardiología",
  "Traumatología",
  "Pediatría",
  "Neurología",
  "Dermatología",
  "Oftalmología",
  "Ginecología",
];

function Specialties({ onBack }) {
  return (
    <div className="page">
      <div className="dashboard-shell">
        <button className="link-button" onClick={onBack}>
          Volver
        </button>

        <h1>Especialidades médicas</h1>
        <p className="subtitle">Selecciona una especialidad para solicitar atención.</p>

        <section className="dashboard-grid">
          {specialties.map((specialty) => (
            <article className="option-card" key={specialty}>
              <h3>{specialty}</h3>
              <p>Disponible para ingreso a solicitud médica.</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Specialties;