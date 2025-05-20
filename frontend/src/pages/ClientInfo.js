
// import { useNavigate } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useBooking } from '../context/BookingContext';
// import React, { useState, useEffect } from 'react';


// const ClientInfo = () => {
//   const { bookingData, setBookingData } = useBooking();
//   const navigate = useNavigate();

//   const [customerName, setCustomerName] = useState(bookingData.customer_name || '');
//   const [phoneNumber, setPhoneNumber] = useState(bookingData.phone_number || '');

//    useEffect(() => {
//     if (!bookingData.barber || !bookingData.service || !bookingData.date || !bookingData.time) {
//       navigate('/');
//     }
//   }, [bookingData, navigate]);
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!customerName.trim() || !phoneNumber.trim()) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setBookingData({
//       ...bookingData,
//       customer_name: customerName.trim(),
//       phone_number: phoneNumber.trim()
//     });

//     navigate('/confirm');
//   };

//   return (
//     <div style={{ paddingTop: '40px', textAlign: 'center' }}>
//       <img src="/logo-tochka.png" alt="Точка Barbershop" style={{ width: 180 }} />
//       <h2 style={{ marginTop: '20px' }}>Enter Your Information</h2>

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           marginTop: '30px',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '20px'
//         }}
//       >
//         {/* Name Input */}
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           required
//           style={{
//             padding: '10px',
//             width: '300px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '4px'
//           }}
//         />

//         {/* Phone Input (wrapped for alignment) */}
//         <div style={{ width: '300px' }}>
//           <PhoneInput
//             country={'kg'}
//             value={phoneNumber}
//             onChange={setPhoneNumber}
//             inputStyle={{
//               width: '100%',
//               height: '42px',
//               fontSize: '16px'
//             }}
//             containerStyle={{
//               width: '100%'
//             }}
//             inputProps={{
//               name: 'phone',
//               required: true
//             }}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           style={{
//             backgroundColor: '#0047FF',
//             color: 'white',
//             padding: '12px 24px',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             fontSize: '16px'
//           }}
//         >
//           Continue
//         </button>
//       </form>
//     </div>
//   );
// };


// export default ClientInfo;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useBooking } from '../context/BookingContext';
import '../App.css';

const ClientInfo = () => {
  const { bookingData, setBookingData } = useBooking();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(bookingData.customer_name || '');
  const [phoneNumber, setPhoneNumber] = useState(bookingData.phone_number || '');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!bookingData.barber || !bookingData.service || !bookingData.date || !bookingData.time) {
      navigate('/');
    }

    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [bookingData, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phoneNumber.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setBookingData({
      ...bookingData,
      customer_name: customerName.trim(),
      phone_number: phoneNumber.trim()
    });

    navigate('/confirm');
  };

  return (
    <div style={styles.container}>
      <img src="/logo-tochka.png" alt="Точка Barbershop" style={styles.logo} />
      <h2 style={styles.title}>Введите ваши данные</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className={`animated-input ${animate ? 'visible' : ''}`}
          style={{
            ...styles.input,
            transitionDelay: '0.1s'
          }}
        />

        <div
          className={`animated-input ${animate ? 'visible' : ''}`}
          style={{
            transitionDelay: '0.2s',
            width: '100%',
            zIndex: 2
          }}
        >
          <PhoneInput
            country={'kg'}
            value={phoneNumber}
            onChange={setPhoneNumber}
            inputStyle={styles.phoneInput}
            containerStyle={{ width: '100%' }}
            buttonStyle={styles.flagButton}
            inputProps={{ name: 'phone', required: true }}
          />
        </div>

        <button
          type="submit"
          className={`animated-button ${animate ? 'visible' : ''}`}
          style={{
            transitionDelay: '0.3s',
            width: '100%',
            maxWidth: '260px',
            marginTop: '8px'
          }}
        >
          Продолжить
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #eef4ff 0%, #d6e4ff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: "'Poppins', sans-serif"
  },
  logo: {
    width: 180,
    marginBottom: 12
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: 30,
    color: '#002f8e'
  },
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  input: {
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none'
  },
  phoneInput: {
    width: '100%',
    height: '42px',
    fontSize: '16px',
    borderRadius: '8px'
  },
  flagButton: {
    borderRadius: '8px 0 0 8px'
  }
};

export default ClientInfo;
