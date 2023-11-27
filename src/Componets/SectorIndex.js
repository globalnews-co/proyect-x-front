import React, { useState } from "react";
import Sector from "./Sector";
import Servicio from "./Servicio";
import DataTable, { createTheme } from 'react-data-table-component';
import './SectorIndex.css'; // Archivo CSS para estilos adicionales

function SectorIndex() {
  const [mostrarFormularioSector, setMostrarFormularioSector] = useState(false);
  const [mostrarFormularioServicio, setMostrarFormularioServicio] = useState(false);

  const handleBotonSector = () => {
    setMostrarFormularioSector(!mostrarFormularioSector);
  };

  const handleBotonServicio = () => {
    setMostrarFormularioServicio(!mostrarFormularioServicio);
  };

  const columnasSector = [
    { 'name': 'ID', 'selector': 'id' },
    { 'name': 'Servicio', 'selector': 'servicio' },
  ];
  const dataSector = [{ 'id': 1, "servicio": 'Clipping' }];

  const columnasServicio = [
    { 'name': 'ID', 'selector': 'id' },
    { 'name': 'Descripción', 'selector': 'descripcion' },
  ];
  const dataServicio = [{ 'id': 1, "descripcion": 'Servicio 1' }];

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

  return (
    <div className="container">
      <div className="card">
        <h2>Sectores</h2>
        <button onClick={handleBotonSector} className="btn btn-primary">
          {mostrarFormularioSector ? "Cerrar Sector" : "Crear Sector"}
        </button>

        <DataTable
          theme="solarized"
          columns={columnasSector}
          data={dataSector}
        />

        {mostrarFormularioSector && <Sector />}
      </div>

      <div className="card">
        <h2>Servicios</h2>
        <button onClick={handleBotonServicio} className="btn btn-primary">
          {mostrarFormularioServicio ? "Cerrar Servicio" : "Crear Servicio"}
        </button>

        <DataTable
          theme="solarized"
          columns={columnasServicio}
          data={dataServicio}
        />

        {mostrarFormularioServicio && <Servicio />}
      </div>
    </div>
  );
}

export default SectorIndex;
