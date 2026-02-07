import '../index.css';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const statusStyles = {
    'pending': 'bg-yellow-300 text-yellow-600 border border-yellow-600',
    'approved': 'bg-blue-300 text-blue-600 border border-blue-600',
    'in use': 'bg-yellow-300 text-yellow-600 border border-yellow-600',
    'rejected': 'bg-red-300 text-red-600 border border-red-600',
    'completed': 'bg-green-300 text-green-600 border border-green-600'
  }
  
  type PeminjamanItem = {
    id: number;
    namaPeminjam: string;
    status: 'pending' | 'approved' | 'in use' | 'rejected' | 'completed';
    keperluan: string;
    lokasiPinjam: string;
    tglPinjam: string;
    jamPinjam: string;
    kapasitasRuang: number;
  };
  const [peminjaman, setPeminjaman] = useState<PeminjamanItem[]>([]);
  const [stats, setStats] = useState({
    peminjamanBaru: 0,
    ruangTerpakai: 0,
    jadwalBentrok: 0,
    totalPeminjaman: 0
  });
  const [filterDate, setFilterDate] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };
  const filteredItems = peminjaman.filter((item) => {
  if (!filterDate) return true;

  return item.tglPinjam === filterDate;
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/dashboard');
        const data = await response.json();
        
        setStats(data.summary);
        setPeminjaman(data.items);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const updatedData = peminjaman.filter(item => item.id !== id);
      setPeminjaman(updatedData);
      alert("Data berhasil dihapus!");
    }
  };

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

          <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">space_dashboard</span>
            <a className="text-white">Dashboard</a>
          </div>

          <div className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-black">Daftar Gedung</a>
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

        <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">space_dashboard</span>
          <a className="text-white">Dashboard</a>
        </div>

        <div className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-black">Daftar Gedung</a>
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
        <div className="mb-8">
          <h1 className="text-3xl font-medium">Dashboard</h1>
          <a>Pantau dan kelola peminjaman ruangan kampus</a>
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#FFF6D8] border border-yellow-400">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-yellow-500">
                clock_loader_40
              </span>
              <a className="font-semibold">Peminjaman Baru</a>
              <p className="text-sm text-slate-600">Menunggu persetujuan</p>
            </div>
            <div className="text-[30px] font-semibold">{stats.peminjamanBaru}</div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#DDEFE0] border border-green-400">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-green-500">
                check_circle
              </span>
              <a className="font-semibold">Ruang Terpakai</a>
              <p className="text-sm text-slate-600">Hari ini</p>
            </div>
            <div className="text-[30px] font-semibold">{stats.ruangTerpakai}</div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#F8DDE0] border border-red-400">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-red-500">
                error
              </span>
              <a className="font-semibold">Jadwal Bentrok</a>
              <p className="text-sm text-slate-600">Perlu ditangani</p>
            </div>
            <div className="text-[30px] font-semibold">{stats.jadwalBentrok}</div>
          </div>
          <div className="flex justify-between p-6 rounded-lg w-80 bg-[#D8E8F8] border border-blue-400">
            <div className="flex flex-col gap-2">
              <span className="material-symbols-outlined text-blue-500">
                docs
              </span>
              <a className="font-semibold">Total Peminjaman</a>
              <p className="text-sm text-slate-600">keseluruhan</p>
            </div>
            <div className="text-[30px] font-semibold">{stats.totalPeminjaman}</div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h6 className="text-xl font-semibold mb-4 mt-5">
              Jadwal Peminjaman
            </h6>
            <input
              type="date"
              className="h-9 rounded-lg border text-sm border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterDate}
              onChange={handleDateChange}
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="text-xs text-red-500 ml-2 bg-rose-400 rounded-lg p-1"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="mt-3 gap-4">
            {loading ? (
              <p>Memuat data...</p>
            ) : peminjaman.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-600 rounded-lg p-5"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <a className="font-medium text-lg">{item.namaPeminjam}</a>
                    <div
                      className={`rounded-lg w-auto px-3 py-0 ${statusStyles[item.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {item.status}
                    </div>
                  </div>
                  <a className="text-slate-500">{item.keperluan}</a>
                  <div className="flex flex-row flex-wrap lg:gap-10 gap-4 border-b border-b-slate-300 py-4">
                    <div className="flex text-slate-700 gap-2">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                      <p>{item.lokasiPinjam}</p>
                    </div>
                    <div className="flex text-slate-700 gap-2">
                      <span className="material-symbols-outlined">
                        calendar_today
                      </span>
                      <p>{item.tglPinjam}</p>
                    </div>
                    <div className="flex text-slate-700 gap-2">
                      <span className="material-symbols-outlined">
                        clock_loader_40
                      </span>
                      <p>{item.jamPinjam}</p>
                    </div>
                    <div className="flex text-slate-700 gap-2">
                      <span className="material-symbols-outlined">groups</span>
                      <p>Kapasitas: {item.kapasitasRuang}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 mt-3">
                    <span
                      className="material-symbols-outlined text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => navigate(`/detailPinjam/${item.id}`)}
                    >
                      info
                    </span>
                    <span
                      className="material-symbols-outlined text-yellow-500 cursor-pointer hover:text-yellow-700"
                      onClick={() => navigate(`/editPinjam/${item.id}`)}
                    >
                      edit
                    </span>
                    <span
                      className="material-symbols-outlined text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex flex-col justify-center items-center mt-4 space-y-4">
                  <span
                    className="material-symbols-outlined text-slate-700"
                    style={{ fontSize: "60px" }}
                  >
                    folder_open
                  </span>
                  <p className='text-slate-600'>Tidak ada jadwal untuk tanggal {filterDate}</p>
                  <button
                    onClick={() => setFilterDate("")}
                    className="text-blue-500 underline text-sm"
                  >
                    Lihat semua jadwal
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
