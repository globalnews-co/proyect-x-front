import React, { useState } from "react";
import Sector from "./Sector";
import DataTable, { createTheme } from 'react-data-table-component';




  
function SectorIndex() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleBoton = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
const columnas=[{'name':'id','selector':'id'},{'name':'servicio','selector':'servicio'}]
const data=[{'id':1,"servicio":'Clipping'}]

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
   
    <div>
      <button onClick={handleBoton} className="btn btn-primary">
        {mostrarFormulario ? "Cerrar Sector" : "Crear Sector"}
      </button>
      <div className="card" style={{width:"100rem"}}>

      
      <DataTable
      theme="solarized"
                          columns={columnas}
                          data={data}
                        />

      {mostrarFormulario && <Sector />}
      </div>
    </div>
    
  );
}

export default SectorIndex;
