import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardUser() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-600 border border-yellow-200",
    approved: "bg-blue-100 text-blue-600 border border-blue-200",
    rejected: "bg-red-100 text-red-600 border border-red-200",
  };

  type PeminjamanItem = {
    id: number;
    namaPeminjam: string;
    status: "pending" | "approved" | "rejected";
    keperluan: string;
    lokasiPinjam: string;
    tglPinjam: string;
    jamPinjam: string;
    buildingId: number;
    room?: {
      id: number;
      nama: string;
      status: string;
      tipe: string;
      kapasitas: number;
    };
  };

  const [peminjaman, setPeminjaman] = useState<PeminjamanItem[]>([]);
  
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
        const token = localStorage.getItem("userToken");
        setLoading(true);
        const response = await fetch(
          "https://localhost:7252/api/Bookings?tanggal=${filterDate}",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 401) {
          alert("Sesi telah habis, silakan login kembali.");
          navigate("/userLogin");
          return;
        }
        const data = await response.json();

        const buildingNames: { [key: number]: string } = {
          1: "Gedung D4",
          2: "Gedung D3",
          3: "Gedung SAW",
          4: "Gedung Pascasarjana",
        };

        const formattedData = data.map((item: any) => {
          let formattedDate = "";
          if (item.tanggal) {
            formattedDate = item.tanggal.split(" ")[0];

            if (formattedDate.includes("T")) {
              formattedDate = formattedDate.split("T")[0];
            }
          }
          return {
            id: item.id,
            namaPeminjam: item.namaPeminjam,
            status: item.status,
            keperluan: item.keperluan,
            lokasiPinjam:
              buildingNames[item.buildingId] || `Gedung ${item.buildingId}`,
            tglPinjam: formattedDate,
            jamPinjam: `${item.jamMulai} - ${item.jamSelesai}`,
            buildingId: item.buildingId,
            room: item.room,
          };
        });

        setPeminjaman(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [selectedBooking, setSelectedBooking] = useState<PeminjamanItem | null>(
    null,
  );

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(
          `https://localhost:7252/api/Bookings/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          setPeminjaman((prev) => prev.filter((item) => item.id !== id));
          alert("Data berhasil dihapus dari database!");
        } else {
          alert("Gagal menghapus data di server.");
        }
      } catch (error) {
        console.error("Error saat menghapus:", error);
      }
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

          <div
            className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/buildingRoomsUser")}
          >
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-black">Daftar Gedung</a>
          </div>

          <div
            className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/historyPage")}
          >
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

        <div
          className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/buildingRoomsUser")}
        >
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-black">Daftar Gedung</a>
        </div>

        <div
          className="hover:bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/historyPage")}
        >
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
          <h1 className="text-3xl font-medium">Daftar Peminjaman Saya</h1>
          <a>Pantau status peminjamanmu di sini</a>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="h-9 rounded-lg border border-gray-300 px-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterDate}
                onChange={handleDateChange}
              />

              {filterDate && (
                <button
                  onClick={() => setFilterDate("")}
                  className="h-9 rounded-lg px-3 text-xs font-medium
                   text-rose-600 bg-rose-50 border border-rose-200
                   hover:bg-rose-100 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-5">
            {loading ? (
              <p>Memuat data...</p>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-5 flex flex-row justify-between"
                >
                  <div>
                    <div className="flex flex-row gap-4 items-center">
                      <a className="font-normal text-lg">{item.namaPeminjam}</a>
                      <div
                        className={`inline-flex items-center text-[12px] rounded-3xl w-auto px-3 py-1 ${statusStyles[item.status] || "bg-gray-100 text-gray-600"}`}
                      >
                        {item.status}
                      </div>
                    </div>
                    <a className="text-slate-500 text-[13px]">
                      {item.keperluan}
                    </a>
                    <div className="flex flex-row flex-wrap lg:gap-10 gap-4 py-2">
                      <div className="flex text-slate-700 gap-2">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <p className="text-sm">{item.lokasiPinjam}</p>
                      </div>
                      <div className="flex text-slate-700 gap-2">
                        <span className="material-symbols-outlined text-sm">
                          calendar_today
                        </span>
                        <p className="text-sm">{item.tglPinjam}</p>
                      </div>
                      <div className="flex text-slate-700 gap-2">
                        <span className="material-symbols-outlined text-sm">
                          clock_loader_40
                        </span>
                        <p className="text-sm">{item.jamPinjam}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5 mt-3">
                    <span
                      className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[20px]"
                      onClick={() => setSelectedBooking(item)}
                    >
                      info
                    </span>
                    <Link
                      className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[20px]"
                      to={`/editBooking/${item.id}`}
                    >
                      edit
                    </Link>
                    <span
                      className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[20px]"
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
                  <p className="text-slate-600">
                    Tidak ada jadwal untuk tanggal {filterDate}
                  </p>
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

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[90%] max-w-3xl rounded-xl shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedBooking(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-4">Detail Peminjaman</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Nama Peminjam</p>
                <p className="font-medium">{selectedBooking.namaPeminjam}</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs
            ${statusStyles[selectedBooking.status]}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500">Keperluan</p>
                <p>{selectedBooking.keperluan}</p>
              </div>

              <div>
                <p className="text-gray-500">Lokasi</p>
                <p>{selectedBooking.lokasiPinjam}</p>
              </div>

              <div>
                <p className="text-gray-500">Tanggal</p>
                <p>{selectedBooking.tglPinjam}</p>
              </div>

              <div>
                <p className="text-gray-500">Jam</p>
                <p>{selectedBooking.jamPinjam}</p>
              </div>

              {selectedBooking.room && (
                <div className="md:col-span-2 mt-4">
                  <p className="text-gray-500 mb-1 font-medium">
                    Detail Ruangan
                  </p>
                  <p className="flex gap-4 font-medium text-gray-700">
                    <span>{selectedBooking.room.nama}</span>
                    <span>Status: {selectedBooking.room.status}</span>
                    <span>Tipe: {selectedBooking.room.tipe}</span>
                    <span>Kapasitas: {selectedBooking.room.kapasitas}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => navigate(`/editBooking/${selectedBooking.id}`)}
                className="px-4 py-2 rounded-lg bg-[#547792] text-white text-sm hover:opacity-90"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
