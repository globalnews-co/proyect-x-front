import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { ClipboardX, ChevronDown, ChevronUp } from 'lucide-react';
import moment from 'moment';

export default function TableProyeccion() {
  const { proyeccionTable } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const itemsPerPage = 5;

  // Sorting function
  const sortData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Special handling for formatted values
      if (sortConfig.key === 'proyeccionValor') {
        aValue = parseFloat(a.proyeccionValor);
        bValue = parseFloat(b.proyeccionValor);
      } else if (sortConfig.key === 'fechaInicio') {
        aValue = moment(a.fechaInicio);
        bValue = moment(b.fechaInicio);
      }

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedData = sortData(proyeccionTable || []);
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((proyeccionTable?.length || 0) / itemsPerPage);

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(valor);
  };

  if (!proyeccionTable?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <ClipboardX className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-500">
          No se encontraron registros de proyección para este período
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('nombreServicio')}
              >
                <div className="flex items-center space-x-1">
                  <span>Servicio</span>
                  {sortConfig.key === 'nombreServicio' && (
                    sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('proyeccionValor')}
              >
                <div className="flex items-center space-x-1">
                  <span>Proyección</span>
                  {sortConfig.key === 'proyeccionValor' && (
                    sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('fechaInicio')}
              >
                <div className="flex items-center space-x-1">
                  <span>Mes</span>
                  {sortConfig.key === 'fechaInicio' && (
                    sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.nombreServicio}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatearMoneda(row.proyeccionValor)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {moment(row.fechaInicio).add(1, 'months').format("MMMM")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between w-full">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}