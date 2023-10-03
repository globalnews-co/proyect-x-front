import React from 'react';


const OffCanvasProyeccion = ({ show, handleClose, content }) => {
    return (

        <div className={`offcanvas ${show ? 'show' : ''}`}>
                <div className="offcanvas-content">
                    {content}
                    
                </div>
                <button class="btn btn-danger" className="offcanvas-close" onClick={handleClose}>
                    Cerrar
                </button>
        </div>
    );
};

export default OffCanvasProyeccion;