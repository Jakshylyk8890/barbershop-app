// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const BookingEntry = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: 'center', paddingTop: '60px' }}>
//       <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180, marginBottom: 20 }} />
//       <h2 style={{ marginBottom: '40px', fontSize: '28px' }}>Начать бронирование</h2>

//       <div className="entry-button-group">
//         <button onClick={() => navigate('/barber')} className="modern-button">
//           👤 Выбрать специалиста
//         </button>
//         <button onClick={() => navigate('/time')} className="modern-button">
//           📅 Выбрать дату и время
//         </button>
//         <button onClick={() => navigate('/service')} className="modern-button">
//           🧾 Выбрать услугу
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingEntry;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const BookingEntry = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const buttons = [
    { text: '👤 Выбрать специалиста', to: '/barber' },
    { text: '📅 Выбрать дату и время', to: '/time' },
    { text: '🧾 Выбрать услугу', to: '/service' }
  ];

  return (
    <div style={styles.container}>
      <img src="/logo-tochka.png" alt="Точка Barbershop" style={styles.logo} />
      <h2 style={styles.title}>Начать бронирование</h2>

      <div style={styles.buttonGroup}>
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => navigate(btn.to)}
            className={`animated-button ${animate ? 'visible' : ''}`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '60px',
    fontFamily: "'Poppins', sans-serif",
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #eef4ff 0%, #d6e4ff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    marginBottom: 20,
  },
  title: {
    marginBottom: 40,
    fontSize: '28px',
    fontWeight: 600,
    color: '#002f8e',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
};

export default BookingEntry;
