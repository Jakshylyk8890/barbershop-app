

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    service_requested: '',
    appointment_date: '',
    appointment_time: ''
  });

  const [message, setMessage] = useState('');
  const [ , setAvailableTimes] = useState([]);  const [timeOptions, setTimeOptions] = useState([]);

  // Watch for date change and fetch available times
  useEffect(() => {
    if (formData.appointment_date) {
      axios
        .get(`http://127.0.0.1:8000/api/available-times/?date=${formData.appointment_date}`)
        .then(res => {
          const times = res.data.available_times || [];
          setAvailableTimes(times);
          setTimeOptions(times.map(t => ({ value: t, label: t })));
        })
        .catch(() => {
          setAvailableTimes([]);
          setTimeOptions([]);
        });
    }
  }, [formData.appointment_date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (selectedOption) => {
    setFormData({ ...formData, appointment_time: selectedOption ? selectedOption.value : '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
    customer_name: formData.customer_name,
    phone_number: formData.phone_number,
    service: 1,  // Replace with real ID
    barber: 1,   // Replace with real ID
    appointment_date: formData.appointment_date,
    appointment_time: formData.appointment_time
  };
    axios.post('http://127.0.0.1:8000/api/appointments/', formData)
      .then(() => {
        setMessage('success');
        setFormData({
          customer_name: '',
          phone_number: '',
          service_requested: '',
          appointment_date: '',
          appointment_time: ''
        });
        setAvailableTimes([]);
        setTimeOptions([]);
      })
      .catch(() => {
        setMessage('error');
      });
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
      {/* Header */}
      <div className="text-center mb-4" style={{ paddingTop: '20px' }}>
        <img
          src="/logo-tochka.png"
          alt="Точка"
          style={{
            width: '320px',
            maxWidth: '100%',
            height: 'auto',
            marginBottom: '20px'
          }}
        />
        <p className="text-muted">Онлайн-запись</p>
      </div>

      {/* Form Card */}
      <div className="card shadow-sm p-4">
        <h4 className="mb-3 text-center">Записаться на приём</h4>

        {message === 'success' && (
          <div className="alert alert-success text-center">✅ Запись успешно оформлена!</div>
        )}
        {message === 'error' && (
          <div className="alert alert-danger text-center">❌ Не удалось записаться. Попробуйте снова.</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input
              type="text"
              name="customer_name"
              className="form-control"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Номер WhatsApp</label>
            <input
              type="tel"
              name="phone_number"
              className="form-control"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Услуга</label>
            <input
              type="text"
              name="service_requested"
              className="form-control"
              value={formData.service_requested}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Дата</label>
              <input
                type="date"
                name="appointment_date"
                className="form-control"
                value={formData.appointment_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Время</label>
              <Select
                name="appointment_time"
                options={timeOptions}
                value={timeOptions.find(opt => opt.value === formData.appointment_time) || null}
                onChange={handleTimeSelect}
                placeholder="Выберите время"
                isClearable
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
