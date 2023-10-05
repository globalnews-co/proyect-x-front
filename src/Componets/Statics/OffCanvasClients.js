import React, { useEffect } from 'react';

export default function OffCanvasClients(props) {
  const { idCliente } = props;
  useEffect(() => {
    // OBTENER LOS DATOS DEL CLIENTE POR ID
    Conexion.getClienteById(idCliente)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  , [idCliente]);
  return (
    <div>
        
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offCanvasClients"
        aria-labelledby="offcanvasExampleLabel"
        style={{width: '36rem'}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <i className="bi bi-person-fill"> Detalle del cliente </i>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label"
              style={{ color: '#ff7a7a' }}
            >
              Eliminar Cliente <i className="bi bi-trash2-fill"></i>
            </label>
          </div>
          <div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="empresa" className="form-label">
                  Empresa
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="empresa"
                  placeholder="Empresa"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="cargo" className="form-label">
                  Cargo Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cargo"
                  placeholder="Cargo"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="ciudad" className="form-label">
                  Ciudad
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ciudad"
                  placeholder="Ciudad"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="nivel" className="form-label">
                  Nivel Académico Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nivel"
                  placeholder="Nivel Académico"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="fuente" className="form-label">
                  Fuente del Contacto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fuente"
                  placeholder="Fuente del Contacto"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="telefono1" className="form-label">
                  Teléfono 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono1"
                  placeholder="Teléfono 1"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="telefono2" className="form-label">
                  Teléfono 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono2"
                  placeholder="Teléfono 2"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="redSocial" className="form-label">
                  Enlace Red Social
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="redSocial"
                  placeholder="Enlace Red Social"
                />
              </div>
            </div>

            <div className="row mb-3">
                <button className="btn btn-primary btn-sm btn-add-cliente">Guardar </button>
             
          </div>   
          </div>
        </div>
      </div>
    </div>
  );
}
