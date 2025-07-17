import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import moment from 'moment/moment';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import formatearMoneda from '../../Statics/formatMoneda';

export default function CardClientes() {
    const { ventas, añoActual, mesActual} = useContext(DataContext);
    const [expandedRows, setExpandedRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [filterText, setFilterText] = useState('');

    // Helper function to filter out "Pendiente" values
    const filterPendiente = (value) => {
        if (!value) return '';
        
        if (value.includes(';')) {
            // Split by semicolon, filter out "Pendiente" values, and join back
            return value
                .split(';')
                .filter(item => !item.trim().toLowerCase().includes('pendiente'))
                .join(', ');
        }
        
        // If single value and it's "Pendiente", return empty string
        return value.toLowerCase().includes('pendiente') ? '' : value;
    };

    const concatenarServicios = (row) => {
        let serviciosContratados = [];
        if (Number(row.Clipping) > 0) serviciosContratados.push("Clipping");
        if (Number(row.SocialMedia) > 0) serviciosContratados.push("Social Media");
        if (Number(row.InformesAnalisis) > 0) serviciosContratados.push("Informes de Análisis");
        if (Number(row.CatalogoPublicitario) > 0) serviciosContratados.push("Catálogo Publicitario");
        if (Number(row.Compliance) > 0) serviciosContratados.push("Compliance");
        if (Number(row.Internacional) > 0) serviciosContratados.push("Internacional");
        if (Number(row.OtrosServicios) > 0) serviciosContratados.push("Otros Servicios");
        return serviciosContratados.join(', ');
    };

    const handleRowClick = (row) => {
        if (expandedRows.includes(row)) {
            setExpandedRows(expandedRows.filter(item => item !== row));
        } else {
            setExpandedRows([...expandedRows, row]);
        }
    };

    let filteredItems = [];

    if (ventas.ventas !== undefined && ventas.ventas !== null && ventas.ventas.length > 0) {
        filteredItems = ventas.ventas.filter(item =>
            item.empresaCliente &&
            item.empresaCliente.toLowerCase().includes(filterText.toLowerCase())
            || item.ciudadCliente &&
            item.ciudadCliente.toLowerCase().includes(filterText.toLowerCase())
            || item.tipoCliente &&
            item.tipoCliente.toLowerCase().includes(filterText.toLowerCase())
            || concatenarServicios(item).toLowerCase().includes(filterText.toLowerCase())
        );
    }

    useEffect(() => {
        let total = 0;
        if (filteredItems) {
            filteredItems.forEach(element => {
                let months = moment(element.fechaFin).diff(element.fechaInicio, 'months');
                months = months === 0 ? 1 : months;
                total = (element.ingresosFacturacion);
            });
        }
        setTotal(total);
    }, [filteredItems]);

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
        <div className="bg-white rounded-lg border p-6">
            {/* Header con búsqueda y total */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                        {formatearMoneda(obtenerTotalVentas())}
                    </div>
                    <div className="text-sm text-gray-500">Valor Total Ventas</div>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre Empresa
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ciudad
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Servicios Vendidos
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Anunciante
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Periodo
                            </th>
                            <th className="w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((row, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleRowClick(row)}
                                >
                                    <td className="px-4 py-4">{row.empresaCliente}</td>
                                    <td className="px-4 py-4">{filterPendiente(row.ciudadCliente)}</td>
                                    <td className="px-4 py-4">{row.tipoCliente}</td>
                                    <td className="px-4 py-4">{concatenarServicios(row)}</td>
                                    <td className="px-4 py-4">{row.Anunciante}</td>
                                    <td className="px-4 py-4">
                                        {(() => {
                                            const inicio = moment(row.fechaInicio);
                                            const fin = moment(row.fechaFin);
                                            const meses = fin.diff(inicio, 'months');
                                            const fechaDespuesMeses = moment(inicio).add(meses, 'months');
                                            const diasRestantes = fin.diff(fechaDespuesMeses, 'days');
                                            let resultado = '';
                                            if (meses > 0) {
                                                resultado += `${meses} ${meses === 1 ? 'Mes' : 'Meses'}`;
                                            }
                                            if (diasRestantes > 0 || (meses === 0 && diasRestantes === 0)) {
                                                if (resultado) resultado += ' ';
                                                resultado += `${diasRestantes || 1} ${diasRestantes === 1 ? 'Día' : 'Días'}`;
                                            }
                                            return resultado;
                                        })()}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {expandedRows.includes(row) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </td>
                                </tr>
                                {expandedRows.includes(row) && (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-4 bg-gray-50">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {[
                                                    { nombre: 'Clipping', valor: row.Clipping },
                                                    { nombre: 'Social Media', valor: row.SocialMedia },
                                                    { nombre: 'Informes de Análisis', valor: row.InformesAnalisis },
                                                    { nombre: 'Catálogo Publicitario', valor: row.CatalogoPublicitario },
                                                    { nombre: 'Compliance', valor: row.Compliance },
                                                    { nombre: 'Internacional', valor: row.Internacional },
                                                    { nombre: 'Otros Servicios', valor: row.OtrosServicios }
                                                ].map(servicio => (
                                                    Number(servicio.valor) > 0 && (
                                                        <div key={servicio.nombre} className="bg-white p-4 rounded border">
                                                            <div className="text-sm font-medium text-gray-500">
                                                                {servicio.nombre}
                                                            </div>
                                                            <div className="text-lg font-semibold mt-1">
                                                                {formatearMoneda(servicio.valor)}
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}