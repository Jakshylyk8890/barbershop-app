// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from 'axios';
// import { useBooking } from '../context/BookingContext';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const TimeSelection = () => {
//   const { bookingData, setBookingData } = useBooking();
//   const navigate = useNavigate();

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   // Format dates
//   const backendDate = selectedDate.toLocaleDateString('sv-SE'); // YYYY-MM-DD
//   const displayDate = `${String(selectedDate.getDate()).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`; // dd-mm-yyyy

//   useEffect(() => {
//     const params = { date: backendDate };
//     if (bookingData.barber?.id) params.barber_id = bookingData.barber.id;
//     if (bookingData.service?.id) params.service_id = bookingData.service.id;

//     axios.get('http://localhost:8000/api/timeslots/', { params })
//       .then(res => {
//         const data = res.data;
//         if (Array.isArray(data)) {
//           setTimeSlots(data);
//           setBookedSlots([]);
//         } else {
//           setTimeSlots(data.available || []);
//           setBookedSlots(data.booked || []);
//         }
//       })
//       .catch(err => {
//         console.error('Ошибка при получении слотов:', err);
//         setTimeSlots([]);
//         setBookedSlots([]);
//       });
//   }, [backendDate, bookingData.barber, bookingData.service]);

//   const handleTimeSelect = (time) => {
//     const updated = {
//       ...bookingData,
//       date: backendDate,
//       time
//     };

//     setBookingData(updated);

//     if (updated.service && updated.barber) {
//       navigate('/info');
//     } else if (!updated.service) {
//       navigate('/service');
//     } else {
//       navigate('/barber');
//     }
//   };

//   const groupByPeriod = (slots) => ({
//     morning: slots.filter(t => t < '12:00'),
//     afternoon: slots.filter(t => t >= '12:00' && t < '17:00'),
//     evening: slots.filter(t => t >= '17:00')
//   });

//   const allSlots = [...new Set([...timeSlots, ...bookedSlots])].sort();
//   const { morning, afternoon, evening } = groupByPeriod(allSlots);

//   const renderSlotButtons = (slots) =>
//     slots.map(time => {
//       const isBooked = bookedSlots.includes(time);
//       return (
//         <button
//           key={time}
//           onClick={() => !isBooked && handleTimeSelect(time)}
//           className={`time-slot ${isBooked ? 'booked' : ''}`}
//           disabled={isBooked}
//         >
//           {time}
//         </button>
//       );
//     });

//   return (
//     <div style={{ padding: '20px' }}>
//       <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180 }} />
//       <h2>Выберите дату и время</h2>

//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px' }}>
//         <Calendar
//           onChange={setSelectedDate}
//           value={selectedDate}
//           calendarType="iso8601"
//           locale="ru-RU"
//         />

//         <div>
//           <h3>Свободное время на {displayDate}</h3>

//           {allSlots.length === 0 ? (
//             <p style={{ fontStyle: 'italic' }}>Нет свободных слотов</p>
//           ) : (
//             <>
//               {morning.length > 0 && <><h4>Утро</h4>{renderSlotButtons(morning)}</>}
//               {afternoon.length > 0 && <><h4>День</h4>{renderSlotButtons(afternoon)}</>}
//               {evening.length > 0 && <><h4>Вечер</h4>{renderSlotButtons(evening)}</>}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeSelection;





















// File: src/pages/TimeSelection.js

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const TimeSelection = () => {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const backendDate = selectedDate.toLocaleDateString('sv-SE');
  const displayDate = `${String(selectedDate.getDate()).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`;

  useEffect(() => {
    const params = { date: backendDate };
    if (bookingData.barber?.id) params.barber_id = bookingData.barber.id;
    if (bookingData.service?.id) params.service_id = bookingData.service.id;

    axios.get('http://localhost:8000/api/timeslots/', { params })
      .then(res => {
        const data = res.data;
        setTimeSlots(data.available || []);
        setBookedSlots(data.booked || []);
      })
      .catch(err => {
        console.error('Ошибка при получении слотов:', err);
        setTimeSlots([]);
        setBookedSlots([]);
      });
  }, [backendDate, bookingData.barber, bookingData.service]);

  const handleTimeSelect = (time) => {
    const updated = { ...bookingData, date: backendDate, time };
    setBookingData(updated);

    if (updated.service && updated.barber) {
      navigate('/info');
    } else if (!updated.service) {
      navigate('/service');
    } else {
      navigate('/barber');
    }
  };

  const groupByPeriod = (slots) => ({
    morning: slots.filter(t => t < '12:00'),
    afternoon: slots.filter(t => t >= '12:00' && t < '17:00'),
    evening: slots.filter(t => t >= '17:00')
  });

  const allSlots = [...new Set([...timeSlots, ...bookedSlots])].sort();
  const { morning, afternoon, evening } = groupByPeriod(allSlots);

  const renderSlotButtons = (slots) =>
    slots.map(time => {
      const isBooked = bookedSlots.includes(time);
      return (
        <button
          key={time}
          onClick={() => !isBooked && handleTimeSelect(time)}
          className={`time-slot ${isBooked ? 'booked' : ''}`}
          disabled={isBooked}
        >
          {time}
        </button>
      );
    });

  return (
    <div className="time-container">
      <img src="/logo-tochka.png" alt="Точка Barbershop" className="logo" />
      <h2 className="barber-title">Выберите дату и время</h2>

      <div className="time-layout">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          calendarType="iso8601"
          locale="ru-RU"
          className="modern-calendar"
        />

        <div className="time-slots">
          <h3>Свободное время на {displayDate}</h3>

          {allSlots.length === 0 ? (
            <p className="no-slots">Нет свободных слотов</p>
          ) : (
            <>
              {morning.length > 0 && <><h4>Утро</h4>{renderSlotButtons(morning)}</>}
              {afternoon.length > 0 && <><h4>День</h4>{renderSlotButtons(afternoon)}</>}
              {evening.length > 0 && <><h4>Вечер</h4>{renderSlotButtons(evening)}</>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSelection;
