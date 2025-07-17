import React, { createContext, useState } from "react";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [empresaCliente, setEmpresaCliente] = useState('');
  const [direccion, setDireccion] = useState('')
  const [nombreContacto, setNombreContacto] = useState('');
  const [ciudadCliente, setCiudadCliente] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');
  const [nitCliente, setNitCliente] = useState(null)
  const [digito, setDigito] = useState(null)
  const [anunciante, setAnunciante] = useState('')
  const [infoContacto, setInfoContacto] = useState('')
  const [isCreating, setIsCreating] = useState(null);


  const [IdDirector, setIdDirector] = useState('');
  const [idSector, setIdSector] = useState('');
  const [probabilidad, setProbabilidad] = useState('');
  const [cargoContacto, setCargoContacto] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [redSocial, setRedSocial] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState(null);
  const [fuente, setFuente] = useState('');
  const [email, setEmail] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [directores, setDirectores] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [idCliente, setIdCliente] = useState(0);
  const [tipoCliente, setTipoCliente] = useState('');
  const [ventas, setVentas] = useState([])
  const [servicios, setServicios] = useState([])
  const [idVenta, setIdVenta] = useState(0)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [proyeccion, setProyeccion] = useState(0)
  const [ingresosFacturacion, setIngresosFacturacion] = useState(0)
  const [idServicio, setIdServicio] = useState('')
  const [fechaAcuerdo, setFechaAcuerdo] = useState('')
  const [numeroCotizacion, setNumeroCotizacion] = useState('')
  const [observacionesVenta, setObservacionesVenta] = useState('')
  const [tipoVenta, setTipoVenta] = useState('')
  const [estadoIdVenta, setEstadoIdVenta] = useState(false)
  const [dataContacto, setDataContacto] = useState([])
  const [oldDigito, setOldDigito] = useState('')


  const dividirCampo = (campo) => {
    return (campo.includes(';') ? campo.split(';') : campo)
  }



  return (
    <DataContext.Provider
      value={{
        sectores, setSectores,
        empresaCliente, setEmpresaCliente,
        nombreContacto, setNombreContacto,
        ciudadCliente, setCiudadCliente,
        telefono1, setTelefono1,
        telefono2, setTelefono2,
        IdDirector, setIdDirector,
        idSector, setIdSector,
        probabilidad, setProbabilidad,
        cargoContacto, setCargoContacto,
        proveedor, setProveedor,
        redSocial, setRedSocial,
        fechaIngreso, setFechaIngreso,
        fuente, setFuente,
        email, setEmail,
        observaciones, setObservaciones,
        idCliente, setIdCliente,
        data, setData,
        directores, setDirectores,
        tipoCliente, setTipoCliente,
        ventas, setVentas,
        servicios, setServicios,
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        proyeccion, setProyeccion,
        ingresosFacturacion, setIngresosFacturacion,
        idServicio, setIdServicio,
        fechaAcuerdo, setFechaAcuerdo,
        numeroCotizacion, setNumeroCotizacion,
        tipoVenta, setTipoVenta,
        observacionesVenta, setObservacionesVenta,
        idVenta, setIdVenta,
        nitCliente, setNitCliente,
        estadoIdVenta, setEstadoIdVenta,
        digito, setDigito,
        direccion, setDireccion,
        anunciante, setAnunciante,
        infoContacto, setInfoContacto,
        dataContacto, setDataContacto,
        isCreating, setIsCreating,
        dividirCampo,
        oldDigito, setOldDigito

      }}>
      {children}
    </DataContext.Provider>
  )
}