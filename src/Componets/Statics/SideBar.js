import React, { useEffect, useState } from 'react';

import '../../Assets/navbar.css';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SideBar = () => {

  const [show, setShow] = useState(false);
  const [zIndexBg, setZIndexBg] = useState(-1);


  const closeNav = () => {
    console.log('hola');
    setShow(false);

    // Retrasar el cambio de zIndex para asegurarse de que la animación tenga tiempo para completarse
    setTimeout(() => {
      setZIndexBg(-1);
    }, 400); // 400 milisegundos coincide con la duración de la animación*/
  };

  const openNav = () => {
    setShow(true);
    setZIndexBg(998);
  }

  return (
    <div>
      <button className="btn btn-dark" onClick={openNav}>

        <i className="bi bi-list me-2"></i> Inicio
      </button>
      <AnimatePresence>
        <motion.div
          className='bg-overlay'
          initial={{ opacity: 0 }} // Inicialmente, el fondo estará completamente transparente
          animate={{ opacity: show ? 1 : 0 }} // Durante la animación, ajusta la opacidad según si el menú está visible o no
          exit={{ opacity: 0 }} // Cuando se sale, el fondo se desvanecerá completamente
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: zIndexBg,
          }}
          onClick={closeNav}
        >
          {show && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Contenido del menú */}
              <div
                style={{
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  backgroundColor: '#000',
                  width: '250px',
                  height: '100vh ',
                  zIndex: 999,
                  padding: '20px',
                  paddingTop: '50px',
                }}
              >
                <h5 style={{ color: 'white' }}><b>MENU</b></h5>
                <div style={{ paddingTop: '4rem' }}>
                  <ul className="list-unstyled">
                    <Link to="/">
                      <li><i className="bi bi-house-door-fill" /> <span className="text-decoration-none">Inicio</span></li>
                    </Link>
                    <Link to="/agenda">
                      <li><i className="bi bi-calendar3" /><span>Agenda</span></li>
                    </Link>
                    <Link to="/clientes">
                      <li><i className="bi bi-people-fill" /><span>Clientes</span></li>
                    </Link>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
