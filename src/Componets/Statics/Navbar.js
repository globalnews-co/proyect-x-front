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
    return now.toLocaleString(); // Puedes personalizar el formato según tus preferencias
  }

  render() {
    return (
      <nav className='row align-items-center' style={{ padding: '0.7rem', width: '100vw' }}>
        <div className="col-4 d-flex align-items-center">
          <i className="bi bi-list">Inicio</i> 
        </div>
        <div className="col-4 text-center">
          {this.state.currentTime}
          
        </div>
        <div className="col-4 text-end">
          Usuario
        </div>
      </nav>
    );
  }
}

export default Navbar;
