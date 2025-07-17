import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import Conexion from '../../../Service/Conexion';
import Swal from 'sweetalert2';
import DetalleCliente from '../Details/DetalleCliente';
import moment from 'moment';
import Contactos from './OffContactos.js';
import '../../../Style/canvascliente.css';
import { X, Trash2, ClipboardList, User, Flag, Building2 } from 'lucide-react';
export default function OffCanvasClients() {
  const {
    infoContacto, empresaCliente, nombreContacto, ciudadCliente, telefono1,
    telefono2, IdDirector, idSector, probabilidad, cargoContacto,
    proveedor, redSocial, fechaIngreso, fuente, email, setnitCliente, observaciones, setEmpresaCliente, setNombreContacto,
    setCiudadCliente, setTelefono1, setTelefono2, setIdDirector, setIdSector, setProbabilidad,
    setCargoContacto, setProveedor, setRedSocial, setFechaIngreso, setFuente, setEmail, setObservaciones, directores, setDirectores, setSectores, sectores,
    tipoCliente, setTipoCliente, nitCliente, setNitCliente, digito, setDigito, setDataContacto, isCreating, setIsCreating, dividirCampo,
    oldDigito, setOldDigito
  } = useContext(DataContext);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await Conexion.getClienteById({ nitCliente, oldDigito: digito })
      if (response) {
        setDataContacto({
          nombre: dividirCampo(response.nombreContacto),
          ciudad: dividirCampo(response.ciudadCliente),
          proveedor: dividirCampo(response.proveedor),
          fuente: dividirCampo(response.fuente),
          cargo: dividirCampo(response.cargoContacto),
          info: [
            {
              telefono: dividirCampo(response.telefono1),
              email: dividirCampo(response.email)
            }
          ]
        })
        console.log(response.idDirector)
        setEmpresaCliente(response.empresaCliente);
        setNombreContacto(response.nombreContacto);
        setCiudadCliente(response.ciudadCliente);
        setIdDirector(response.idDirector);
        setTipoCliente(response.tipoCliente);
        setIdSector(response.idSector);
        setProbabilidad(response.probabilidad);
        setCargoContacto(response.cargoContacto);
        setProveedor(response.proveedor);
        setRedSocial(response.redSocial);
        setFechaIngreso(response.fechaIngreso);
        setFuente(response.fuente);
        setObservaciones(response.observaciones);
        setTipoCliente(response.tipoCliente);
        setDigito(response.digitoVerificacion)
        setOldDigito(response.digitoVerificacion)
        setIsCreating(false);
      }

      Conexion.listDirectores().then((response) => {
        setDirectores(response);
      }).catch((error) => {
        console.log(error);
      });

      Conexion.listSectores().then((response) => {
        setSectores(response);
      }).catch((error) => {
        console.log(error);
      });
    }
    getData();
  }, [nitCliente])

  const handleDVChange = async (e) => {
    const newDigito = e.target.value;
    setDigito(newDigito);

    if (newDigito.length > 15) {
      alert('El Digito ingresado es demasiado largo. Ingresa un número válido de hasta 19 dígitos.');
      return;
    }
    const response = await Conexion.getClienteById({ nitCliente, oldDigito: newDigito });

    if (isCreating) {
      if (response && oldDigito) {
        setDataContacto({
          nombre: dividirCampo(response.nombreContacto),
          ciudad: dividirCampo(response.ciudadCliente),
          proveedor: dividirCampo(response.proveedor),
          fuente: dividirCampo(response.fuente),
          cargo: dividirCampo(response.cargoContacto),
          info: [
            {
              telefono: dividirCampo(response.telefono1),
              email: dividirCampo(response.email)
            }
          ]
        })

        setEmpresaCliente(response.empresaCliente);
        setNombreContacto(response.nombreContacto);
        setCiudadCliente(response.ciudadCliente);
        setTelefono1(response.telefono1);
        setTelefono2(response.telefono2);
        setIdDirector(response.idDirector);
        setTipoCliente(response.tipoCliente);
        setIdSector(response.idSector);
        setProbabilidad(response.probabilidad);
        setCargoContacto(response.cargoContacto);
        setProveedor(response.proveedor);
        setRedSocial(response.redSocial);
        setFechaIngreso(response.fechaIngreso);
        setFuente(response.fuente);
        setEmail(response.email);
        setObservaciones(response.observaciones);
        setIsCreating(false);
      } else if (!response) {
        setIsCreating(true)
      }
    }
  };

  const saveChanges = () => {
    const form = {
      nitCliente: nitCliente,
      oldDigito,
      newDigito: digito,
      empresaCliente: empresaCliente,
      redSocial: redSocial,
      infoContacto,
      idDirector: IdDirector,
      idSector: idSector,
      probabilidad: probabilidad,
      cargoContacto: cargoContacto,
      fechaIngreso: moment().format('YYYY-MM-DD'),
      observaciones: observaciones,
      tipoCliente: tipoCliente,
    }

    if (!isCreating) {
      Conexion.updateCliente(form).then((response) => {
        Swal.fire({
          title: 'Cliente Actualizado',
          text: 'El cliente fue actualizado con éxito',
          icon: 'success',
          timer: 2000,
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        })
      }).catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el cliente',
          icon: 'error',
          timer: 2000,
          confirmButtonText: 'Aceptar'
        })
      });
    } else {
      Conexion.getClienteById(nitCliente, digito).then((response) => {
        if (response) {
          Swal.fire({
            title: 'Cliente existente',
            text: 'Este cliente ya ha sido registrado',
            icon: 'warning',
            timer: 3000
          })
        } else {
          Conexion.createCliente(form)
            .then((response) => {
              if (response) {
                Swal.fire({
                  title: 'Cliente Creado',
                  text: response.data.message,
                  icon: 'success',
                  timer: 2000,
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo crear el cliente',
                  icon: 'error',
                  timer: 2000,
                  confirmButtonText: 'Aceptar'
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                timer: 2000,
                confirmButtonText: 'Aceptar'
              });
            });
        }
      })
    }
  }

  const deleteCliente = () => {
    Swal.fire({
      title: '¿Está seguro de eliminar el cliente?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff7a7a',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Conexion.deleteCliente({ nitCliente, digito }).then(() => {
          Swal.fire({
            title: 'Cliente Eliminado',
            text: 'El cliente fue eliminado con éxito',
            icon: 'success',
            timer: 2000,
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.reload();
          })
        }).catch((error) => {
          console.log(error);
        });
      }
    })
  }

  return (
    <div>
  <DetalleCliente />
  <div
    className="offcanvas offcanvas-end text-white"
    tabIndex="-1"
    id="offCanvasClients"
    aria-labelledby="offCanvasClientsLabel"
    style={{ width: '45rem', backgroundColor: '#111827' }}
  >
    {/* Header */}
    <div className="offcanvas-header border-b border-gray-700 pb-4">
      <h5 className="offcanvas-title text-xl font-semibold" id="offCanvasClientsLabel">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          {isCreating ? 'Crear Cliente' : `Detalle de cliente: ${empresaCliente}`}
        </div>
      </h5>
      <button
        type="button"
        className="text-gray-400 hover:text-white transition-colors"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    {/* Body */}
    <div className="offcanvas-body p-4 overflow-y-auto">
      {/* Action buttons - only show when not creating */}
      {!isCreating && (
        <div className="flex justify-between mb-4">
          <button
            onClick={deleteCliente}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Eliminar Cliente</span>
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            data-bs-toggle="modal"
            data-bs-target="#modalDetalleCliente"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Ver Más</span>
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* Client identification section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h6 className="text-blue-400 text-sm font-medium mb-3">Información de Identificación</h6>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">NIT Cliente</label>
              <input
                type="text"
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="NIT Cliente"
                value={nitCliente}
                onChange={(e) => {
                  const validValue = e.target.value.replace(/[^0-9]/g, '');
                  setNitCliente(validValue);
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dígito de Verificación</label>
              <input
                type="number"
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Digito"
                value={digito}
                onChange={handleDVChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Empresa</label>
              <input
                type="text"
                className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Empresa"
                value={empresaCliente}
                onChange={(e) => setEmpresaCliente(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
              />
            </div>
          </div>
        </div>

        {/* Contact section - REMOVED WHITE BORDER */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h6 className="text-blue-400 text-sm font-medium mb-3">Información de Contacto</h6>
          <div className="contactos-container">
            <Contactos isCreating={isCreating} />
          </div>
        </div>

        {/* Social media section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h6 className="text-blue-400 text-sm font-medium mb-3">Redes Sociales</h6>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Enlace Red Social</label>
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enlace Red Social"
              value={redSocial}
              onChange={(e) => setRedSocial(e.target.value)}
            />
          </div>
        </div>

        {/* Classification section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h6 className="text-blue-400 text-sm font-medium mb-3">Clasificación</h6>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Director</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select 
                  className="w-full bg-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  value={IdDirector}
                  onChange={(e) => setIdDirector(e.target.value)}
                >
                  <option value="0">Seleccione...</option>
                  {directores.map((director) => (
                    <option key={director.id} value={director.id}>{director.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo Cliente</label>
              <div className="relative">
                <Flag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  className="w-full bg-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  value={tipoCliente}
                  onChange={(e) => setTipoCliente(e.target.value)}
                >
                  <option>Seleccione...</option>
                  <option value="directo">Directo</option>
                  <option value="agencia de comunicaciones">Agencia de comunicaciones</option>
                  <option value="Agencia Publicidad">Agencia Publicidad</option>
                  <option value="Centrales de medios">Centrales de medios</option>
                  <option value="Gobierno">Gobierno</option>
                  <option value="Gobierno directo">Gobierno directo</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sector</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <select
                className="w-full bg-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                value={idSector}
                onChange={(e) => setIdSector(e.target.value)}
              >
                <option>Seleccione...</option>
                {sectores.map((sector) => (
                  <option key={sector.id} value={sector.id}>{sector.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h6 className="text-blue-400 text-sm font-medium mb-3">Observaciones</h6>
          <div>
            <textarea
              className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Observaciones"
              rows={4}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
            />
          </div>
        </div>

        {/* Save button */}
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          onClick={saveChanges}
        >
          {isCreating ? 'Crear Cliente' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  </div>
</div>
  );
};