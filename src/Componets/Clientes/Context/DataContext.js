import React,{ createContext, useState } from "react";

export const  DataContext = createContext();


export  const DataProvider =({ children }) => {
    const [data, setData] = useState([]);
    const [empresaCliente, setEmpresaCliente] = useState('');
    const [nombreContacto, setNombreContacto] = useState('');
    const [ciudadCliente, setCiudadCliente] = useState('');
    const [telefono1, setTelefono1] = useState('');
    const [telefono2, setTelefono2] = useState('');
    const [IdDirector, setIdDirector] = useState('');
    const [idSector, setIdSector] = useState('');
    const [probabilidad, setProbabilidad] = useState('');
    const [cargoContacto, setCargoContacto] = useState('');
    const [nivelAcademicoContact, setNivelAcademicoContact] = useState('');
    const [redSocial, setRedSocial] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState(null);
    const [fuente, setFuente] = useState('');
    const [email, setEmail] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [directores , setDirectores] = useState([]);
    const [sectores, setSectores] = useState([]);
    const [idCliente, setIdCliente] = useState(0);

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
        nivelAcademicoContact, setNivelAcademicoContact,
        redSocial, setRedSocial,
        fechaIngreso, setFechaIngreso,
        fuente, setFuente,
        email, setEmail,
        observaciones, setObservaciones,
        idCliente, setIdCliente,
        data, setData,
        directores , setDirectores

    }}>
        { children }
    </DataContext.Provider>
  )
}