import React, { useContext, useEffect, useMemo, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import Agenda from "./CreateAgenda"
import Conexion from "../../Service/Conexion";
import Navbar from "../Statics/Navbar";
import { DataContext } from "./Context/DataContext";

function AgendaIndex() {
  const { showModal,setShowModal } = useContext(DataContext);

  const [events, setEvents] = useState([{
    title: "Holaaaaa",
    start: "2023-10-17T08:00:00",
    end: "2023-10-17T08:00:00",
  }
  ]); // Estado para guardar los eventos [
    const memoizedEvents = useMemo(() => events, [events]);

  useEffect(() => {
    Conexion.listAgenda(1).then
      ((response) => {

        if (response) {
          setEvents(response);
        }
      });
  }, []);

 
  const customButtons = {
    agregarAgenda: {
      text: "Crear Agenda",
      click: function () {
        // Aquí puedes abrir un modal o realizar alguna otra acción cuando se hace clic en el botón.
        setShowModal(!showModal);
      },
    },
  };

  return (

    <div style={{ backgroundColor: "white" ,color:'black'}}>
        <Navbar />
     
    {showModal && <Agenda />} {/* Mostrar el formulario (o Agenda) si mostrarFormulario es true */}

    <div className="container mt-4" >
      <Fullcalendar

        // ...

      
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable={true}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next agregarAgenda",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,",
          }}
          customButtons={customButtons}
          height={"90vh"}
          events={memoizedEvents}
          // ...
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
    </div>
  );
}

export default AgendaIndex;
