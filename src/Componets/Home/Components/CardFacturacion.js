import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import LineChartMont from './LineChartMont';
import TableProyeccion from './TableProyeccion';
import ChartVentas from './ChartVentas';
import moment from 'moment';
import '../../../Style/cardfacturacion.css';
import formatearMoneda from '../../Statics/formatMoneda';

export default function CardFacturacion() {
    const user = JSON.parse(localStorage.getItem('user'));

    const { show, setShow, ventas, proyeccion, añoActual, setAñoActual, mesActual, setMesActual } = useContext(DataContext)

    const [selectedNavItem, setSelectedNavItem] = useState('Total');

    const handleNavItemClick = (item) => {
        setSelectedNavItem(item);
    };
    const handleYearChange = (e) => {
        setAñoActual(parseInt(e.target.value));
    }


    //sumar valorvendido de cada objeto de ventas.detallemes  y retornar el total
    const obtenerVentasMesActual = () => {
        console.log('Ventas: ', ventas?.ventaspormes, 'Mes: ', mesActual, 'Año: ', añoActual)
        const ventaMes = ventas?.ventaspormes?.find(venta =>
            venta.Mes === mesActual + 1 &&
            venta.Anio === añoActual
        );

        return ventaMes ? ventaMes.Ingreso : 0; // Retornamos específicamente el Ingreso o 0 si no hay datos
    }

    const avanzarMes = () => {
        setMesActual((mes) => (mes + 1) % 12);
    };

    const retrocederMes = () => {
        setMesActual((mes) => (mes - 1 + 12) % 12);
    };


    const Meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]

    const obtenerTotalVentas = () => {
        return ventas?.ventaspormes?.reduce((total, venta) => {
            // Solo suma si el año coincide con añoActual
            if (venta.Anio === añoActual) {
                return total + venta.Ingreso;
            }
            return total;
        }, 0) || 0;
    }
    return (
        <div className="modern-card">
            <div className="card-header">
                <div className="header-title">
                    <h2>Facturación y Proyección</h2>
                    {(user?.rol === 'GERENTE' || user?.rol?.includes('COORDINADOR')) && (
                        <button className="add-projection-btn" onClick={() => setShow(!show)}>
                            + Añadir Proyección
                        </button>
                    )}
                </div>

                <div className="date-controls">
                    <button className="nav-btn" onClick={retrocederMes}>
                        ‹
                    </button>
                    <span className="current-month">{Meses[mesActual]}</span>
                    <button className="nav-btn" onClick={avanzarMes}>
                        ›
                    </button>
                    <div className="date-controls-separator"></div>
                    <select
                        className="year-select"
                        onChange={handleYearChange}
                        value={añoActual}
                    >
                        {[añoActual - 1, añoActual, añoActual + 1].map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card highlight">
                    <span className="stat-value">{formatearMoneda(obtenerTotalVentas())}</span>
                    <span className="stat-label">Facturación año actual</span>
                </div>
                {[1, 2, 3, 4].map(quarter => (
                    <div key={quarter} className="stat-card">
                        <span className="stat-value">
                            {formatearMoneda(ventas?.[`trimestre${quarter}`])}
                        </span>
                        <span className="stat-label">{`${quarter}° Trimestre`}</span>
                    </div>
                ))}
            </div>

            <div className="content-nav">
                <button
                    className={`nav-item ${selectedNavItem === 'Total' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('Total')}
                >
                    Total
                </button>
                <button
                    className={`nav-item ${selectedNavItem === 'Detalle' ? 'active' : ''}`}
                    onClick={() => setSelectedNavItem('Detalle')}
                >
                    Detalle
                </button>
            </div>

            <div className="chart-section">
                {selectedNavItem === 'Total' ? (
                    <div className="chart-grid">
                        <div className="chart-container">
                            <LineChartMont />
                        </div>
                        <div className="table-container">
                            <TableProyeccion mesActual={mesActual} añoActual={añoActual} />
                        </div>
                    </div>
                ) : (
                    <ChartVentas />
                )}
            </div>

            <div className="summary-grid">
                <div className="summary-card">
                    <span className="summary-value">
                        {formatearMoneda(proyeccion[0]?.proyeccion)}
                    </span>
                    <span className="summary-label">
                        Proyección mensual {moment({ month: mesActual }).format('MMMM')}
                    </span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">
                        {formatearMoneda(ventas?.newclients)}
                    </span>
                    <span className="summary-label">Total Nuevos Clientes</span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">
                        {formatearMoneda(obtenerVentasMesActual())}
                    </span>
                    <span className="summary-label">Total mes actual</span>
                </div>
                <div className="summary-card">
                    <span className="summary-value">
                        {formatearMoneda(Math.abs(proyeccion[0]?.proyeccion - obtenerVentasMesActual()))}
                    </span>
                    <span className="summary-label">
                        {(proyeccion[0]?.proyeccion - obtenerVentasMesActual()) < 0
                            ? 'Sobrante'
                            : 'Faltante'} mes actual
                    </span>
                </div>
            </div>
        </div>
    );
}