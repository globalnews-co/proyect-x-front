import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import { Agenda } from "./Agenda";

function AgendaIndex() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const events = [
    {
      title: "Reunión",
      start: "2023-12-18T08:00:00",
      end: "2023-12-18T08:00:00",
      descripcion: "Descripción de la reunión",
    },
  ];

  const handleBoton = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div className="agenda-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", marginRight: "200px" }}>
      <Agenda />

      {/* Contenido del Fullcalendar */}
      <div style={{ flex: 1, width: "100%" }}>
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
              title: "Reunión",
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: `<p>${info.event.extendedProps.descripcion}</p> Hsssss`,
              html: true,
            });
          }}
        />
      </div>
    </div>
  );
}

export default AgendaIndex;
