import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import Agenda from "./Agenda"
import Conexion from "../Service/Conexion";

function AgendaIndex() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar la visibilidad del formulario

  const [events , setEvents] = useState([{
    title: "Holaaaaa",
    start: "2023-10-17T08:00:00",
    end: "2023-10-17T08:00:00",
  }
  ]); // Estado para guardar los eventos [

  useEffect(() => {
    Conexion.listAgenda(1).then
      ((response) => {
        
        if (response) {
          setEvents(response);
        }
      });
  }, []);
 
  const handleBoton = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div style={{backgroundColor: "currentColor"}}>
      
      <button onClick={handleBoton} className="btn btn-primary">{(mostrarFormulario===true)? "Cerrar Agenda":"Crear Agenda" } </button>
      

      {mostrarFormulario && <Agenda />} {/* Mostrar el formulario (o Agenda) si mostrarFormulario es true */}
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: "<p> Hola </strong></p>",
            html: true,
          });
        }}
      />
    </div>
  );
}

export default AgendaIndex;
