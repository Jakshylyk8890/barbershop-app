// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useBooking } from '../context/BookingContext';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const BarberSelection = () => {
//   const [barbers, setBarbers] = useState([]);
//   const { bookingData, setBookingData } = useBooking();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:8000/api/barbers/')
//       .then(res => setBarbers(res.data))
//       .catch(err => console.error('Failed to load barbers', err));
//   }, []);

//   const handleSelect = (barber) => {
//     // Update booking data
//     setBookingData(prev => ({ ...prev, barber }));

//     // Defer navigation until after state update
//     setTimeout(() => {
//       const { service, date, time } = bookingData;
//       if (service && date && time) {
//         navigate('/info');
//       } else {
//         navigate('/time');
//       }
//     }, 0);
//   };

//   return (
//     <div className="fullscreen-center">
//       <img src="/logo-tochka.png" alt="Точка Barbershop" className="logo" />
//       <h2 style={{ marginBottom: '30px' }}>Выберите специалиста</h2>

//       <div className="entry-button-group">
//         {barbers.map(barber => (
//           <button
//             key={barber.id}
//             onClick={() => handleSelect(barber)}
//             className="modern-button"
//           >
//             {barber.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BarberSelection;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const BarberSelection = () => {
  const [barbers, setBarbers] = useState([]);
  const { bookingData, setBookingData } = useBooking();
  const [animate, setAnimate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/barbers/')
      .then(res => setBarbers(res.data))
      .catch(err => console.error('Failed to load barbers', err));

    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (barber) => {
    setSelectedId(barber.id);
    setBookingData(prev => ({ ...prev, barber }));

    setTimeout(() => {
      const { service, date, time } = bookingData;
      if (service && date && time) {
        navigate('/info');
      } else {
        navigate('/time');
      }
    }, 300);
  };

  return (
    <div className="barber-container">
      <img src="/logo-tochka.png" alt="Точка Barbershop" className="logo" />
      <h2 className="barber-title">Выберите специалиста</h2>

      <div className="barber-button-group">
        {barbers.map((barber, idx) => (
          <button
            key={barber.id}
            onClick={() => handleSelect(barber)}
            className={`animated-button ${animate ? 'visible' : ''} ${selectedId === barber.id ? 'selected' : ''}`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            {barber.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BarberSelection;
