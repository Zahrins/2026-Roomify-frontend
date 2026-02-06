import { useState } from "react";
import '../index.css';

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex lg:flex-row flex-col">
      
      <div className="lg:hidden md:hidden">
        <div className="flex items-center bg-[#061E29] text-white p-4 md:hidden">
          <button onClick={() => setOpen(true)}>
            ☰
          </button>
          <h3 className="font-bold text-xl ml-5">Roomify</h3>
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#061E29] text-white p-4 z-50 transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8">
            <h3 className="font-bold text-2xl mb-2">Roomify</h3>
            <p className="text-sm">Campus Room Reservation System</p>
          </div>

          <div className="bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">space_dashboard</span>
          <a className="text-white">Dashboard</a>
        </div>

        <div className="hover:bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-white">Daftar Gedung</a>
        </div>

        <div className="hover:bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">history</span>
          <a className="text-white">Riwayat</a>
        </div>

          <button
            className="absolute top-4 right-4 text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="hidden lg:block w-[380px] bg-[#061E29] text-white p-4 max-h-screen">
        <div className="mb-8">
          <h3 className="font-bold text-[30px] mb-3">Roomify</h3>
          <a>Campus Room Reservation System</a>
        </div>

        <div className="bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">space_dashboard</span>
          <a className="text-white">Dashboard</a>
        </div>

        <div className="hover:bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-white">Daftar Gedung</a>
        </div>

        <div className="hover:bg-[#1D546D] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">history</span>
          <a className="text-white">Riwayat</a>
        </div>
        <button
          onClick={() => navigate('/PinjamForm')}
          className="flex justify-center items-center gap-2 bg-[#1D546D] p-4 rounded-lg cursor-pointer text-white hover:opacity-90 transition"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Tambah peminjaman</span>
        </button>
      </div>

      <div className="p-5 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <a>Pantau dan kelola peminjaman ruangan kampus</a>
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#FFF6D8]">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined">clock_loader_40</span>
              <a className="font-semibold">Peminjaman Baru</a>
              <p className="text-sm text-slate-600">Menunggu persetujuan</p>
            </div>
            <div className="text-[30px] font-bold">
              2
            </div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#DDEFE0]">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              <a className="font-semibold">Ruang Terpakai</a>
              <p className="text-sm text-slate-600">Hari ini</p>
            </div>
            <div className="text-[30px] font-bold">
              2
            </div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#F8DDE0]">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined">error</span>
              <a className="font-semibold">Jadwal Bentrok</a>
              <p className="text-sm text-slate-600">Perlu ditangani</p>
            </div>
            <div className="text-[30px] font-bold">
              2
            </div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#D8E8F8]">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined">docs</span>
              <a className="font-semibold">Total Peminjaman</a>
              <p className="text-sm text-slate-600">keseluruhan</p>
            </div>
            <div className="text-[30px] font-bold">
              2
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 mt-5">Jadwal Peminjaman</h2>
        </div>

      </div>
    </div>
  );
}
