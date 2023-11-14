import React, { useContext, useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import Conexion from '../../../Service/Conexion'
import { DataContext } from '../Context/DataContext'
import moment from 'moment/moment'
import Swal from 'sweetalert2';

export default function DetalleCliente() {

  const [servicios, setServicios] = useState([])
  const { idCliente } = useContext(DataContext)
  const [ventas, setVentas] = useState([])

  function formatearMoneda(numero) {
    // Formatea el número con dos decimales y comas para separar los miles
    let formatoMoneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(numero);
    return formatoMoneda;
  }


  useEffect(() => {
    Conexion.GetServicios()
      .then((response) => {
        const servicios = response

        Conexion.ListServiciosByCliente(idCliente).then((response) => {
          const numeros = response
          console.log(numeros)
          const nuevoArregloObjetos = servicios.map(objeto => {

            if (numeros.includes(objeto.idServicio)) {
              return { ...objeto, check: true };
            } else {
              return { ...objeto, check: false };
            }
          });
          console.log(nuevoArregloObjetos)
          setServicios(nuevoArregloObjetos)
        })




      })
      .catch((error) => {
        // Handle error
        console.log(error)
        Swal.fire({
          icon:'error',
          title:'Error',
          text:'No se pudocargar los servicios del cliente'
        })

      });




    Conexion.ListVentasByCliente(idCliente)
      .then((response) => {
        setVentas(response)
      })
      .catch((error) => {
        // Handle error
        console.log(error)
      });
  }, [idCliente])

  let total = 0;
  let totalFormateado = ""
  if (ventas.length > 0) {
    ventas.forEach(element => {
      total += element.ingresosFacturacion;
    });
    totalFormateado = formatearMoneda(total)
  }
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [proyeccion, setProyeccion] = useState('')
  const [ingresosFacturacion, setIngresosFacturacion] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [fechaAcuerdo, setFechaAcuerdo] = useState('')

  const sendData = () => {
    const form = {
      idCliente: idCliente,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      proyeccion: proyeccion,
      ingresosFacturacion: ingresosFacturacion,
      idServicio: idServicio,
      fechaAcuerdo: fechaAcuerdo
    }
    Conexion.CreateVenta(form).then((response) => {
      alert("Venta agregada")
      //Actualizar la tabla de ventas
      Conexion.ListVentasByCliente(idCliente)
        .then((response) => {
          setVentas(response)
        })
        .catch((error) => {
          // Handle error
          console.log(error)
        });
    })
  }


  createTheme('bluesolarised', {
    text: {
      primary: '#fff',
      secondary: '#2aa198',
    },
    background: {
      default: '#1e2a37',
    },
    context: {
      background: '#0dfd2d',
      text: '#0dfd2d',
    },
    divider: {
      default: '#073642',
    },
    highlightOnHover: {
      default: '#073642',
      text: '#ffffff',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgb(198, 58, 58)',
      disabled: 'rgba(0,0,0,.12)',

    },
  }, 'dark');

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    const newChecked = checked;
    console.log(value)
    console.log(newChecked)
    const form = {
      idCliente: idCliente,
      idServicio: value
    }
    const newServicios = servicios.map((item) => {
      console.log(item.idServicio, value)
      if (item.idServicio == value) {
        console.log("entro")
      if (newChecked=== false) {
        console.log("entro a false")
        
        Conexion.DeleteServicioCliente(form).then((response) => {
          console.log(response)
        })
      }
      else{
        console.log("entro a true")
     
        Conexion.CreateServicioCliente(form).then((response) => {
          console.log(response)
        })
      }
        return { ...item, check: newChecked };
      } else {
        console.log("no entro")
        return item;
      }
    });
    console.log(newServicios)
    setServicios(newServicios);
  }

  const colums = [
    {
      name: 'Servicio',
      selector: 'servicio',
    },
    {
      name: 'Fecha de inicio',
      selector: row => moment(row.fechaInicio).format('DD/MM/YYYY')
    },
    {
      name: 'Fecha de fin',
      selector: row => moment(row.fechaFin).format('DD/MM/YYYY')
    },

    {
      name: 'Valor',
      selector: row => formatearMoneda(row.ingresosFacturacion),
    }
  ]


  return (
    <div style={{ color: 'black' }}
    >
      <div className="modal fade" id="modalDetalleCliente" tabindex="-1" aria-labelledby="modalDetalleClienteLabel" aria-hidden="true"
        style={{ backgroundColor: 'rgba(26, 26, 26, 0.84)' }}>
        <div className="modal-dialog  modal-xl">
          <div className="modal-content" style={{ backgroundColor: "white" }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Ventas para el cliente</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className='col-6'>
                  <div className='col-12'>
                    < div className='card ' style={{ backgroundColor: "#1e2a37", color: "white" }}>
                      <div className='card-body'>
                        <h5 className='card-title'>Servicios De Interes</h5>


                        {servicios.map((item) => (
                          <div className="form-check" key={item.idServicio}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.idServicio}
                              id={`checkbox_${item.idServicio}`}
                              checked={item.check}
                              onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor={`checkbox_${item.idServicio}`}>
                              {item.tipoServicio}
                            </label>
                          </div>
                        ))}


                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2'>
                    < div className='card ' style={{ backgroundColor: "#1e2a37", color: "white" }}>
                      <div className='card-body'>
                        <DataTable
                          columns={colums}
                          theme="bluesolarised"
                          data={ventas}
                        />
                      </div>
                    </div>
                    <div className='card ' style={{ backgroundColor: "#1e2a37", color: "white" }}>
                      <div className='card-body'>
                        <span>Total Ventas: </span> <span>{totalFormateado}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  < div className='card ' style={{ backgroundColor: "#1e2a37", color: "white" }}>
                    <div className='card-body'>
                      <h5 className='card-title'>Agregar venta</h5>
                      <div className='row'>
                        <div className='col-6'>
                          <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="fechaInicioInput" onChange={(e) => setFechaInicio(e.target.value)} />
                            <label for="fechaInicioInput">Fecha inicio de venta</label>
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="fechaFinInput" onChange={(e) => setFechaFin(e.target.value)} />
                            <label for="fechaFinInput">Fecha fin de venta</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="fechaAcuerdoInput" onChange={(e) => setFechaAcuerdo(e.target.value)} />
                        <label for="fechaAcuerdoInput">Fecha de acuerdo</label>
                      </div>

                      <div className='row'>
                        <div className='col-6'>
                          <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="presupuestoMinimoInput" onChange={(e) => setProyeccion(e.target.value)} />
                            <label for="presupuestoMinimoInput">Presupuesto minimo</label>
                          </div>
                        </div>
                        <div className='col-6'>
                          <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="montoVentaInput" onChange={(e) => setIngresosFacturacion(e.target.value)} />
                            <label for="montoVentaInput">Monto de venta</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <select className="form-control" id="floatingInput" onChange={(e) => setIdServicio(e.target.value)}>
                          <option value="0">Seleccione un servicio...</option>

                          {servicios && servicios.map((item) => {
                            if (item.idServicio !== null && item.idServicio !== undefined && item.tipoServicio !== null && item.tipoServicio !== undefined) {
                              return (
                                <option key={item.idServicio} value={item.idServicio}>{item.tipoServicio}</option>
                              );
                            }
                          })
                          }
                        </select>

                        <div>

                        </div>
                        <label for="floatingInput">Servicio</label>
                      </div>
                      <button type="button " style={{ width: '100%' }} className="btn btn-primary" onClick={sendData}>Agregar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>


    </div>
  )
}
