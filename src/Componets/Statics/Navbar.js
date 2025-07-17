// Navbar.jsx
import '../../Style/navbar.css'
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Conexion from '../../Service/Conexion';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  );
  
  const [userProfile, setUserProfile] = useState({
    nombre: "",
    email: "",
    ciudad: ""
  });
  
  const location = useLocation();

  useEffect(() => {
    // Obtener los datos del perfil desde localStorage
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData);
        setUserProfile({
          nombre: parsedProfile.nombre || "",
          email: parsedProfile.email || "",
          ciudad: parsedProfile.ciudad || ""
        });
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    }

    // Configurar el temporizador para la hora
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('es-CO', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro que deseas salir del sistema?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#64748b',
        customClass: {
          container: 'logout-modal',
          popup: 'rounded-lg',
          title: 'text-xl font-semibold',
          confirmButton: 'font-medium',
          cancelButton: 'font-medium'
        }
      });

      if (result.isConfirmed) {
        await Conexion.logOutRegister();
        localStorage.clear();
        window.location.href = '/';
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cerrar la sesión',
        icon: 'error',
        customClass: {
          popup: 'rounded-lg'
        }
      });
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="app-logo" title="Inicio">
            <i className="bi bi-grid-fill"></i>
          </Link>
          
          <nav className="nav-menu">
            <Link 
              to="/agenda" 
              className={`nav-link ${location.pathname === '/agenda' ? 'active' : ''}`}
              title="Agenda"
            >
              <i className="bi bi-calendar3"></i>
              <span>Agenda</span>
            </Link>
            <Link 
              to="/clientes" 
              className={`nav-link ${location.pathname === '/clientes' ? 'active' : ''}`}
              title="Clientes"
            >
              <i className="bi bi-people-fill"></i>
              <span>Clientes</span>
            </Link>
          </nav>
        </div>

        <div className="navbar-center">
          <div className="time-display" title="Hora actual">
            {currentTime}
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-profile">
            <div className="profile-info">
              <span className="user-name">{userProfile.nombre}</span>
              <span className="user-location">
                <i className="bi bi-geo-alt"></i> {userProfile.ciudad}
              </span>
            </div>
            <button 
              className="profile-avatar"
              title={userProfile.email}
            >
              <i className="bi bi-person-circle"></i>
            </button>
          </div>

          <button 
            onClick={handleLogout} 
            className="logout-btn"
            title="Cerrar sesión"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;