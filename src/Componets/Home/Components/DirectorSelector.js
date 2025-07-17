import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

const DirectorSelector = ({ directores, onDirectorSelect, selectedDirector }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredDirectores, setFilteredDirectores] = useState([]);
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = directores.filter(director => 
        director.nombreDirector
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredDirectores(filtered);
    } else {
      setFilteredDirectores(directores);
    }
  }, [searchTerm, directores]);

  const handleSelect = (director) => {
    onDirectorSelect(director);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={selectorRef}>
      <div className="flex rounded-md border">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar director..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
        </div>
        <button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="block truncate">
            {selectedDirector ? 
              selectedDirector.nombreDirector : 
              "Seleccionar director"}
          </span>
          <span className="ml-1 pointer-events-none inline-flex items-center">
            {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
      </div>
      
      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white rounded-md border max-h-60 overflow-y-auto z-10 border border-gray-200">
          {filteredDirectores.length > 0 ? (
            filteredDirectores.map((director) => (
              <div
                key={director.idDirector}
                className={`p-2 cursor-pointer border-b border-gray-100 hover:bg-gray-100 ${
                  selectedDirector?.idDirector === director.idDirector ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleSelect(director)}
              >
                {director.nombreDirector}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">
              No se encontraron directores
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DirectorSelector;