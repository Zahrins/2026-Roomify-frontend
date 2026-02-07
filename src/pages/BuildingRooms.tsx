import "../index.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BuildingRooms() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    tanggal: "",
    tipe: "All",
  });
  const [stats, setStats] = useState({
    ruangKosong: 0,
    ruangTerpakai: 0,
  });

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
            onClick={() => navigate("/dashboard")}
          >
            <span className="material-symbols-outlined">space_dashboard</span>
            <a className="text-black">Dashboard</a>
          </div>

          <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-white">Daftar Gedung</a>
          </div>

          <div className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">history</span>
            <a className="text-black">Riwayat</a>
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

        <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-white">Daftar Gedung</a>
        </div>

        <div className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">history</span>
          <a className="text-black">Riwayat</a>
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
        <div className="mb-4">
          <h1 className="text-3xl font-medium">Daftar Gedung</h1>
          <a>Lihat ketersediaan ruangan di setiap gedung</a>
        </div>

        <div className="p-6 space-y-6 min-h-screen w-full">
          <input
            type="date"
            value={filters.tanggal}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                tanggal: e.target.value,
              }))
            }
            className="h-9 rounded-lg border text-sm border-gray-300 px-2"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="material-symbols-outlined">filter_alt</span>
            {["All", "Kelas", "Lab", "Theater", "Auditorium"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    tipe: item,
                  }))
                }
                className={`px-4 py-2 rounded-xl border text-sm
                  ${
                    filters.tipe === item
                      ? "bg-[#547792] text-white hover:bg-[#435d70]"
                      : "bg-white text-gray-700 hover:bg-slate-300"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-xl">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Gedung D3</h2>
                  <p className="text-sm text-gray-500">Area Utara</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-green-50 text-green-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{stats.ruangKosong}</p>
                  <p className="text-sm">Ruang Kosong</p>
                </div>
                <div className="flex-1 bg-red-50 text-red-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{stats.ruangTerpakai}</p>
                  <p className="text-sm">Ruang Terpakai</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 cursor-pointer relative">
                  <span className="lg:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <div className="flex items-center gap-2">
                    <span className="hidden lg:inline-block w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <p className="font-semibold text-sm mt-2 lg:mt-0">R. 101</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 lg:mt-0">
                    Kelas • 40 org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-xl">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Gedung D4</h2>
                  <p className="text-sm text-gray-500">Area Timur</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-green-50 text-green-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm">Ruang Kosong</p>
                </div>
                <div className="flex-1 bg-red-50 text-red-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm">Ruang Terpakai</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 cursor-pointer relative">
                  <span className="lg:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <div className="flex items-center gap-2">
                    <span className="hidden lg:inline-block w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <p className="font-semibold text-sm mt-2 lg:mt-0">R. 101</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 lg:mt-0">
                    Kelas • 40 org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-xl">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Gedung SAW</h2>
                  <p className="text-sm text-gray-500">Area Timur</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-green-50 text-green-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm">Ruang Kosong</p>
                </div>
                <div className="flex-1 bg-red-50 text-red-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm">Ruang Terpakai</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 cursor-pointer relative">
                  <span className="lg:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <div className="flex items-center gap-2">
                    <span className="hidden lg:inline-block w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <p className="font-semibold text-sm mt-2 lg:mt-0">R. 101</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 lg:mt-0">
                    Kelas • 40 org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-xl">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Gedung Pasca</h2>
                  <p className="text-sm text-gray-500">Area Timur</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex-1 bg-green-50 text-green-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm">Ruang Kosong</p>
                </div>
                <div className="flex-1 bg-red-50 text-red-600 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm">Ruang Terpakai</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 cursor-pointer relative">
                  <span className="lg:hidden absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <div className="flex items-center gap-2">
                    <span className="hidden lg:inline-block w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <p className="font-semibold text-sm mt-2 lg:mt-0">R. 101</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 lg:mt-0">
                    Kelas • 40 org
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
