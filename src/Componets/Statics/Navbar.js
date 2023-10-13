import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime(),
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
  
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark  bg-opacity-0'>
        <div className="container-fluid">
          <div className="navbar-brand">
            <i className="bi bi-list me-2"></i> Inicio
          </div>
          <div className="navbar-text mx-auto">
            {this.state.currentTime}
          </div>
          <div className="navbar-text">
            Usuario
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
