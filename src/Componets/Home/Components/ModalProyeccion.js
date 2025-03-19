import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DataContext } from '../Context/DataContext';
import Conexion from '../../../Service/Conexion';
import { X, DollarSign, Calendar, FileText } from 'lucide-react';
import '../../../Style/proyeccion.css'

// Componente Header de Sección
const SectionHeader = ({ title, isAllSelected, onSelectAll, icon: Icon }) => (
    <div className="section-header">
        <div className="section-title">
            <Icon size={18} />
            <h4>{title}</h4>
        </div>
        <button
            className="select-all-button"
            onClick={onSelectAll}
        >
            {isAllSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
        </button>
    </div>
);

// Componente Item de Servicio
const ServicioItem = ({ servicio, onChange, onValueChange }) => (
    <motion.div 
        className="service-item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
    >
        <div className="service-checkbox">
            <input
                type="checkbox"
                checked={servicio.check}
                onChange={(e) => onChange(servicio.idServicio, e)}
                id={`service-${servicio.idServicio}`}
            />
            <label htmlFor={`service-${servicio.idServicio}`}>
                {servicio.tipoServicio}
            </label>
        </div>
        <AnimatePresence>
            {servicio.check && (
                <motion.input
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '120px' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="value-input"
                    type="text"
                    value={servicio.value || ''}
                    onChange={(e) => onValueChange(e, servicio.idServicio)}
                    placeholder="Valor"
                />
            )}
        </AnimatePresence>
    </motion.div>
);

// Componente Item de Mes
const MesItem = ({ mes, isSelected, onChange }) => (
    <motion.div 
        className="month-item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
    >
        <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onChange(mes.id.toString())}
            id={`month-${mes.id}`}
        />
        <label htmlFor={`month-${mes.id}`}>{mes.mes}</label>
    </motion.div>
);

const ModalContent = ({ onClose }) => {
    const { 
        setShow, 
        idPerfil, 
        añoActual, 
        mesActual, 
        setVentas, 
        setVentasMes, 
        setProyeccion, 
        setProyeccionTable,
        setProyeccionAnual,
        setDirector,
        setTotalVentasByDir
    } = useContext(DataContext);

    const [servicios, setServicios] = useState([]);
    const [serviciosProyectados, setServiciosProyectados] = useState([]);
    const [mes, setMes] = useState([]);
    const [proyeccion, setProyeccionValue] = useState(0);
    const [todosServiciosSeleccionados, setTodosServiciosSeleccionados] = useState(false);
    const [todosMesesSeleccionados, setTodosMesesSeleccionados] = useState(false);

    const meses = [
        { id: 1, mes: 'Enero' }, { id: 2, mes: 'Febrero' }, 
        { id: 3, mes: 'Marzo' }, { id: 4, mes: 'Abril' },
        { id: 5, mes: 'Mayo' }, { id: 6, mes: 'Junio' },
        { id: 7, mes: 'Julio' }, { id: 8, mes: 'Agosto' },
        { id: 9, mes: 'Septiembre' }, { id: 10, mes: 'Octubre' },
        { id: 11, mes: 'Noviembre' }, { id: 12, mes: 'Diciembre' }
    ];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        Conexion.GetServicios()
            .then((response) => {
                const nuevoArregloObjetos = response.map((objeto) => ({
                    ...objeto,
                    check: false,
                    value: 0
                }));
                setServicios(nuevoArregloObjetos);
            })
            .catch(() => {
                alert('No se pudo cargar los servicios del cliente');
            });
    }, []);

    useEffect(() => {
        const totalValorProyeccion = servicios.reduce((total, servicio) => {
            let valorServicio = servicio.value;
            if (typeof valorServicio === 'string') {
                valorServicio = valorServicio.replace(/[^0-9]/g, '');
            }
            return total + (parseFloat(valorServicio) || 0);
        }, 0);
        setProyeccionValue(totalValorProyeccion);
    }, [servicios]);

    const handleSelectAllServicios = () => {
        const newTodosSeleccionados = !todosServiciosSeleccionados;
        setTodosServiciosSeleccionados(newTodosSeleccionados);
        
        const actualizarServicios = servicios.map((item) => ({
            ...item,
            check: newTodosSeleccionados,
            value: newTodosSeleccionados ? item.value || 0 : ''
        }));

        setServicios(actualizarServicios);
        actualizarServiciosSeleccionados(actualizarServicios);
    };

    const handleSelectAllMeses = () => {
        const newTodosMesesSeleccionados = !todosMesesSeleccionados;
        setTodosMesesSeleccionados(newTodosMesesSeleccionados);
        
        if (newTodosMesesSeleccionados) {
            setMes(meses.map(mes => mes.id.toString()));
        } else {
            setMes([]);
        }
    };

    const handleCheckboxChange = (idServicio, event) => {
        const { checked } = event.target;
        const actualizarServicios = servicios.map((item) => 
            item.idServicio === idServicio 
                ? { ...item, check: checked, value: checked ? item.value || 0 : '' }
                : item
        );

        setServicios(actualizarServicios);
        actualizarServiciosSeleccionados(actualizarServicios);
        setTodosServiciosSeleccionados(actualizarServicios.every(item => item.check));
    };

    const actualizarServiciosSeleccionados = (newServicios) => {
        const productos = newServicios
            .filter(item => item.check)
            .map(item => item.tipoServicio)
            .join(',');
        setServiciosProyectados(productos);
    };

    const handleMesChange = (value) => {
        setMes((prevMeses) => {
            const nuevosMeses = prevMeses.includes(value)
                ? prevMeses.filter((mes) => mes !== value)
                : [...prevMeses, value];
            
            setTodosMesesSeleccionados(nuevosMeses.length === meses.length);
            return nuevosMeses;
        });
    };

    const handleValueChange = (event, idServicio) => {
        let { value } = event.target;
        const numericValue = value.replace(/\D/g, '');
        
        const updatedServicios = servicios.map((item) => 
            item.idServicio === idServicio
                ? { ...item, value: formatearMoneda(numericValue) }
                : item
        );

        setServicios(updatedServicios);
        actualizarServiciosSeleccionados(updatedServicios);
    };

    const formatearMoneda = (numero) => {
        const valorNumerico = parseFloat(numero) || 0;
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(valorNumerico);
    };

    // Función para actualizar los datos después de guardar la proyección
    const updateDataAfterSave = async () => {
        try {
            // Obtener ventas actualizadas
            const ventasResponse = await Conexion.getVentasByDirector(añoActual, mesActual, idPerfil);
            setVentasMes(ventasResponse.ventaspormes);
            setVentas(ventasResponse);

            if (ventasResponse.detallemes?.length > 0) {
                const proyeccionConSuma = ventasResponse.detallemes.reduce((acumulador, item) => ({
                    ventas: acumulador.ventas + (item.valorvendido || 0),
                    proyeccion: acumulador.proyeccion + item.proyeccion
                }), { ventas: 0, proyeccion: 0 });

                setProyeccion([proyeccionConSuma]);
            } else {
                setProyeccion([{ ventas: 0, proyeccion: 0 }]);
            }

            // Obtener proyección actualizada
            const proyeccionResponse = await Conexion.getProyeccionDir(idPerfil, mesActual, añoActual);
            setProyeccionTable(proyeccionResponse.data);

            // Actualizar datos del director
            const directorResponse = await Conexion.getDirectorById(idPerfil, añoActual);
            setDirector(directorResponse.director);
            setTotalVentasByDir(directorResponse.totalventas);
            setProyeccionAnual(directorResponse.proyeccionanual);
        } catch (error) {
            console.error("Error actualizando datos:", error);
        }
    };

    // Función para resetear el formulario después de guardar
    const resetForm = () => {
        // Resetear servicios a su estado inicial
        setServicios(prevServicios => prevServicios.map(servicio => ({
            ...servicio,
            check: false,
            value: 0
        })));
        
        // Resetear meses seleccionados
        setMes([]);
        
        // Resetear estados de selección
        setTodosServiciosSeleccionados(false);
        setTodosMesesSeleccionados(false);
        
        // Limpiar servicios proyectados
        setServiciosProyectados([]);
    };

    const submitData = () => {
        if (mes.length === 0 || proyeccion === 0 || serviciosProyectados.length === 0) {
            alert('Debe llenar todos los campos');
            return;
        }

        const form = {
            idDirector: idPerfil,
            meses: mes,
            clipping: servicios[0].value,
            socialmedia: servicios[1].value,
            informesAnalisis: servicios[2].value,
            catalogo: servicios[3].value,
            compliance: servicios[4].value,
            internacional: servicios[5].value,
            otrosServicios: servicios[6].value,
            proyeccion: proyeccion
        };

        Conexion.CreateProyeccion(form)
            .then((response) => {
                alert(response.data.message);
                // Actualiza los datos sin cerrar el modal
                updateDataAfterSave().then(() => {
                    // Limpia el formulario para una nueva proyección
                    resetForm();
                });
            })
            .catch((error) => {
                if (error.response?.status === 400) {
                    alert(error.response.data.message);
                } else {
                    alert('Error al crear la proyección');
                }
            });
    };

    return (
        <div className="mp-modal-overlay">
            <motion.div 
                className="mp-modal-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
            >
                <div className="mp-modal-header">
                    <button className="mp-close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                    <h3>Proyección Total</h3>
                    <div className="mp-total-amount">
                        {formatearMoneda(proyeccion)}
                    </div>
                </div>

                <div className="mp-modal-content">
                    <div className="mp-sections-container">
                        {/* Sección de Servicios */}
                        <div className="mp-section">
                            <div className="mp-section-header">
                                <span className="mp-section-title">Servicios Proyectados</span>
                                <button className="mp-select-all-button" onClick={handleSelectAllServicios}>
                                    Seleccionar todos
                                </button>
                            </div>
                            <div className="mp-services-list">
                                {servicios.map((servicio) => (
                                    <div key={servicio.idServicio} className={`mp-service-item ${servicio.check ? 'show-input' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={servicio.check}
                                            onChange={(e) => handleCheckboxChange(servicio.idServicio, e)}
                                            id={`mp-service-${servicio.idServicio}`}
                                            className="mp-checkbox"
                                        />
                                        <label className="mp-label" htmlFor={`mp-service-${servicio.idServicio}`}>
                                            {servicio.tipoServicio}
                                        </label>
                                        <AnimatePresence>
                                            {servicio.check && (
                                                <motion.div 
                                                    className="mp-value-input-container"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                >
                                                    <input
                                                        type="text"
                                                        value={servicio.value || ''}
                                                        onChange={(e) => handleValueChange(e, servicio.idServicio)}
                                                        className="mp-value-input"
                                                        placeholder="Valor"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mp-vertical-divider" />

                        {/* Sección de Meses */}
                        <div className="mp-section">
                            <div className="mp-section-header">
                                <span className="mp-section-title">Meses</span>
                                <button className="mp-select-all-button" onClick={handleSelectAllMeses}>
                                    Seleccionar todos
                                </button>
                            </div>
                            <div className="mp-months-grid">
                                {meses.map((mesItem) => (
                                    <div key={mesItem.id} className="mp-month-item">
                                        <input
                                            type="checkbox"
                                            checked={mes.includes(mesItem.id.toString())}
                                            onChange={() => handleMesChange(mesItem.id.toString())}
                                            id={`mp-month-${mesItem.id}`}
                                            className="mp-checkbox"
                                        />
                                        <label className="mp-label" htmlFor={`mp-month-${mesItem.id}`}>
                                            {mesItem.mes}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mp-modal-footer">
                    <button className="mp-submit-button" onClick={submitData}>
                        Guardar Proyección
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default function ModalProyeccion() {
    const { setShow } = useContext(DataContext);
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return ReactDOM.createPortal(
        <ModalContent onClose={() => setShow(false)} />,
        document.body
    );
}