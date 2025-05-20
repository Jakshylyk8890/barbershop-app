// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useBooking } from '../context/BookingContext';
// import { useNavigate } from 'react-router-dom';

// const Confirmation = () => {
//   const { bookingData, setBookingData } = useBooking();
//   const [status, setStatus] = useState(null); // 'success' | 'error' | null
//   const [loading, setLoading] = useState(false);
//   const [confirmedData, setConfirmedData] = useState(null);
//   const navigate = useNavigate();

//   // Redirect if any required data is missing
//   useEffect(() => {
//     if (status !== 'success') {
//       const isIncomplete =
//         !bookingData.barber ||
//         !bookingData.service ||
//         !bookingData.date ||
//         !bookingData.time ||
//         !bookingData.customer_name ||
//         !bookingData.phone_number;

//       if (isIncomplete) {
//         navigate('/');
//       }
//     }
//   }, [bookingData, status, navigate]);

//   // Cleanup booking context after success is shown
//   useEffect(() => {
//     if (status === 'success') {
//       const timer = setTimeout(() => {
//         setBookingData({
//           service: null,
//           barber: null,
//           date: '',
//           time: '',
//           customer_name: '',
//           phone_number: '',
//         });
//         localStorage.removeItem('bookingData');
//       }, 5000); // Delay cleanup

//       return () => clearTimeout(timer);
//     }
//   }, [status, setBookingData]);

//   const handleConfirm = () => {
//     setLoading(true);

//     const payload = {
//       customer_name: bookingData.customer_name,
//       phone_number: bookingData.phone_number,
//       service: bookingData.service.id,
//       barber: bookingData.barber.id,
//       appointment_date: bookingData.date,
//       appointment_time: bookingData.time,
//     };

//     axios
//       .post('http://localhost:8000/api/appointments/', payload)
//       .then(() => {
//         setConfirmedData(bookingData); // take snapshot before clearing
//         setStatus('success');
//       })
//       .catch((error) => {
//         if (error.response?.data?.error) {
//           alert(error.response.data.error);
//         }
//         setStatus('error');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   // ✅ Success screen
//   if (status === 'success') {
//     return (
//       <div style={{ textAlign: 'center', padding: '30px' }}>
//         <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180 }} />
//         <h2>✅ Запись подтверждена!</h2>
//         <p>Ждём вас {new Date(confirmedData?.date).toLocaleDateString('ru-RU')} в {confirmedData?.time}</p>
//         <p>Барбер: {confirmedData?.barber?.name || '—'}</p>
//         <p>Услуга: {confirmedData?.service?.name || '—'}</p>
//         <p>Спасибо, {confirmedData?.customer_name || '—'}!</p>
//       </div>
//     );
//   }

//   // 🟦 Default confirmation screen
//   return (
//     <div style={{ padding: '30px' }}>
//       <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180 }} />
//       <h2>Подтвердите запись</h2>

//       <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px' }}>
//         <li><strong>Имя:</strong> {bookingData.customer_name || '—'}</li>
//         <li><strong>Телефон:</strong> {bookingData.phone_number || '—'}</li>
//         <li><strong>Услуга:</strong> {bookingData.service?.name || '—'}</li>
//         <li><strong>Барбер:</strong> {bookingData.barber?.name || '—'}</li>
//         <li><strong>Дата:</strong> {bookingData.date || '—'}</li>
//         <li><strong>Время:</strong> {bookingData.time || '—'}</li>
//       </ul>

//       {status === 'error' && (
//         <p style={{ color: 'red' }}>
//           ❌ Не удалось записаться. Попробуйте позже.
//         </p>
//       )}

//       <button
//         onClick={handleConfirm}
//         disabled={loading}
//         style={{
//           backgroundColor: '#0047FF',
//           color: 'white',
//           padding: '12px 24px',
//           border: 'none',
//           borderRadius: '6px',
//           marginTop: '20px',
//           cursor: loading ? 'wait' : 'pointer',
//         }}
//       >
//         {loading ? 'Отправка...' : 'Подтвердить'}
//       </button>
//     </div>
//   );
// };

// export default Confirmation;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Confirmation = () => {
  const { bookingData, setBookingData } = useBooking();
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'success') {
      const missing =
        !bookingData.barber ||
        !bookingData.service ||
        !bookingData.date ||
        !bookingData.time ||
        !bookingData.customer_name ||
        !bookingData.phone_number;

      if (missing) navigate('/');
    }
  }, [bookingData, status, navigate]);

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setBookingData({
          service: null,
          barber: null,
          date: '',
          time: '',
          customer_name: '',
          phone_number: '',
        });
        localStorage.removeItem('bookingData');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, setBookingData]);

  const handleConfirm = () => {
    setLoading(true);

    const payload = {
      customer_name: bookingData.customer_name,
      phone_number: bookingData.phone_number,
      service: bookingData.service.id,
      barber: bookingData.barber.id,
      appointment_date: bookingData.date,
      appointment_time: bookingData.time,
    };

    axios
      .post('http://localhost:8000/api/appointments/', payload)
      .then(() => {
        setConfirmedData(bookingData);
        setStatus('success');
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
        setStatus('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ✅ SUCCESS
  if (status === 'success') {
    return (
      <div style={styles.container}>
        <img src="/logo-tochka.png" alt="Точка Barbershop" style={styles.logo} />
        <h2 style={styles.title}>✅ Запись подтверждена!</h2>
        <p style={styles.text}>Ждём вас <strong>{new Date(confirmedData?.date).toLocaleDateString('ru-RU')}</strong> в <strong>{confirmedData?.time}</strong></p>
        <p style={styles.text}>Барбер: <strong>{confirmedData?.barber?.name}</strong></p>
        <p style={styles.text}>Услуга: <strong>{confirmedData?.service?.name}</strong></p>
        <p style={styles.text}>Спасибо, <strong>{confirmedData?.customer_name}</strong>!</p>
      </div>
    );
  }

  // ⬜ DEFAULT CONFIRM PAGE
  return (
    <div style={styles.container}>
      <img src="/logo-tochka.png" alt="Точка Barbershop" style={styles.logo} />
      <h2 style={styles.title}>Подтвердите запись</h2>

      <ul style={styles.list}>
        <li><strong>Имя:</strong> {bookingData.customer_name}</li>
        <li><strong>Телефон:</strong> {bookingData.phone_number}</li>
        <li><strong>Услуга:</strong> {bookingData.service?.name}</li>
        <li><strong>Барбер:</strong> {bookingData.barber?.name}</li>
        <li><strong>Дата:</strong> {bookingData.date}</li>
        <li><strong>Время:</strong> {bookingData.time}</li>
      </ul>

      {status === 'error' && (
        <p style={styles.errorText}>❌ Не удалось записаться. Попробуйте позже.</p>
      )}

      <div style={styles.buttonWrapper}>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="modern-button"
          style={{
            width: '260px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'wait' : 'pointer',
          }}
        >
          {loading ? 'Отправка...' : 'Подтвердить'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #eef4ff 0%, #d6e4ff 100%)',
    fontFamily: "'Poppins', sans-serif",
  },
  logo: {
    width: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#002f8e',
    marginBottom: 20,
  },
  text: {
    fontSize: '16px',
    marginBottom: 8,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginTop: 20,
    fontSize: '17px',
    lineHeight: '1.8',
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
  },
  buttonWrapper: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default Confirmation;

