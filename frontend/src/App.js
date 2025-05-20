import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import './App.css';

import ServiceSelection from './pages/ServiceSelection';
import BarberSelection from './pages/BarberSelection';
import TimeSelection from './pages/TimeSelection';
import ClientInfo from './pages/ClientInfo';
import Confirmation from './pages/Confirmation';
import BookingEntry from './pages/BookingEntry';
import MyBookings from './pages/MyBookings';

<Route path="/booking" element={<BookingEntry />} />
function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<BookingEntry />} />
            <Route path="/barber" element={<BarberSelection />} />
            <Route path="/service" element={<ServiceSelection />} />
            <Route path="/time" element={<TimeSelection />} />
            <Route path="/info" element={<ClientInfo />} />
            <Route path="/confirm" element={<Confirmation />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
