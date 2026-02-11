import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function History() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex lg:flex-row flex-col">
      <div className="lg:hidden md:hidden">
        <div className="flex items-center bg-white border-b border-b-1 border-b-[#547792] text-black p-4 md:hidden">
          <button onClick={() => setOpen(true)}>☰</button>
          <h3 className="font-bold text-xl ml-5">Roomify</h3>
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`flex flex-col fixed top-0 left-0 h-full w-64 bg-slate-100 p-4 z-50 transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8">
            <h3 className="font-bold text-2xl mb-2">Roomify</h3>
            <p className="text-sm">Campus Room Reservation System</p>
          </div>

          <div
            className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/historyPage")}
          >
            <span className="material-symbols-outlined">space_dashboard</span>
            <a className="text-black">Dashboard</a>
          </div>

          <div
            className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/buildingRooms")}
          >
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-black">Daftar Gedung</a>
          </div>

          <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">history</span>
            <a className="text-white">Riwayat</a>
          </div>
          <button
            onClick={() => navigate("/bookingForm")}
            className="mt-auto mb-5 flex justify-center items-center bg-[#547792] p-2 gap-2 rounded-lg cursor-pointer text-white hover:opacity-90 transition"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-[15px]">Tambah peminjaman</span>
          </button>

          <button
            className="absolute top-4 right-4 text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="hidden lg:flex flex-col fixed top-0 left-0 w-[300px] bg-slate-100 p-4 h-screen">
        <div className="mb-8">
          <h3 className="font-bold text-[30px] mb-3">Roomify</h3>
          <a>Campus Room Reservation System</a>
        </div>

        <div
          className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/dashboard")}
        >
          <span className="material-symbols-outlined">space_dashboard</span>
          <a className="text-black">Dashboard</a>
        </div>

        <div
          className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/buildingRooms")}
        >
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-black">Daftar Gedung</a>
        </div>

        <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">history</span>
          <a className="text-white">Riwayat</a>
        </div>
        <button
          onClick={() => navigate("/BookingForm")}
          className="mt-auto flex justify-center items-center gap-2 bg-[#547792] p-4 rounded-lg cursor-pointer text-white hover:opacity-90 transition"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Tambah peminjaman</span>
        </button>
      </div>

      <div className="flex-1 p-5 lg:p-8 lg:ml-[300px] overflow-y-auto h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-medium">Riwayat Peminjaman</h1>
          <a>Pantau dan kelola data peminjaman</a>
        </div>
      </div>
    </div>
  );
}
