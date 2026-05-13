function MyRequests({ usuario, onBack }) {
  const requests = [
    {
      especialidad: "Cardiología",
      fecha: "13-05-2026",
      estado: "En espera",
      prioridad: "Media",
    },
    {
      especialidad: "Traumatología",
      fecha: "10-05-2026",
      estado: "Reasignada",
      prioridad: "Alta",
    },
  ];

  return (
    <div className="page">
      <div className="dashboard-shell">
        <button className="link-button" onClick={onBack}>
          Volver
        </button>

        <h1>Mis solicitudes</h1>
        <p className="subtitle">
          Paciente: {usuario?.nombre || "Paciente RedNorte"}
        </p>

        <section className="table-card">
          <table>
            <thead>
              <tr>
                <th>Especialidad</th>
                <th>Fecha solicitud</th>
                <th>Estado</th>
                <th>Prioridad</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={`${request.especialidad}-${request.fecha}`}>
                  <td>{request.especialidad}</td>
                  <td>{request.fecha}</td>
                  <td>{request.estado}</td>
                  <td>{request.prioridad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default MyRequests;