// File: src/pages/ServiceSelection.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ServiceSelection = () => {
  const [services, setServices] = useState([]);
  const { bookingData, setBookingData } = useBooking();
  const [animate, setAnimate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/services/')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to load services', err));

    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (service) => {
    setSelectedId(service.id);
    const updated = { ...bookingData, service };
    setBookingData(updated);

    setTimeout(() => {
      if (updated.barber && updated.date && updated.time) {
        navigate('/info');
      } else if (!updated.barber) {
        navigate('/barber');
      } else {
        navigate('/time');
      }
    }, 300);
  };

  return (
    <div className="barber-container">
      <img src="/logo-tochka.png" alt="Точка Barbershop" className="logo" />
      <h2 className="barber-title">Выберите услугу</h2>

      <div className="barber-button-group">
        {services.map((service, idx) => (
          <button
            key={service.id}
            onClick={() => handleSelect(service)}
            className={`animated-button ${animate ? 'visible' : ''} ${selectedId === service.id ? 'selected' : ''}`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            {service.name} — {Number(service.price).toFixed(2)} сом
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
