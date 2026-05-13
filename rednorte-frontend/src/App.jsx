import { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Doctors from "./pages/Doctors";
import Specialties from "./pages/Specialties";
import CreateRequest from "./pages/CreateRequest";
import MyRequests from "./pages/MyRequests";

const API_URL = "http://localhost:8081/api/auth";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const seleccionarTipoUsuario = (tipo) => {
    setUserType(tipo);
    setCurrentPage("login");
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setUserType(null);
    setCurrentPage("home");
  };

  const iniciarSesionCorrecta = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado);

    if (usuarioAutenticado.rol === "ADMINISTRADOR" || userType === "trabajador") {
      setCurrentPage("worker-dashboard");
    } else {
      setCurrentPage("patient-dashboard");
    }
  };

  if (currentPage === "home") {
    return <Home onSelectUserType={seleccionarTipoUsuario} />;
  }

  if (currentPage === "login") {
    return (
      <Login
        apiUrl={API_URL}
        userType={userType}
        onLoginSuccess={iniciarSesionCorrecta}
        onGoRegister={() => setCurrentPage("register")}
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <Register
        apiUrl={API_URL}
        onRegisterSuccess={() => setCurrentPage("login")}
        onBack={() => setCurrentPage("login")}
      />
    );
  }

  if (currentPage === "patient-dashboard") {
    return (
      <PatientDashboard
        usuario={usuario}
        onNavigate={navigate}
        onLogout={cerrarSesion}
      />
    );
  }

  if (currentPage === "worker-dashboard") {
    return (
      <WorkerDashboard
        usuario={usuario}
        onLogout={cerrarSesion}
      />
    );
  }

  if (currentPage === "doctors") {
    return <Doctors onBack={() => setCurrentPage("patient-dashboard")} />;
  }

  if (currentPage === "specialties") {
    return <Specialties onBack={() => setCurrentPage("patient-dashboard")} />;
  }

  if (currentPage === "create-request") {
    return (
      <CreateRequest
        usuario={usuario}
        onBack={() => setCurrentPage("patient-dashboard")}
      />
    );
  }

  if (currentPage === "my-requests") {
    return (
      <MyRequests
        usuario={usuario}
        onBack={() => setCurrentPage("patient-dashboard")}
      />
    );
  }

  return <Home onSelectUserType={seleccionarTipoUsuario} />;
}

export default App;