import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard';
import BookingForm from './pages/BookingForm';
import BuildingRooms from './pages/BuildingRooms';
import EditBooking from './pages/EditBooking';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/BuildingRooms" element={<BuildingRooms />} />
        <Route path="/editBooking/:id" element={<EditBooking />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
