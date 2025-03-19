import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { CreateAgenda } from "./CreateAgenda";
import Conexion from "../../../Service/Conexion";
import { useContext, useEffect, useState, useRef, memo } from "react";
import { DataContext } from "../Context/DataContext";
import ModalEvent from "./ModalEvent";
import moment from "moment";
import Swal from 'sweetalert2';
import '../../../Style/agenda.css'

const SearchBar = memo(({ directores, onSelectDirector }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const filteredDirectores = directores.filter(director =>
    director.nombreDirector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSelectDirector = (director) => {
    onSelectDirector(director);
    setSearchTerm("");
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="search-container mb-4 relative z-10" ref={searchRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar director..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && searchTerm && (
        <div className="search-results absolute top-full left-0 right-0 shadow-lg bg-white border border-gray-300 rounded mt-1 overflow-hidden">
          {filteredDirectores.length > 0 ? (
            filteredDirectores.map((director) => (
              <div
                key={director.idDirector}
                className="search-result-item p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                onClick={() => handleSelectDirector(director)}
              >
                {director.nombreDirector}
              </div>
            ))
          ) : (
            <div className="search-result-item p-2 border-b border-gray-200">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
});
function Calendar() {
  const [idevento, setIdevento] = useState(0);
  const [directores, setDirectores] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const profile = JSON.parse(localStorage.getItem("profile"));
  const {
    setNombreDirector,
    idPerfil,
    setIdPerfil,
    showModalEvent,
    setShowModalEvent,
    setDetailEvent,
    events,
    setEvents
  } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user !== null && user !== undefined) {
        switch (user.rol) {
          case 'DIRECTOR':
            setIdPerfil(profile.ID_Director);
            setNombreDirector(profile.Nombre);
            break;
          case 'GERENTE':
            setIdPerfil(profile.ID_Director);
            if (directores.length === 0) {
              try {
                const response = await Conexion.getAllDirectores();
                setDirectores(response);
                setNombreDirector(profile.Nombre);
              } catch (error) {
                console.log(error);
              }
            }
            break;
          case 'ADMINISTRADOR':
            setIdPerfil(profile.ID_Director);
            break;
          default:
            break;
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (idPerfil !== 0) {
      Conexion.listAgenda(idPerfil).then((response) => {
        const processedEvents = response.map(event => {
          const start = moment.utc(event.FechaInicio || event.start).utcOffset(-5, true);
          const end = moment.utc(event.FechaFin || event.end || start.clone().add(1, 'hour')).utcOffset(-5, true);

          const eventDate = start.clone().startOf('week');
          const today = moment().startOf('week');

          return {
            ...event,
            start: start.format(),
            end: end.format(),
            title: event.title || event.Titulo,
            editable: !eventDate.isBefore(today),
            extendedProps: {
              ...event.extendedProps,
              idAgenda: event.idAgenda || event.ID_Agenda,
              cliente: event.cliente || event.Cliente,
              descripcion: event.descripcion || event.Descripcion
            }
          };
        });

        setEvents(processedEvents);
      });
    }
  }, [idPerfil]);

  const handleDirectorSelect = (director) => {
    setIdPerfil(director.idDirector);
    setNombreDirector(director.nombreDirector);
  };

  const getEventStyles = (title) => {
    switch (title) {
      case 'TELEMERCADEO':
        return { backgroundColor: '#FFFF00', color: 'black' };
      case 'PRIMERA VISITA A CLIENTE':
        return { backgroundColor: '#FF0000', color: 'white' };
      case 'VISITA SEGUIMIENTO COMERCIAL CLIENTE NUEVO':
        return { backgroundColor: '#FFA500', color: 'white' };
      case 'VISITA DE MANTENIMIENTO A CLIENTES ACTUALES':
        return { backgroundColor: '#008000', color: 'white' };
      case 'REUNION PRESENCIAL':
        return { backgroundColor: '#800080', color: 'white' };
      case 'GESTION ADMINISTRATIVA':
        return { backgroundColor: '#00b7fe', color: 'white' };
      case 'REUNIONES INTERNAS':
        return { backgroundColor: '#FFFFFF', color: 'black' };
      case 'VISITA EN FRIO':
        return { backgroundColor: '#000000', color: 'white' };
      default:
        return { backgroundColor: '#808080', color: 'white' };
    }
  };
  const isPastEvent = (event) => {
    // Ya está usando startOf('week') para ambas fechas, lo cual es correcto para comparación semanal
    const eventDate = moment(event.start || event.FechaInicio).startOf('week');
    const currentWeekStart = moment().startOf('week');
    
    console.log('Fecha del evento (inicio de semana):', eventDate.format('YYYY-MM-DD'));
    console.log('Fecha actual (inicio de semana):', currentWeekStart.format('YYYY-MM-DD'));
    
    // Devuelve true si el evento es de una semana anterior a la actual
    return eventDate.isBefore(currentWeekStart);
  };
  
  const handleEventDrop = async (info) => {
    if (isPastEvent(info.event)) {
      info.revert();
      Swal.fire({
        icon: 'warning',
        title: 'Acción no permitida',
        text: 'No se pueden modificar eventos de semanas anteriores'
      });
      return;
    }

    const startDate = moment(info.event.start);
    const endDate = moment(info.event.end || startDate.clone().add(1, 'hour'));

    const result = await Swal.fire({
      title: '¿Confirmar cambio de fecha?',
      html: `
        <p>¿Desea mover el evento "${info.event.title}" a la siguiente fecha?</p>
        <p><strong>Nueva fecha:</strong> ${startDate.format('DD/MM/YYYY HH:mm')} - ${endDate.format('HH:mm')}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar fecha',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await Conexion.updateAgenda(info.event.extendedProps.idAgenda, {
          FechaInicio: startDate.format("YYYY-MM-DD HH:mm:ss"),
          FechaFin: endDate.format("YYYY-MM-DD HH:mm:ss")
        });

        Swal.fire({
          icon: 'success',
          title: 'Evento actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        info.revert();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el evento'
        });
      }
    } else {
      info.revert();
    }
  };

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();
    info.jsEvent.stopPropagation();
    setDetailEvent(info.event);
    setIdevento(info.event.extendedProps.idAgenda);
    setShowModalEvent(true);
  };

  const agenda = (
    <div className="row" style={{ height: "100vh", width: "99vw" }}>
      <div className="col-4">
        <CreateAgenda />
      </div>
      <div className="col-8">
        {directores.length > 0 && (
          <SearchBar
            directores={directores}
            onSelectDirector={handleDirectorSelect}
          />
        )}
        <div >
          <Fullcalendar
            locale={{
              code: 'es',
              week: {
                dow: 1,  // Lunes es el primer día
                doy: 4   // La semana que contiene el 4 de enero es la primera del año
              },
              buttonText: {
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día'
              },
              weekText: 'Sem',
              allDayText: 'Todo el día',
              moreLinkText: 'más',
              noEventsText: 'No hay eventos para mostrar',
              dayHeaderFormat: { weekday: 'long' },  // Esto mostrará el nombre completo del día
              // Nombres completos de los días
              dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
              dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
              // Nombres completos de los meses
              monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
              // Formato del título
              titleFormat: { year: 'numeric', month: 'long' }
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
              day: 'Día'
            }}
            height={"90vh"}
            events={events}
            slotMinTime="06:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            slotDuration="00:30:00"
            displayEventEnd={true}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventDidMount={(info) => {
              const { backgroundColor, color } = getEventStyles(info.event.title);
              info.el.style.backgroundColor = backgroundColor;
              info.el.style.color = color;
              info.el.style.border = 'none';

              if (isPastEvent(info.event)) {
                info.el.style.cursor = 'pointer';
                info.el.style.opacity = '0.7';
              }
            }}
            eventStartEditable={true}
            eventDurationEditable={true}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {showModalEvent && <ModalEvent />}
      {agenda}
    </div>
  );
}

export default Calendar;