import React,{ createContext, useState } from "react";

export const  DataContext = createContext();


export  const DataProvider =({ children }) => {
    const [show, setShow] = useState(false);
    const [idPerfil , setIdPerfil] = useState(0)
    const [user, setUser] = useState({})
    const [proyeccion, setProyeccion] = useState([])
    const [mesActual, setMesActual] = useState(new Date().getMonth());
    const [añoActual, setAñoActual] = useState(new Date().getFullYear());
    const [proyeccionTable, setProyeccionTable] = useState([])
    const [proyeccionAnual, setProyeccionAnual] = useState([])
    const [director, setDirector] = useState({})
    const [totalventasbydir, setTotalVentasByDir] = useState(0)
    const [ventasMes, setVentasMes] = useState([])
    const [ventas, setVentas] = useState({})
    return (
        <DataContext.Provider
        value={{
            show, setShow,
            user, setUser,
            idPerfil, setIdPerfil
            ,ventas, setVentas
            ,proyeccion, setProyeccion,
            mesActual, setMesActual,
            añoActual, setAñoActual,
            proyeccionTable, setProyeccionTable,
            proyeccionAnual, setProyeccionAnual,
            director, setDirector,
            totalventasbydir, setTotalVentasByDir,
            ventasMes, setVentasMes
        }}>
            { children }
        </DataContext.Provider>
    )
}