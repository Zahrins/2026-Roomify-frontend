import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AdminLogin from "./pages/admin/adminLogin";
import AdminRegister from "./pages/admin/adminRegister";
import UserLogin from "./pages/user/userLogin";
import UserRegister from "./pages/user/userRegister";
import LandingPage from "./pages/LandingPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardUser from "./pages/user/DashboardUser";
import BookingForm from "./pages/user/BookingForm";
import BuildingRooms from "./pages/admin/BuildingRooms";
import BuildingRoomsUser from "./pages/user/BuildingRoomsUser";
import EditBooking from "./pages/user/EditBooking";
import EditStatus from "./pages/admin/EditStatus";
import HistoryPage from "./pages/admin/HistoryPage";

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/adminLogin" element={<AdminLogin setUser={setUser} />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/BuildingRoomsUser" element={<BuildingRoomsUser />} />
        <Route path="/HistoryPage" element={<HistoryPage />} />
        <Route path="/editStatus/:id" element={<EditStatus />} />

        <Route path="/userLogin" element={<UserLogin setUser={setUser} />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/DashboardUser" element={<DashboardUser />} />
        <Route path="/BookingForm" element={<BookingForm />} />
        <Route path="/BuildingRooms" element={<BuildingRooms />} />
        <Route path="/editBooking/:id" element={<EditBooking />} />

        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

export default App;
