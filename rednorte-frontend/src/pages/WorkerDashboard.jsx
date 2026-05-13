function WorkerDashboard({ usuario, onLogout }) {
  return (
    <div className="page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Panel Trabajador</p>
            <h1>Bienvenido/a, {usuario?.nombre || "trabajador"}</h1>
            <p className="subtitle">
              Gestión interna de solicitudes, listas de espera y reasignaciones.
            </p>
          </div>

          <button className="btn secondary" onClick={onLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="table-card">
          <h2>Solicitudes recientes</h2>

          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Especialidad</th>
                <th>Prioridad</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Juan Pérez</td>
                <td>Cardiología</td>
                <td>Alta</td>
                <td>En espera</td>
              </tr>
              <tr>
                <td>Ana Soto</td>
                <td>Traumatología</td>
                <td>Media</td>
                <td>Pendiente</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default WorkerDashboard;