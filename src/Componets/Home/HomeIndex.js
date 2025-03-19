import React, { useContext, useEffect, useState } from 'react'
import CardProfile from './Components/CardProfile'
import CardFacturacion from './Components/CardFacturacion'
import CardClientes from './Components/CardClientes'
import DirectorSelector from './Components/DirectorSelector'
import Conexion from '../../Service/Conexion'
import { DataContext } from './Context/DataContext'
import '../../Assets/swiper.css'
import { motion } from 'framer-motion'
import ModalProyeccion from './Components/ModalProyeccion'

export default function HomeIndex() {
    const profile = JSON.parse(localStorage.getItem("profile"))
    const user = JSON.parse(localStorage.getItem("user"))
    const [selectedDirector, setSelectedDirector] = useState(null)

    const { setUser, setIdPerfil, show, idPerfil, ventas, setVentas,
        setProyeccion, añoActual, mesActual, setProyeccionTable,
        setProyeccionAnual, setDirector, setTotalVentasByDir,
        ventasMes, setVentasMes } = useContext(DataContext)
    const [directores, setDirectores] = useState([])

    // Función para cargar datos del director seleccionado
    const loadDirectorData = async (directorId, year) => {
        if (directorId !== 0 && directorId !== undefined) {
            try {
                const response = await Conexion.getDirectorById(directorId, year);
                setDirector(response.director);
                setTotalVentasByDir(response.totalventas);
                setProyeccionAnual(response.proyeccionanual);
            } catch (error) {
                console.log('Error al cargar datos del director:', error);
            }
        }
    };

    // Función para cargar datos de ventas y proyecciones
    const loadSalesAndProjections = async (directorId, year, month) => {
        if (directorId !== 0 && directorId !== undefined) {
            try {
                const ventasResponse = await Conexion.getVentasByDirector(year, month, directorId);
                setVentasMes(ventasResponse.ventaspormes)
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

                const proyeccionResponse = await Conexion.getProyeccionDir(directorId, month, year);
                setProyeccionTable(proyeccionResponse.data);
            } catch (error) {
                console.log('Error al cargar ventas y proyecciones:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user !== null && user !== undefined) {
                switch (user.rol) {
                    case 'DIRECTOR':
                        setIdPerfil(profile.ID_Director);
                        break;
                    case 'GERENTE':
                    case 'ADMINISTRADOR':
                        setIdPerfil(profile.ID_Director);
                        if (directores.length === 0) {
                            try {
                                const response = await Conexion.getAllDirectores();
                                setDirectores(response);
                                // Establecer el director inicial
                                const initialDirector = response.find(d => d.idDirector === profile.ID_Director);
                                if (initialDirector) {
                                    setSelectedDirector(initialDirector);
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            setUser(user);
        };

        fetchData();
    }, []);

    useEffect(() => {
        loadDirectorData(idPerfil, añoActual);
    }, [idPerfil, añoActual]);

    useEffect(() => {
        loadSalesAndProjections(idPerfil, añoActual, mesActual);
    }, [idPerfil, mesActual, añoActual]);

    const handleDirectorSelect = (director) => {
        setSelectedDirector(director);
        setIdPerfil(director.idDirector);
    };

    const homeComponents = (
        <div className="dashboard-container">
            {(user?.rol === 'GERENTE' || user?.rol === 'ADMINISTRADOR') && (
                <div style={{ width: '100%' }}>
                    <DirectorSelector
                        directores={directores}
                        selectedDirector={selectedDirector}
                        onDirectorSelect={handleDirectorSelect}
                    />
                </div>
            )}
            <div className="cards-row">
                <div className="profile-section">
                    <CardProfile />
                </div>
                <div className="facturacion-section">
                    <CardFacturacion />
                </div>
            </div>
            <div className="clientes-section">
                <CardClientes />
            </div>
        </div>
    );
    
    return (
        <div>
            {show && <ModalProyeccion />}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                {homeComponents}
            </motion.div>
        </div>
    );
}