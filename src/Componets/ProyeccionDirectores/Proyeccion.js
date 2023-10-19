import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import '../../Assets/clientstyle.css'
import Navbar from '../Statics/Navbar';
import ModalProyeccion from './ModalProyeccion';
import Conexion from '../../Service/Conexion';
function Proyeccion() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
      
     const getData = () => {
          Conexion.listDirectores()
              .then((response) => {
                  setData(response);
              })
      }
      getData();
  }, [])
  
  const [idDirector, setIdDirector] = useState(0);
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
      name: 'ID',
      selector: row => row.idDirector,
    },
    {
      name: 'Nombre Director',
      selector: 'nombre',
      sortable: true,
    },
    
    {
      name: 'Ciudad',
      selector: row => row.ciudad,
      sortable: true,
    },

    {
      name: 'Telefono',
      selector: 'telefono',
      sortable: true,
    },
   
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    }
   

  ]
  const openModal = (row) => {
    //alert("funcione")
    setIdDirector(row.idDirector)
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
        idDirector={idDirector}
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