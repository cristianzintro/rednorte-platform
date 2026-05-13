function PatientDashboard({ usuario, onNavigate, onLogout }) {
  return (
    <div className="page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Portal Paciente</p>
            <h1>Hola, {usuario?.nombre || "paciente"}</h1>
            <p className="subtitle">
              Consulta especialidades, doctores y estado de tus solicitudes médicas.
            </p>
          </div>

          <button className="btn secondary" onClick={onLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="dashboard-grid">
          <button className="option-card" onClick={() => onNavigate("doctors")}>
            <h3>Doctores</h3>
            <p>Revisa profesionales disponibles por especialidad.</p>
          </button>

          <button className="option-card" onClick={() => onNavigate("specialties")}>
            <h3>Especialidades</h3>
            <p>Consulta áreas médicas y solicita atención.</p>
          </button>

          <button className="option-card" onClick={() => onNavigate("create-request")}>
            <h3>Solicitar hora</h3>
            <p>Ingresa una solicitud para atención médica.</p>
          </button>

          <button className="option-card" onClick={() => onNavigate("my-requests")}>
            <h3>Mis solicitudes</h3>
            <p>Revisa estado, prioridad y lista de espera.</p>
          </button>
        </section>
      </div>
    </div>
  );
}

export default PatientDashboard;