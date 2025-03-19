import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [clientes , setClientes] = useState([]);
    const [nombreDirector , setNombreDirector] = useState("");
    const [idPerfil, setIdPerfil] = useState(0);
    const [showModalEvent, setShowModalEvent] = useState(false);
    const [detailEvent, setDetailEvent] = useState({});//[id,fecha,horaInicio,horaFin,observacion,cliente,estado]
    const [events, setEvents] = useState([]);
    return (
        <DataContext.Provider
            value={{
                showModal, setShowModal,
                clientes,setClientes,
                nombreDirector,setNombreDirector,
                idPerfil,setIdPerfil,
                showModalEvent, setShowModalEvent,
                detailEvent, setDetailEvent,
                events, setEvents
                
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
