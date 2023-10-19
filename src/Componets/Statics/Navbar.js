import React, { Component } from 'react';
import OffCanvas from './OffCanvas';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime(),
      showPopover: false,
    };
  }

  componentDidMount() {
    // Actualiza la hora cada segundo
    this.intervalID = setInterval(() => {
      this.setState({ currentTime: this.getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    // Limpia el intervalo cuando el componente se desmonta
    clearInterval(this.intervalID);
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString(); // Cambiado a mostrar solo la hora
  }

  // Función para mostrar/ocultar el popover
  togglePopover = () => {
    this.setState((prevState) => ({
      showPopover: !prevState.showPopover,
    }));
  };

  // cerrrar sesión
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('IDdirector');
    localStorage.removeItem('IDuser');
    window.location.href = '/';
  }

  render() {
    return (
      <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-opacity-0'>
        <div className="container-fluid">
          <div className="navbar-brand"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="bi bi-list me-2"></i> Inicio
          </div>

          <div className="navbar-text mx-auto" >
            {this.state.currentTime}
          </div>
          <div >
            <div className="navbar-text" id="userPopover" style={{ cursor: 'pointer' }} onClick={this.togglePopover}>
              <i className="bi bi-person-circle me-2"></i>
              Usuario
            </div>
            {/* Popover para opciones de usuario */}
            {this.state.showPopover && (

              <div id="userPopoverContent" className="flex-column position-absolute" >
                <div className="d-flex flex-column">
                  <a  className="btn btn-light btn-sm text-start" onClick={this.logout}>Cerrar sesión</a>
                </div>
              </div>
            )}

          </div>

        </div>
        
      </nav>
      <OffCanvas/>
      </div>
    );
  }
}

export default Navbar;
