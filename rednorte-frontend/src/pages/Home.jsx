function Home({ onSelectUserType }) {
  return (
    <div className="page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Servicio Público de Salud</p>
          <h1>RedNorte</h1>
          <p className="subtitle">
            Plataforma inteligente para la gestión de listas de espera hospitalarias.
          </p>

          <div className="hero-actions">
            <button className="btn" onClick={() => onSelectUserType("paciente")}>
              Soy paciente
            </button>

            <button
              className="btn secondary"
              onClick={() => onSelectUserType("trabajador")}
            >
              Soy trabajador
            </button>
          </div>
        </div>

        <div className="info-panel">
          <h2>Portal de atención</h2>
          <ul>
            <li>Consulta especialidades médicas disponibles.</li>
            <li>Solicita atención y entra a lista de espera.</li>
            <li>Revisa el estado de tus solicitudes.</li>
            <li>Recibe información sobre reasignaciones de horas.</li>
          </ul>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>Listas de espera</h3>
          <p>
            Centraliza solicitudes médicas para mejorar el seguimiento de pacientes.
          </p>
        </article>

        <article className="feature-card">
          <h3>Reasignación de horas</h3>
          <p>
            Optimiza horas disponibles cuando ocurre una cancelación médica.
          </p>
        </article>

        <article className="feature-card">
          <h3>Portal paciente</h3>
          <p>
            Entrega visibilidad sobre solicitudes, estados y atención médica.
          </p>
        </article>
      </section>
    </div>
  );
}

export default Home;