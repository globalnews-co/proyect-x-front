import React, { Component } from 'react';
import SideBar from './SideBar';

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
    localStorage.removeItem('userName');
    window.location.href = '/';
  }

 

  render() {
    const userName = localStorage.getItem('userName');
    return (
      <div>
      <nav className='navbar navbar-expand-lg' style={{backgroundColor:"black",color:"white",fontSize:"16px",padding:'10px'}}>
        <div className="container-fluid">
          <div  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="bi bi-list me-2"></i> Inicio
          </div>
          <div className="mx-auto" >
            {this.state.currentTime}
          </div>
          <div >
            <div className="" id="userPopover" style={{ cursor: 'pointer' }} onClick={this.togglePopover}>
              <i className="bi bi-person-circle me-2"></i>
              {userName}	
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
      <SideBar/>
      </div>
    );
  }
}

export default Navbar;
