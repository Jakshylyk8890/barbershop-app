import React, { useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    setError('');
    try {
      const res = await axios.get('http://localhost:8000/api/my-appointments/', {
        params: { name, phone }
      });
      setAppointments(res.data);
    } catch (err) {
      setError('No appointments found or error occurred.');
      setAppointments([]);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180 }} />
      <h2>🔍 Мои записи</h2>

      <div style={{ marginTop: 30 }}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="tel"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={fetchAppointments}>Показать</button>
      </div>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

      {appointments.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>Ваши записи:</h3>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id}>
                📅 {appt.appointment_date} в {appt.appointment_time} — {appt.service} ({appt.barber})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
