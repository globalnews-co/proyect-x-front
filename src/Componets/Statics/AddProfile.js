import React, { useState } from 'react'; // Import useState
import "../../Assets/addprofile.css";
import Conexion from '../../Service/Conexion';

function AddProfile() {
  // Declare a state variable for form data
  const [form, setForm] = useState({});

  // Define the submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil completado");
   
    
    Conexion.completeProfile(form).then((response) => {
      console.log("response", response);
      if (response) {
        console.log("response", response);
        localStorage.setItem("profile",response.profile);
        window.location.href = "/";
        
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
   
        height: '100vh',
        width: '100vw',
        position: 'fixed',
      }}
    >
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
                    <label htmlFor="ciudad" className="form-label">
                      Ciudad
                    </label>
                    <select className="form-select input-style" id="ciudad" onChange={handleInputChange} required>
                    <option value="" disabled selected>seleccione su ciudad</option>
                      <option value="Bogota">Bogotá</option>
                      <option value="Medellin">Medellín</option>
                      <option value="Cali">Cali</option>
                      <option value="Barranquilla">Barranquilla</option>
                    </select>
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
