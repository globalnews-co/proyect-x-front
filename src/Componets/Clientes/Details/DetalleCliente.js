import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import Conexion from '../../../Service/Conexion';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import AddVentas from './AddVentas';

export function DetalleCliente() {
  const {
    nitCliente, digito, empresaCliente, ventas, setVentas,
    servicios, setServicios, setFechaInicio, setFechaFin,
    setProyeccion, setIngresosFacturacion, setIdServicio,
    setFechaAcuerdo, setNumeroCotizacion, setObservacionesVenta,
    setTipoVenta, setIdVenta
  } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState('Fecha_Inicio');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    if (nitCliente != null && digito != null) {
      Conexion.GetServicios()
        .then((response) => {
          const servicios = response;
          if (nitCliente.length < 19) {
            Conexion.ListServiciosByCliente(nitCliente).then((response) => {
              const numeros = response;
              const nuevoArregloObjetos = servicios.map((objeto, index) => {
                if (numeros[index] === undefined) {
                  return { ...objeto, check: false, value: 0 };
                }
                else if (numeros[index].idServicio == objeto.idServicio) {
                  return { ...objeto, check: true, value: numeros[index].value || 0 };
                } else {
                  return { ...objeto, check: false, value: 0 };
                }
              });
              setServicios(nuevoArregloObjetos);
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar los servicios del cliente'
          });
        });
    }

    if (nitCliente != null && digito != null) {
      Conexion.ListVentasByCliente(nitCliente, digito)
        .then((response) => {
          setVentas(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [nitCliente]);

  const formatearMoneda = (numero) => {
    const valorNumerico = parseFloat(numero) || 0;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valorNumerico);
  };

  let total = 0;
  let totalFormateado = '';

  if (ventas.length > 0) {
    ventas.forEach(element => {
      let ingresos = element.Ingresos_Facturacion
        ? parseFloat(String(element.Ingresos_Facturacion).replace(/[^\d.-]/g, ''))
        : 0;
      total += isNaN(ingresos) ? 0 : ingresos;
    });
    totalFormateado = formatearMoneda(total);
  }

  const handleCheckboxChange = (event, idServicio) => {
    const { checked } = event.target;
    const updatedServicios = servicios.map((item) => {
      if (item.idServicio === idServicio) {
        return { ...item, check: checked, value: checked ? item.value || 0 : '' };
      } else {
        return item;
      }
    });
    setServicios(updatedServicios);
    actualizarProductosSeleccionados(updatedServicios);
  };

  const handleValueChange = (event, idServicio) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    const updatedServicios = servicios.map((item) => {
      if (item.idServicio === idServicio) {
        return { ...item, value: formatearMoneda(numericValue) };
      } else {
        return item;
      }
    });
    setServicios(updatedServicios);
    actualizarProductosSeleccionados(updatedServicios);
  };

  const actualizarProductosSeleccionados = (newServicios) => {
    const productos = newServicios
      .filter(item => item.check)
      .map(item => item.tipoServicio)
      .join(', ');
    setIdServicio(productos);
    recalculateIngresosFacturacion(newServicios);
  };

  const recalculateIngresosFacturacion = (newServicios) => {
    const totalIngresos = newServicios.reduce((total, item) => {
      const itemValue = Number(String(item.value).replace(/[^\d.-]/g, '')) || 0;
      return item.check && !isNaN(itemValue) ? total + itemValue : total;
    }, 0);
    setIngresosFacturacion(totalIngresos);
  };

  const sortData = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!ventas || ventas.length === 0) return [];

    const sortedData = [...ventas].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'Fecha_Inicio':
        case 'Fecha_Fin':
          aValue = new Date(a[sortField]).getTime();
          bValue = new Date(b[sortField]).getTime();
          break;
        case 'Ingresos_Facturacion':
          aValue = parseFloat(String(a[sortField]).replace(/[^\d.-]/g, '')) || 0;
          bValue = parseFloat(String(b[sortField]).replace(/[^\d.-]/g, '')) || 0;
          break;
        default:
          aValue = a[sortField] || '';
          bValue = b[sortField] || '';
          if (typeof aValue === 'string') aValue = aValue.toLowerCase();
          if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return sortedData;
  };

  const getPaginatedData = () => {
    const sortedData = getSortedData();
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  };

  const totalPages = Math.ceil((ventas?.length || 0) / rowsPerPage);

  const getServiciosString = (row) => {
    const serviciosList = [
      { nombre: 'Clipping', valor: row.Clipping },
      { nombre: 'SocialMedia', valor: row.SocialMedia },
      { nombre: 'InformesAnalisis', valor: row.InformesAnalisis },
      { nombre: 'CatalogoPublicitario', valor: row.CatalogoPublicitario },
      { nombre: 'Compliance', valor: row.Compliance },
      { nombre: 'Internacional', valor: row.Internacional },
      { nombre: 'OtrosServicios', valor: row.OtrosServicios },
    ];
    const serviciosSeleccionados = serviciosList
      .filter(servicio => servicio.valor && servicio.valor !== 0)
      .map(servicio => servicio.nombre);
    return serviciosSeleccionados.length > 0 ? serviciosSeleccionados.join(', ') : 'No aplica';
  };

  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const rowClicked = (row) => {
    const serviciosArray = [
      { tipoServicio: 'Clipping', value: row.Clipping },
      { tipoServicio: 'Social Media', value: row.SocialMedia },
      { tipoServicio: 'Informes de Análisis', value: row.InformesAnalisis },
      { tipoServicio: 'Catálogo Publicitario', value: row.CatalogoPublicitario },
      { tipoServicio: 'Compliance', value: row.Compliance },
      { tipoServicio: 'Internacional', value: row.Internacional },
      { tipoServicio: 'Otros Servicios', value: row.OtrosServicios }
    ];

    const updatedServicios = servicios.map((item) => {
      const cleanedTipoServicio = normalizeString(item.tipoServicio.trim().replace(/\r?\n|\r/g, ""));
      const servicioEncontrado = serviciosArray.find(servicio =>
        normalizeString(servicio.tipoServicio) === cleanedTipoServicio
      );

      if (servicioEncontrado && servicioEncontrado.value && servicioEncontrado.value !== 0) {
        return { ...item, check: true, value: servicioEncontrado.value };
      } else {
        return { ...item, check: false, value: 0 };
      }
    });

    setServicios(updatedServicios);
    setIdVenta(row.ID_Venta);
    setFechaAcuerdo(row.Fecha_Acuerdo);
    setFechaFin(row.Fecha_Fin);
    setFechaInicio(row.Fecha_Inicio);
    setIngresosFacturacion(Number(row.Ingresos_Facturacion).toLocaleString());
    setNumeroCotizacion(row.N_Cotizacion);
    setObservacionesVenta(row.Observaciones);
    setProyeccion(Number(row.Proyeccion).toLocaleString());
    setTipoVenta(row.Tipo_Venta);
  };

  return (
    <div className="modal fade" id="modalDetalleCliente" tabIndex="-1" aria-labelledby="modalDetalleClienteLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content bg-gray-900 text-gray-100 shadow-lg border-0">
          {/* Header */}
          <div className="modal-header flex justify-between items-center px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h5 className="text-lg font-semibold text-gray-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              Ventas Cliente - <span className="font-bold ml-1 text-blue-300">{empresaCliente}</span>
            </h5>
            <button type="button" className="text-gray-400 hover:text-gray-200" data-bs-dismiss="modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-6">
                {/* Productos Adquiridos */}
                <div className="bg-gray-800 rounded-md shadow overflow-hidden">
                  <div className="px-4 py-2 bg-gray-700">
                    <h5 className="text-gray-100 font-medium flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Productos Adquiridos
                    </h5>
                  </div>
                  <div className="p-3 space-y-1">
                    {servicios.map((item) => (
                      <div key={item.idServicio}
                        className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-700">
                        <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.check}
                            onChange={(event) => handleCheckboxChange(event, item.idServicio)}
                            className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <span>{item.tipoServicio}</span>
                        </label>
                        {item.check && (
                          <input
                            type="text"
                            placeholder="Valor"
                            value={item.value !== undefined ? item.value : ''}
                            onChange={(event) => handleValueChange(event, item.idServicio)}
                            className="w-36 px-3 py-1 bg-gray-700 text-gray-200 border-0 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabla con Tailwind */}
                {/* Tabla con Tailwind - Con iconos de ordenamiento corregidos */}
                <div className="bg-gray-800 rounded-md shadow overflow-hidden">
                  <div className="px-4 py-2 bg-gray-700">
                    <h5 className="text-gray-100 font-medium flex items-center text-sm pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Historial de Ventas
                    </h5>
                  </div>
                  <div className="overflow-x-auto max-h-80">
                    <table className="min-w-full">
                      <thead className="bg-gray-700 sticky top-0 z-10">
                        <tr>
                          <th
                            className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "120px", maxWidth: "120px" }}
                            onClick={() => sortData('servicio')}
                          >
                            <div className="flex items-center">
                              <span>Servicio</span>
                              {sortField === 'servicio' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                          <th
                            className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "100px" }}
                            onClick={() => sortData('Fecha_Inicio')}
                          >
                            <div className="flex items-center">
                              <span>Fecha inicio</span>
                              {sortField === 'Fecha_Inicio' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                          <th
                            className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "100px" }}
                            onClick={() => sortData('Fecha_Fin')}
                          >
                            <div className="flex items-center">
                              <span>Fecha fin</span>
                              {sortField === 'Fecha_Fin' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                          <th
                            className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "120px" }}
                            onClick={() => sortData('Anunciante')}
                          >
                            <div className="flex items-center">
                              <span>Anunciante</span>
                              {sortField === 'Anunciante' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                          <th
                            className="px-3 py-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "90px" }}
                            onClick={() => sortData('Ingresos_Facturacion')}
                          >
                            <div className="flex items-center justify-end">
                              <span>Valor</span>
                              {sortField === 'Ingresos_Facturacion' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                          <th
                            className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                            style={{ width: "80px" }}
                            onClick={() => sortData('Tipo_Venta')}
                          >
                            <div className="flex items-center">
                              <span>Tipo</span>
                              {sortField === 'Tipo_Venta' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === 'asc' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                              )}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {getPaginatedData().length > 0 ? (
                          getPaginatedData().map((row, index) => (
                            <tr key={index}
                              onClick={() => rowClicked(row)}
                              className="hover:bg-gray-700 cursor-pointer">
                              <td className="px-3 py-1.5 text-xs text-gray-300" style={{ maxWidth: "120px" }}>
                                <div className="truncate" title={getServiciosString(row)}>
                                  {getServiciosString(row)}
                                </div>
                              </td>
                              <td className="px-3 py-1.5 text-xs text-gray-300 whitespace-nowrap">
                                {moment(row.Fecha_Inicio).utc().format('DD/MM/YYYY')}
                              </td>
                              <td className="px-3 py-1.5 text-xs text-gray-300 whitespace-nowrap">
                                {moment(row.Fecha_Fin).utc().format('DD/MM/YYYY')}
                              </td>
                              <td className="px-3 py-1.5 text-xs text-gray-300" style={{ maxWidth: "120px" }}>
                                <div className="truncate" title={row.Anunciante}>
                                  {row.Anunciante}
                                </div>
                              </td>
                              <td className="px-3 py-1.5 text-xs text-gray-300 text-right whitespace-nowrap">
                                {formatearMoneda(row.Ingresos_Facturacion)}
                              </td>
                              <td className="px-3 py-1.5 text-xs text-gray-300" style={{ maxWidth: "80px" }}>
                                <div className="truncate" title={row.Tipo_Venta}>
                                  {row.Tipo_Venta}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-3 py-4 text-center text-gray-400 text-sm">
                              <p>No hay registros para mostrar</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Paginación */}
                  <div className="py-2 px-3 bg-gray-800 flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-400">
                      <span>Filas:</span>
                      <select
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="ml-1 bg-gray-700 border-0 text-gray-300 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">
                        {currentPage}-{totalPages} de {totalPages}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className={`p-0.5 rounded ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`p-0.5 rounded ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className={`p-0.5 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className={`p-0.5 rounded ${currentPage === totalPages || totalPages === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Ventas */}
                <div className="bg-blue-900 bg-opacity-30 rounded-md shadow py-3 px-4">
                  <div className="flex justify-between items-center text-gray-100">
                    <span className="font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Total Ventas:
                    </span>
                    <span className="text-lg font-semibold text-blue-300">{totalFormateado}</span>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Formulario de Ventas */}
              <div className="bg-gray-800 rounded-md shadow">
                <div className="px-4 py-2 bg-gray-700">
                  <h5 className="text-gray-100 font-medium flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {ventas.length > 0 && ventas.some(v => v.ID_Venta === setIdVenta) ? 'Actualizar Venta' : 'Agregar Venta'}
                  </h5>
                </div>
                <div className="p-0">
                  <AddVentas />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleCliente;