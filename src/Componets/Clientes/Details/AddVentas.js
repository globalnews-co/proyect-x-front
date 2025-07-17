import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import Conexion from '../../../Service/Conexion';
import Swal from 'sweetalert2';
import moment from 'moment/moment';

export default function AddVentas() {
    const {
        idVenta, setIdVenta,
        idCliente, IdDirector, setVentas, servicios,
        fechaInicio, fechaFin,
        setFechaInicio, setFechaFin, proyeccion,
        setProyeccion, ingresosFacturacion,
        setIngresosFacturacion,
        idServicio, setIdServicio,
        fechaAcuerdo, setFechaAcuerdo,
        numeroCotizacion, setNumeroCotizacion,
        observacionesVenta, setObservacionesVenta,
        tipoVenta, setTipoVenta, nitCliente, digito,
        anunciante, setAnunciante
    } = useContext(DataContext);

    const [idCotizacionBd, setIdCotizacionBd] = useState();

    useEffect(() => {
        fetchId();
    }, [idVenta]);

    const fetchId = async () => {
        const response = await Conexion.ObtenerIdCotizacion();
        setIdCotizacionBd(response);
    };

    useEffect(() => {
        fetchId();
        actualizarProductosSeleccionados(servicios);
    }, [servicios]);

    const actualizarProductosSeleccionados = (newServicios) => {
        const productos = newServicios
            .filter(item => item.check)
            .map(item => item.tipoServicio)
            .join(', ');    
        setIdServicio(productos);
    
        const totalIngresos = newServicios.reduce((total, item) => {
            if (item.check && item.value) {
                const valorLimpio = item.value.replace(/[^\d]/g, '');
                return total + parseInt(valorLimpio, 10);
            }
            return total;
        }, 0);
    
        setIngresosFacturacion(totalIngresos);
    };

    const limpiarCampos = () => {
        setIdVenta(0);
        setFechaInicio('');
        setFechaFin('');
        setProyeccion(''); 
        setIngresosFacturacion('');
        setIdServicio('');
        setFechaAcuerdo('');
        setNumeroCotizacion('');
        setObservacionesVenta('');
        setTipoVenta('');
        setAnunciante('');
        servicios.forEach(item => {
            item.value = 0;
            item.check = false;
        });
    };

    const sendData = async () => {
        if (fechaInicio === '' || fechaFin === '' || proyeccion === '' || 
            ingresosFacturacion === '' || idServicio === '' || 
            fechaAcuerdo === '' || tipoVenta === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }
    
        if (fechaInicio > fechaFin) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de inicio debe ser menor a la fecha de fin',
                confirmButtonColor: '#3B82F6'
            });
            return;
        }
    
        const productos = {};
        servicios.forEach(item => {
            if (item.check) {
                const nombreLimpio = item.tipoServicio.replace(/\s+/g, ' ').trim().replace(/\s/g, '_');
                productos[nombreLimpio] = item.value || 0;
            }
        });

        // Fix: Correctly parse the proyeccion value by removing all non-digit characters
        const proyeccionValue = typeof proyeccion === 'string' ? proyeccion : proyeccion.toString();
        const proyeccionNumerica = parseFloat(proyeccionValue.replace(/[^\d]/g, '')) || 0;
        
        const ingresosFacturacionNumerico = typeof ingresosFacturacion === 'string'
            ? parseFloat(ingresosFacturacion.replace(/[^\d.-]/g, ''))
            : ingresosFacturacion;
    
        const form = {
            id_director: IdDirector,
            digito: digito,
            idCliente: nitCliente,
            anunciante,
            fechaInicio,
            fechaFin,
            proyeccion: proyeccionNumerica,
            ingresosFacturacion: ingresosFacturacionNumerico,
            fechaAcuerdo,
            numeroCotizacion: idVenta === 0 ? `GNC-${idCotizacionBd}-${new Date().getFullYear()}` : numeroCotizacion,
            observaciones: observacionesVenta,
            tipoVenta,
            ...productos
        };
    
        try {
            if (idVenta === 0) {
                await Conexion.CreateVenta(form);
                const response = await Conexion.ListVentasByCliente(nitCliente, digito);
                setVentas(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Venta agregada correctamente',
                    confirmButtonColor: '#3B82F6'
                });
            } else {
                await Conexion.UpdateVenta(form, idVenta);
                const response = await Conexion.ListVentasByCliente(nitCliente, digito);
                setVentas(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Venta actualizada correctamente',
                    confirmButtonColor: '#3B82F6'
                });
                limpiarCampos();
            }
            fetchId();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al procesar la venta',
                text: error.response?.data?.message || 'Ha ocurrido un error inesperado',
                confirmButtonColor: '#3B82F6'
            });
        }
    };
    
    // Fixed formatearMoneda function that correctly handles Colombian number format
    const formatearMoneda = (numero) => {
        // If empty value, return empty string
        if (numero === '' || numero === undefined || numero === null) return '';
        
        let valorNumerico = 0;
        
        if (typeof numero === 'string') {
            // First, remove any existing currency symbols and formatting
            const valorLimpio = numero.replace(/[^\d]/g, '');
            valorNumerico = parseInt(valorLimpio, 10) || 0;
        } else {
            valorNumerico = parseInt(numero, 10) || 0;
        }
        
        // Format as Colombian currency
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(valorNumerico);
    };

    const handleProyeccionChange = (e) => {
        // Store only the numeric value
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setProyeccion(rawValue);
    };

    const handleProyeccionBlur = () => {
        if (proyeccion) {
            const formattedValue = formatearMoneda(proyeccion);
            setProyeccion(formattedValue);
        }
    };

    return (
        <div className="p-5 bg-gray-900 text-gray-200">
            <div className="space-y-4">
                {/* Fechas de inicio y fin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Fecha inicio de servicio *
                        </label>
                        <input
                            type="date"
                            value={moment(fechaInicio).utc().format("YYYY-MM-DD")}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Fecha fin de servicio *
                        </label>
                        <input
                            type="date"
                            value={moment(fechaFin).utc().format("YYYY-MM-DD")}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Fecha de acuerdo */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Fecha de acuerdo *
                    </label>
                    <input
                        type="date"
                        value={moment(fechaAcuerdo).format("YYYY-MM-DD")}
                        onChange={(e) => setFechaAcuerdo(e.target.value)}
                        className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Presupuesto y Monto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Presupuesto Categorización *
                        </label>
                        <input
                            type="text"
                            value={proyeccion}
                            onChange={handleProyeccionChange}
                            onBlur={handleProyeccionBlur}
                            placeholder="0"
                            className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Monto de venta
                        </label>
                        <input
                            type="text"
                            value={formatearMoneda(ingresosFacturacion)}
                            className="w-full bg-gray-800 text-green-400 font-medium rounded px-3 py-2"
                            readOnly
                        />
                    </div>
                </div>

                {/* Tipo de producto y Número de cotización */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tipo de producto *
                        </label>
                        <input
                            value={idServicio}
                            onChange={(e) => setIdServicio(e.target.value)}
                            className="w-full bg-gray-800 text-gray-300 rounded px-3 py-2"
                            readOnly
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Número de Cotización
                        </label>
                        <input
                            value={idVenta === 0 ? `GNC-${idCotizacionBd}-${new Date().getFullYear()}` : numeroCotizacion}
                            onChange={(e) => setNumeroCotizacion(e.target.value)}
                            className="w-full bg-gray-800 text-gray-300 rounded px-3 py-2"
                            readOnly
                        />
                    </div>
                </div>

                {/* Tipo de Venta y Anunciante */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tipo de Venta *
                        </label>
                        <select
                            value={tipoVenta}
                            onChange={(e) => setTipoVenta(e.target.value)}
                            className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                            required
                        >
                            <option value="" disabled>Seleccione un tipo...</option>
                            <option value="fija">Fija</option>
                            <option value="puntual">Puntual</option>
                            <option value="otra">Otra</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Anunciante *
                        </label>
                        <input
                            type="text"
                            value={anunciante}
                            onChange={(e) => setAnunciante(e.target.value)}
                            className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Observaciones */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Observaciones
                    </label>
                    <textarea
                        value={observacionesVenta}
                        onChange={(e) => setObservacionesVenta(e.target.value)}
                        className="w-full bg-gray-800 text-gray-200 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ingrese observaciones relevantes sobre la venta..."
                    />
                </div>

                {/* Botones */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                        onClick={sendData}
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {idVenta === 0 ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            )}
                        </svg>
                        {idVenta === 0 ? "Agregar" : "Actualizar"}
                    </button>
                    <button
                        onClick={limpiarCampos}
                        className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Limpiar
                    </button>
                </div>
                
                {/* Nota sobre campos obligatorios */}
                <div className="text-xs text-gray-400 pt-2">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Los campos marcados con * son obligatorios
                    </span>
                </div>
            </div>
        </div>
    );
}