import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import moment from 'moment';
import formatearMoneda from '../../Statics/formatMoneda';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChartLine, FaWallet } from 'react-icons/fa';
import '../../../Style/cardprofile.css';

export default function CardProfile() {
  const { proyeccionAnual, director, totalventasbydir } = useContext(DataContext);
  console.log('proyeccion anual: ',proyeccionAnual)
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src="https://pbs.twimg.com/profile_images/1190075534442745862/apLyAju8_400x400.jpg"
            className="profile-image"
            alt="Profile"
          />
        </div>
      </div>

      <div className="profile-content">
        <h2 className="profile-name">
          {director?.nombreDirector || 'sistemas'}
        </h2>

        <div className="contact-details">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <p className="contact-text">{director?.telefonoDirector || '3124774920'}</p>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a
              href={`mailto:${director?.emailDirector || 'sistemas@globalnews.com.co'}`}
              className="contact-text contact-link"
            >
              {director?.emailDirector || 'sistemas@globalnews.com.co'}
            </a>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span className="contact-text">{director?.ciudadDirector || 'Bogota'}</span>
          </div>
        </div>

        <div className="metrics-section">
          <div className="metric-card">
            <div className="metric-header">
              <FaChartLine className="metric-icon" />
              <span className="metric-title">Total Ventas</span>
            </div>
            <div className="metric-value">
              {totalventasbydir || '0'}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <FaWallet className="metric-icon" />
              <span className="metric-title">Proyección Anual {moment().format('YYYY')}</span>
            </div>
            <div className="metric-value">
              {formatearMoneda(proyeccionAnual)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}