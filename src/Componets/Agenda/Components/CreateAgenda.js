import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import Conexion from '../../../Service/Conexion';
import moment from 'moment/moment';
import { 
  User,
  Calendar,
  Clock,
  FileText,
  CalendarPlus,
  Search
} from 'lucide-react';

export const CreateAgenda = () => {
  const { nombreDirector, idPerfil, clientes, setClientes } = useContext(DataContext);

  const [formState, setFormState] = useState({
    observacion: '',
    idCliente: 0,
    selectValue: '',
    fechaValue: '',
    horaInicioValue: moment().startOf('hour').format('HH:mm'),
    horaFinValue: moment().startOf('hour').add(30, 'minutes').format('HH:mm')
  });

  const [errors, setErrors] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: ''
  });

  useEffect(() => {
    if (idPerfil !== 0 && idPerfil !== undefined) {
      Conexion.getListClientes(idPerfil).then((response) => {
        setClientes(response);
      });
    }
  }, [idPerfil, setClientes]);


  const handleInputChange = (e) => setFormState({ ...formState, observacion: e.target.value });

  const validateDateTime = () => {
    const selectedDate = moment(formState.fechaValue).startOf('day');
    
    // Cálculo del sábado anterior
    const today = moment().startOf('day');
    const currentDayOfWeek = today.day(); // 0 = domingo, 6 = sábado
    const daysToSubtract = currentDayOfWeek === 6 ? 7 : (currentDayOfWeek + 1);
    const previousSaturday = moment().startOf('day').subtract(daysToSubtract, 'days');
    
    const fechaInicioCompleta = moment(`${formState.fechaValue} ${formState.horaInicioValue}`, 'YYYY-MM-DD HH:mm');
    const fechaFinCompleta = moment(`${formState.fechaValue} ${formState.horaFinValue}`, 'YYYY-MM-DD HH:mm');
    
    let newErrors = {
      fecha: '',
      horaInicio: '',
      horaFin: ''
    };
  
    // Validar que la fecha no sea anterior al sábado anterior
    if (selectedDate.isSameOrBefore(previousSaturday)) {
      newErrors.fecha = 'La fecha no puede ser anterior a esta semana';
      return newErrors;
    }
  
    // Validación de la hora de fin posterior a la hora de inicio
    if (fechaFinCompleta.isSameOrBefore(fechaInicioCompleta)) {
      newErrors.horaFin = 'La hora de finalización debe ser posterior a la hora de inicio';
      return newErrors;
    }
  
    return newErrors;
  };
  const handleHoraChange = (e, isHoraInicio) => {
    const newValue = e.target.value;
    
    setFormState(prevState => {
      if (isHoraInicio) {
        const horaFinMoment = moment(prevState.horaFinValue, 'HH:mm');
        const nuevaHoraMoment = moment(newValue, 'HH:mm');
        
        if (horaFinMoment.isSameOrBefore(nuevaHoraMoment)) {
          return {
            ...prevState,
            horaInicioValue: newValue,
            horaFinValue: moment(nuevaHoraMoment).add(30, 'minutes').format('HH:mm')
          };
        }
        
        return {
          ...prevState,
          horaInicioValue: newValue
        };
      } else {
        return {
          ...prevState,
          horaFinValue: newValue
        };
      }
    });

    setErrors(prevErrors => ({
      ...prevErrors,
      horaInicio: '',
      horaFin: ''
    }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormState(prevState => ({
      ...prevState,
      fechaValue: newDate
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      fecha: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formState.fechaValue) {
      alert('Seleccione una fecha.');
      return;
    }
  
    if (formState.idCliente === 0) {
      alert('Seleccione un cliente');
      return;
    }
  
    if (!formState.horaInicioValue) {
      alert('Seleccione una hora de inicio válida.');
      return;
    }
  
    if (!formState.horaFinValue) {
      alert('Seleccione una hora de fin válida.');
      return;
    }

    if (!formState.observacion) {
      alert('La observación es requerida.');
      return;
    }

    const newErrors = validateDateTime();
    if (newErrors.fecha || newErrors.horaInicio || newErrors.horaFin) {
      setErrors(newErrors);
      return;
    }
  
    const fechaInicioCompleta = moment(`${formState.fechaValue} ${formState.horaInicioValue}`, 'YYYY-MM-DD HH:mm');
    const fechaFinCompleta = moment(`${formState.fechaValue} ${formState.horaFinValue}`, 'YYYY-MM-DD HH:mm');

    const [nitClienteAgenda, digitoClienteAgenda] = formState.idCliente.split(',');
    const profile = JSON.parse(localStorage.getItem('profile'));

    const data = {
      IdUser: profile.ID_User,
      IdDirector: idPerfil,
      IdCliente: nitClienteAgenda,
      Digito: digitoClienteAgenda,
      FechaInicio: fechaInicioCompleta.format('YYYY-MM-DDTHH:mm'),
      FechaFin: fechaFinCompleta.format('YYYY-MM-DDTHH:mm'),
      Proposito: formState.selectValue,
      Obsevacion: formState.observacion,
    };
  
    Conexion.CreateAgenda(data).then(() => {
      alert('Agenda creada correctamente');
      window.location.reload();
    });
  };

  return (
    <div className="flex flex-col p-4 max-w-xl mt-10 ml-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span className="font-medium">{nombreDirector}</span>
        </div>
       
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Cliente */}
        <div className="space-y-1">
          <label className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Cliente
          </label>
          <select
            className="w-full p-2 border border-gray-200 rounded-md"
            onChange={(e) => setFormState({ ...formState, idCliente: e.target.value })}
            required
          >
            <option value="" disabled selected>Seleccionar cliente...</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={[cliente.id, cliente.digito]}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Evento */}
        <div className="space-y-1">
          <label className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Tipo de Evento
          </label>
          <select
            className="w-full p-2 border border-gray-200 rounded-md"
            onChange={(e) => setFormState({ ...formState, selectValue: e.target.value })}
            required
          >
            <option value="" disabled selected>Seleccionar tipo de evento...</option>
            <option value="TELEMERCADEO">Telemercadeo</option>
            <option value="PRIMERA VISITA A CLIENTE">Primera visita a cliente</option>
            <option value="VISITA SEGUIMIENTO COMERCIAL CLIENTE NUEVO">Visita seguimiento comercial</option>
            <option value="VISITA DE MANTENIMIENTO A CLIENTES ACTUALES">Visita mantenimiento</option>
            <option value="REUNION PRESENCIAL">Reunión presencial</option>
            <option value="GESTION ADMINISTRATIVA">Gestión administrativa</option>
            <option value="REUNIONES INTERNAS">Reuniones internas</option>
            <option value="VISITA EN FRIO">Visita en frío</option>
          </select>
        </div>

        {/* Fecha y Hora */}
        <div className="space-y-1">
          <label className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Fecha
          </label>
          <input
            type="date"
            placeholder="dd/mm/aaaa"
            className={`w-full p-2 border rounded-md ${
              errors.fecha ? 'border-red-500' : 'border-gray-200'
            }`}
            onChange={handleDateChange}
            required
          />
          {errors.fecha && <div className="text-xs text-red-500 mt-1">{errors.fecha}</div>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <label className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Hora de inicio
            </label>
            <div className="relative">
              <input
                type="time"
                value={formState.horaInicioValue}
                onChange={(e) => handleHoraChange(e, true)}
                className={`w-full p-2 border rounded-md ${
                  errors.horaInicio ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
              {errors.horaInicio && <div className="text-xs text-red-500 mt-1">{errors.horaInicio}</div>}
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <label className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Hora de finalización
            </label>
            <div className="relative">
              <input
                type="time"
                value={formState.horaFinValue}
                onChange={(e) => handleHoraChange(e, false)}
                className={`w-full p-2 border rounded-md ${
                  errors.horaFin ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
              {errors.horaFin && <div className="text-xs text-red-500 mt-1">{errors.horaFin}</div>}
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div className="space-y-1">
          <label className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            Observaciones
          </label>
          <textarea
            className="w-full p-2 border border-gray-200 rounded-md h-24"
            value={formState.observacion}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-md"
        >
          <CalendarPlus className="w-4 h-4" />
          Crear Agenda
        </button>
      </form>
    </div>
  );
};