import '../../../Assets/clientstyle.css'

import React, { useEffect, useState, useContext } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Conexion from '../../../Service/Conexion';
import OffCanvasClients from '../Static/OffCanvasClients';
import FilterModal from '../../Statics/FilterModal';
import { DataContext } from '../Context/DataContext';

function ListClientes() {
  const { 
    setNitCliente, setDigito, data, setData, setDataContacto, idPerfil, 
    setIsCreating, nitCliente, digito, dividirCampo, setEmpresaCliente, 
    setNombreContacto, setCiudadCliente, setIdDirector, setTipoCliente, 
    setIdSector, setProbabilidad, setCargoContacto, setProveedor, setRedSocial,
    setFechaIngreso, setFuente, setObservaciones, setDirectores, setSectores, 
    setOldDigito, oldDigito
  } = useContext(DataContext);

  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const getData = () => {
      Conexion.getClientes(idPerfil)
        .then((response) => {
          setData(response);
        })
    }
    getData();
  }, []);

  useEffect(() => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl)
    });
  }, []);

  createTheme('clientTheme', {
    text: {
      primary: '#ffffff',
      secondary: '#666666',
    },
    background: {
      default: '#131212',
    },
    context: {
      background: '#276584',
      text: '#ffffff',
    },
    divider: {
      default: '#2a2a2a',
    },
    highlightOnHover: {
      default: '#1e1e1e',
      text: '#ffffff',
    },
    action: {
      button: '#276584',
      hover: '#1e4d63',
      disabled: '#666666',
    },
  }, 'dark');

  // Helper function to filter out "Pendiente" values
  const filterPendiente = (value) => {
    if (!value) return '';
    
    if (value.includes(';')) {
      // Split by semicolon, filter out "Pendiente" values, and join back
      return value
        .split(';')
        .filter(item => !item.trim().toLowerCase().includes('pendiente'))
        .join(', ');
    }
    
    // If single value and it's "Pendiente", return empty string
    return value.toLowerCase().includes('pendiente') ? '' : value;
  };

  const columns = [
    {
      name: 'NIT Cliente',
      selector: row => row.nitCliente,
      sortable: true,
    },
    {
      name: 'Nombre Empresa',
      selector: row => row.empresaCliente,
      sortable: true,
    },
    {
      name: 'Nombre Contacto',
      selector: row => filterPendiente(row.nombreContacto),
      sortable: true,
    },
    {
      name: 'Ciudad',
      selector: row => filterPendiente(row.ciudadCliente),
      sortable: true,
    },
    {
      name: 'Teléfono',
      selector: row => filterPendiente(row.telefono1),
      sortable: true,
    },
    {
      name: 'Director',
      selector: row => (
        <div className="client-list-director-cell">
          <i className="bi bi-person-circle client-list-director-icon"></i>
          {row.director}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Sector',
      selector: row => row.sector,
      sortable: true,
    },
    {
      name: 'Proveedor',
      selector: row => filterPendiente(row.Proveedor),
      sortable: true,
    }
  ];

  const openModal = (row) => {
    setNitCliente(row.nitCliente);
    setDigito(row.digitoVerificacion);
    const offCanvasElement = document.querySelector('#offCanvasClients');
    if (offCanvasElement) {
      const offCanvas = new window.bootstrap.Offcanvas(offCanvasElement);
      offCanvas.show();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await Conexion.getClienteById({ nitCliente, oldDigito: digito });
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
        });

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
        setDigito(response.digitoVerificacion);
        setOldDigito(response.digitoVerificacion);

        setIsCreating(false);
      }

      Conexion.listDirectores()
        .then((response) => {
          setDirectores(response);
        })
        .catch((error) => {
          console.log(error);
        });

      Conexion.listSectores()
        .then((response) => {
          setSectores(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [digito]);

  const addCliente = () => {
    setNitCliente('');
    setDigito('');
    setIsCreating(true);
    setDataContacto({
      nombre: '',
      ciudad: '',
      proveedor: '',
      fuente: '',
      cargo: '',
      info: [
        {
          telefono: '',
          email: ''
        }
      ]
    });

    setEmpresaCliente('');
    setNombreContacto('');
    setCiudadCliente('');
    setIdDirector('');
    setTipoCliente('');
    setIdSector('');
    setProbabilidad('');
    setCargoContacto('');
    setProveedor('');
    setRedSocial('');
    setFechaIngreso('');
    setFuente('');
    setObservaciones('');
    setTipoCliente('');
    setDigito('');
    setOldDigito('');

    const offCanvasElement = document.querySelector('#offCanvasClients');
    if (offCanvasElement) {
      const offCanvas = new window.bootstrap.Offcanvas(offCanvasElement);
      offCanvas.show();
    }
  };

  const filteredItems = data?.filter(item => {
    const searchText = filterText.toLowerCase();
    return (
      (item.nombreContacto && 
        item.nombreContacto.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.ciudadCliente && 
        item.ciudadCliente.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.empresaCliente && 
        item.empresaCliente.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.telefono1 && 
        item.telefono1.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.director && 
        item.director.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.sector && 
        item.sector.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText)) ||
      (item.Proveedor && 
        item.Proveedor.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(searchText))
    );
  }) || [];

  return (
    <div className="client-list-wrapper">
      <OffCanvasClients />
      <FilterModal />
      
      <div className="client-list-header">
        
        <div className="client-list-controls">
          <button 
            className="client-list-add-button"
            onClick={addCliente}
          >
            Añadir Cliente
          </button>
          
          <input
            className="client-list-search"
            type="text"
            placeholder="Buscar cliente..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>

      <div className="client-list-table">
        <DataTable
          columns={columns}
          data={filteredItems}
          theme="clientTheme"
          pagination
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por página:',
            rangeSeparatorText: 'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos',
          }}
          noDataComponent={
            <div className="client-list-no-data">
              No se encontraron resultados
            </div>
          }
          pointerOnHover
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="600px"
          onRowClicked={openModal}
        />
      </div>
    </div>
  );
}

export default ListClientes;