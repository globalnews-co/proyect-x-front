import React from 'react'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from "react";
import { DataContext } from '../Context/DataContext';
import moment from 'moment';
import Conexion from '../../../Service/Conexion';
import Swal from 'sweetalert2';
import { Pencil } from 'lucide-react';
import { X, Trash2, Calendar, Clock, User, FileText, Save } from 'lucide-react';

export default function ModalEvent() {
    const { idPerfil, detailEvent, setShowModalEvent, setEvents } = useContext(DataContext);
    const [editedDescripcion, setEditedDescripcion] = useState(detailEvent?.extendedProps?.descripcion);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isEditingTime, setIsEditingTime] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isEventLocked, setIsEventLocked] = useState(false);

    useEffect(() => {
        if (detailEvent?.start) {
            const eventDate = moment(detailEvent.start);
            const today = moment().startOf('week');
            setIsEventLocked(eventDate.isBefore(today));

            const localStartTime = moment(detailEvent.start).format('HH:mm');
            const localEndTime = detailEvent.end ?
                moment(detailEvent.end).format('HH:mm') :
                moment(detailEvent.start).add(1, 'hour').format('HH:mm');

            setStartTime(localStartTime);
            setEndTime(localEndTime);
            setEditedDescripcion(detailEvent?.extendedProps?.descripcion);
        }
    }, [detailEvent]);

    const validateTimes = (start, end) => {
        const startMoment = moment(start, 'HH:mm');
        const endMoment = moment(end, 'HH:mm');
        return endMoment.isAfter(startMoment);
    };

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
        setHasUnsavedChanges(true);

        if (!validateTimes(newStartTime, endTime)) {
            const newEndTime = moment(newStartTime, 'HH:mm').add(1, 'hour').format('HH:mm');
            setEndTime(newEndTime);
        }
    };

    // Efecto para detectar cambios
    useEffect(() => {
        const initialDescription = detailEvent?.extendedProps?.descripcion;
        const initialStart = moment(detailEvent?.start).format('HH:mm');
        const initialEnd = detailEvent?.end ? moment(detailEvent.end).format('HH:mm') :
            moment(detailEvent?.start).add(1, 'hour').format('HH:mm');

        const hasTimeChanges = startTime !== initialStart || endTime !== initialEnd;
        const hasDescriptionChanges = editedDescripcion !== initialDescription;

        setHasUnsavedChanges(hasTimeChanges || hasDescriptionChanges);
    }, [startTime, endTime, editedDescripcion, detailEvent]);

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        if (validateTimes(startTime, newEndTime)) {
            setEndTime(newEndTime);
            setHasUnsavedChanges(true);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Hora inválida',
                text: 'La hora de finalización debe ser posterior a la hora de inicio'
            });
        }
    };

    const handleDescripcionChange = (e) => {
        if (!isEventLocked) {
            setEditedDescripcion(e.target.value);
            setHasUnsavedChanges(true);
        }
    };

    const saveAllChanges = async () => {
        if (isEventLocked) {
            Swal.fire('No permitido', 'No se pueden modificar eventos de días anteriores', 'warning');
            return;
        }

        if (!validateTimes(startTime, endTime)) {
            Swal.fire({
                icon: 'error',
                title: 'Error de horario',
                text: 'La hora de finalización debe ser posterior a la hora de inicio'
            });
            return;
        }

        try {
            setButtonDisabled(true);

            // Preparar los datos del horario
            const eventDate = moment(detailEvent.start).format('YYYY-MM-DD');
            const newStartDate = moment(`${eventDate} ${startTime}`).format('YYYY-MM-DD HH:mm:ss');
            const newEndDate = moment(`${eventDate} ${endTime}`).format('YYYY-MM-DD HH:mm:ss');

            // Guardar cambios de horario
            await Conexion.updateAgenda(detailEvent.extendedProps.idAgenda, {
                FechaInicio: newStartDate,
                FechaFin: newEndDate
            });

            // Guardar cambios de descripción
            await Conexion.updateAgendaDetalle(detailEvent.extendedProps.idAgenda, {
                "Obsevacion": editedDescripcion
            });

            // Actualizar la lista de eventos
            const response = await Conexion.listAgenda(idPerfil);
            setEvents(response);

            Swal.fire({
                icon: 'success',
                title: 'Cambios guardados',
                text: 'Todos los cambios han sido guardados exitosamente',
                showConfirmButton: false,
                timer: 1500
            });

            setHasUnsavedChanges(false);
            setIsEditingTime(false);
            setButtonDisabled(false);
            window.location.reload();

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron guardar los cambios'
            });
            setButtonDisabled(false);
        }
    };

    const deleteEvent = () => {
        if (isEventLocked) {
            Swal.fire('No permitido', 'No se pueden eliminar eventos de días anteriores', 'warning');
            return;
        }

        Swal.fire({
            title: '¿Estas seguro de eliminar el evento?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Conexion.deleteAgenda(detailEvent.extendedProps.idAgenda).then(() => {
                    Conexion.listAgenda().then((response) => {
                        setEvents(response);
                        window.location.reload();
                    });
                });
            } else if (result.isDenied) {
                Swal.fire('El evento no ha sido eliminado', '', 'info')
            }
        })
    }

    const handleCloseModal = () => {
        if (hasUnsavedChanges) {
            Swal.fire({
                title: '¿Deseas salir sin guardar los cambios?',
                text: "Los cambios no guardados se perderán",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModalEvent(false);
                }
            });
        } else {
            setShowModalEvent(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="w-full max-w-2xl mx-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all">
                    {/* Header */}
                    <div className="relative bg-gray-50 px-6 py-4 border-b">
                        <button 
                            onClick={handleCloseModal}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-gray-600" />
                            <h3 className="text-lg font-medium text-gray-900">
                                {detailEvent.title}
                            </h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4 space-y-4">
                        {/* Date and Time Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{moment(detailEvent.start).format("ddd MMM DD YYYY")}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Clock className="w-4 h-4" />
                                        Hora inicio
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        disabled={isEventLocked}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Clock className="w-4 h-4" />
                                        Hora fin
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                        disabled={isEventLocked}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Client Section */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <User className="w-4 h-4" />
                                Cliente
                            </label>
                            <p className="text-gray-900">{detailEvent.extendedProps.cliente}</p>
                        </div>

                        {isEventLocked && (
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-amber-700">
                                            Este evento está bloqueado por no ser de la semana actual
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FileText className="w-4 h-4" />
                                Detalle del evento
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 h-32"
                                value={editedDescripcion}
                                onChange={handleDescripcionChange}
                                disabled={isEventLocked}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                        {!isEventLocked && hasUnsavedChanges && (
                            <button
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                onClick={saveAllChanges}
                                disabled={buttonDisabled}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar cambios
                            </button>
                        )}

                        {!isEventLocked && (
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={deleteEvent}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                            </button>
                        )}

                        <button
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleCloseModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}