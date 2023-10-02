import React, { useState } from 'react'; // Import useState
import "../../Assets/addprofile.css";
import background from "../../Assets/imagenes/background.jpg";
import Navbar from './Navbar';
import Conexion from '../../Service/Conexion';

function AddProfile() {
  // Declare a state variable for form data
  const [form, setForm] = useState({});

  // Define the submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil completado");
    // Use history.push instead of window.location.href
    // to navigate within the app
    // agregar id a form
    form.idUser = localStorage.getItem("IDuser");

    Conexion.completeProfile(form).then((response) => {
      console.log("response", response);
      if (response) {
        console.log("response", response);
        localStorage.setItem("IDdirector", response);
        window.location.href = "/fd";
        
      } else {
        alert("no se pudo completar el perfil");
      }
    });
  };

  // Define functions to update form data when input fields change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
      }}
    >
      <Navbar />
      <div className="container " style={{ marginTop: '7rem' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card"
              style={{
                backgroundColor: 'rgb(26, 25, 25)',
                color: 'white',
                border: '1px solid #fd7700',
                boxShadow: 'rgba(162, 53, 0, 0.8) 0px 0px 10px 1px',
              }}
            >
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  <b>Completar Perfil</b>
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control input-style"
                      id="nombre"
                      placeholder="Ingrese su nombre"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control input-style"
                      id="email"
                      placeholder="Ingrese su email"
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="form-control input-style"
                      id="telefono"
                      placeholder="Ingrese su teléfono"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProfile;
