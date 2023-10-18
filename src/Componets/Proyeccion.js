import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import Conexion from '../Service/Conexion';
import '../Assets/clientstyle.css'
import Navbar from './Statics/Navbar';
import ModalProyeccion from './Statics/ProyeccionDirectores/ModalProyeccion';
function Proyeccion() {
  const [data, setData] = useState([
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "VELOS",
      "nombreContacto": "Ila Hyde",
      "ciudadCliente": "504 Myrtle Avenue, Torboy, Colorado, 9215",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "LYRICHORD",
      "nombreContacto": "Kate Gilbert",
      "ciudadCliente": "763 Sackett Street, Allentown, Nevada, 2764",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "INTRADISK",
      "nombreContacto": "Lilia Reed",
      "ciudadCliente": "662 Driggs Avenue, Alderpoint, Connecticut, 305",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "ISBOL",
      "nombreContacto": "Byers Molina",
      "ciudadCliente": "765 Boardwalk , Whipholt, Oregon, 2161",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "MEDCOM",
      "nombreContacto": "Briana Chambers",
      "ciudadCliente": "892 Cyrus Avenue, Why, Federated States Of Micronesia, 153",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "ZILLAR",
      "nombreContacto": "Patti Lott",
      "ciudadCliente": "982 Leonora Court, Marenisco, District Of Columbia, 8377",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    },
    {
      "empresaCliente": "EXOSPEED",
      "nombreContacto": "Hess Johns",
      "ciudadCliente": "439 Bridgewater Street, Bergoo, Virgin Islands, 436",
      "selector": 1,
      "idSector": 1,
      "probabilidad": 1
    }
  ]);
  /*
  useEffect(() => {
      
     const getData = () => {
          Conexion.getClientes()
              .then((response) => {
                  setData(response.data);
              })
      }
      getData();
  }, [])
  */
  const [idCliente, setIdCliente] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [nombreDirector, setNombreDirector] = useState('');
  useEffect(() => {
    // Inicializa todos los popovers en el documento
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl)
    });
  }, []);

  const showFilter = () => {
    setShowFilterModal(true);
    alert('hola')
  }

  createTheme('solarized', {
    text: {
      primary: '#fff',
      secondary: '#2aa198',
    },
    background: {
      default: '#131212',
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


  const columns = [
    {
      name: 'Nombre Director',
      selector: 'empresaCliente',
      sortable: true,
    },
    
    {
      name: 'Ciudad',
      selector: 'ciudadCliente',
      sortable: true,
    },

    {
      name: 'Telefono',
      selector: 'telefono1',
      sortable: true,
    },
   
    {
      name: 'Ubicacion',
      selector: 'probabilidad',
      sortable: true,
    },
    {
        name: 'Rendimioento',
        selector: 'probabilidad',
        sortable: true,
    }

  ]
  const openModal = (row) => {
    //alert("funcione")
    setIdCliente(row.idSector)
    setNombreDirector(row.empresaCliente)


    // alert(row.nombreContacto)
    // setShowOffCanvas(true);
    const offCanvasElement = document.querySelector('#modalProyeccion');
    // Muestra el OffCanvas si existe
    if (offCanvasElement) {
      const offCanvas = new window.bootstrap.Modal(offCanvasElement);
      offCanvas.show();
    }
  }
  return (
   
    <div className='Body'>
       <Navbar/>
      
   
      <div className='container content-list-clientes'>
        <div className='row container-clients' style={{ justifyContent: "space-between" }}>
          <div className='col-4'>
            <h4 className='title-list-clientes'>DIRECTORES DE CUENTA</h4>
          </div>
          {/*alinear a la derecha*/}
          <div className='col-8 col-sm-6'>
            <div className='row'>
              <div className='col-6'>
                <div className='row'>
                  <div className='col-6'>
                    <button className='btn btn-danger btn-sm btn-add-cliente'>Añadir </button>
                  </div>
                </div>
              </div>
              <div className='col-6'>
                <input className="dark-input" type="text" placeholder="Buscar..." />
              </div>
            </div>
          </div>
        </div>
  

        <ModalProyeccion
        nombreDirector={nombreDirector}
        idCliente={idCliente}
        />
        <DataTable
          columns={columns}
          data={data}
          theme="solarized"
          pointerOnHover={true}
          highlightOnHover={true}
          fixedHeader={true}
          fixedHeaderScrollHeight="600px"
          pagination
          onRowClicked={row => openModal(row)}
        />

      </div>

    </div>
  )
}

export default Proyeccion;

