import React, { useContext, useEffect } from 'react';
import Conexion from '../../../Service/Conexion';
import { DataContext } from '../Context/DataContext';

export default function OffCanvasClients() {
  const {
    idCliente, empresaCliente, nombreContacto, ciudadCliente, telefono1,
    telefono2, IdDirector, idSector, probabilidad, cargoContacto,
    nivelAcademicoContact, redSocial, fechaIngreso, fuente, email, setIdCliente, observaciones, setEmpresaCliente, setNombreContacto,
    setCiudadCliente, setTelefono1, setTelefono2, setIdDirector, setIdSector, setProbabilidad,
    setCargoContacto, setNivelAcademicoContact, setRedSocial, setFechaIngreso, setFuente, setEmail, setObservaciones,directores , setDirectores,setSectores,sectores

  } = useContext(DataContext);
  useEffect(() => {
    // obtener dtaos del cliente
    const getData = () => {
      Conexion.getClienteById(5).then((response) => {
        setEmpresaCliente(response.empresaCliente);
        setNombreContacto(response.nombreContacto);
        setCiudadCliente(response.ciudadCliente);
        setTelefono1(response.telefono1);
        setTelefono2(response.telefono2);
        setIdDirector(response.idDirector);
        setIdSector(response.idSector);
        setProbabilidad(response.probabilidad);
        setCargoContacto(response.cargoContacto);
        setNivelAcademicoContact(response.nivelAcademicoContact);
        setRedSocial(response.redSocial);
        setFechaIngreso(response.fechaIngreso);
        setFuente(response.fuente);
        setEmail(response.email);
        setObservaciones(response.observaciones);
      
      });
      Conexion.listDirectores().then((response) => {
        setDirectores(response);
      }).catch((error) => {
        console.log(error);
      });
      Conexion.listSectores().then((response) => {
        setSectores(response);
      }
      ).catch((error) => {
        console.log(error);
      });
    }
    if (idCliente !== 0) {
      getData();
    }
    else{
      Conexion.listDirectores().then((response) => {
        setDirectores(response);
      }).catch((error) => {
        console.log(error);
      });
      Conexion.listSectores().then((response) => {
        setSectores(response);
      }
      ).catch((error) => {
        console.log(error);
      });
    }
  }, [idCliente])


  const saveChanges = () => {
    const form = {
      idCliente: idCliente,
      empresaCliente: empresaCliente,
      nombreContacto: nombreContacto,
      ciudadCliente: ciudadCliente,
      telefono1: telefono1,
      telefono2: telefono2,
      idDirector: IdDirector,
      idSector: idSector,
      probabilidad: probabilidad,
      cargoContacto: cargoContacto,
      nivelAcademicoContact: nivelAcademicoContact,
      redSocial: redSocial,
      fechaIngreso: fechaIngreso,
      fuente: fuente,
      email: email,
      observaciones: observaciones
    }
    if (idCliente !== 0) {
      //actualizar cliente
   
      Conexion.updateCliente(form).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      //crear cliente
      Conexion.createCliente(form).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  const deleteCliente = () => {
    Conexion.deleteCliente(3).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }
  console.log("idCliente", idCliente)
  return (
    <div>

      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offCanvasClients"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: '36rem' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          {idCliente !== 0 ? (
              <i className="bi bi-person-fill">Detalle de cliente:  {empresaCliente}</i>
            ) :             
            <i className="bi bi-person-fill"> Crear Cliente </i>
            }
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {(idCliente !== 0 ) ?(
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
                style={{ color: '#ff7a7a' }}
                onClick={deleteCliente}
              >
                Eliminar Cliente <i className="bi bi-trash2-fill"></i>
              </label>
            </div>
          ) : null}
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
                  value={nombreContacto}
                  onChange={(e) => setNombreContacto(e.target.value)}
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
                  value={empresaCliente}
                  onChange={(e) => setEmpresaCliente(e.target.value)}
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
                  value={cargoContacto}
                  onChange={(e) => setCargoContacto(e.target.value)}
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
                  value={ciudadCliente}
                  onChange={(e) => setCiudadCliente(e.target.value)}
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
                  value={nivelAcademicoContact}
                  onChange={(e) => setNivelAcademicoContact(e.target.value)}
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
                  value={fuente}
                  onChange={(e) => setFuente(e.target.value)}
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
                  value={telefono1}
                  onChange={(e) => setTelefono1(e.target.value)}
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
                  value={telefono2}
                  onChange={(e) => setTelefono2(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={redSocial}
                  onChange={(e) => setRedSocial(e.target.value)}
                />
              </div>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" htmlFor="director"> <i class="bi bi-person-fill"> Director </i></label>
              <select class="form-select"
                id="director"
                value={IdDirector}
                onChange={(e) => setIdDirector(e.target.value)}
              >
                <option selected>Seleccione...</option>
                {directores.map((director) => (
                  <option value={director.idDirector}>{director.nombre}</option>
                ))}
              </select>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" htmlFor="director"> <i class="bi bi-flag-fill">  Sector </i></label>
              <select class="form-select"
                id="director"
                value={idSector}
                onChange={(e) => setIdSector(e.target.value)}
              >
                <option selected>Seleccione...</option>
                {sectores.map((director) => (
                  <option value={director.idSector}>{director.nobmreSector}</option>
                ))}
              </select>
            </div>

            <div className="row mb-3">
              <button className="btn btn-primary btn-sm btn-add-cliente" onClick={saveChanges}>Guardar </button>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
