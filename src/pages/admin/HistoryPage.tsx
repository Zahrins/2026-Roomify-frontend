import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-600 border border-yellow-200",
    Disetujui: "bg-green-100 text-green-600 border border-green-200",
    Ditolak: "bg-red-100 text-red-600 border border-red-200",
  };

  type PeminjamanItem = {
    id: number;
    namaPeminjam: string;
    noKontak: string;
    status: "Pending" | "Disetujui" | "Ditolak";
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
  
  const [searchQuery, setSearchQuery] = useState("");

  const [filterStatus, setFilterStatus] = useState<
    "Total" | "Pending" | "Disetujui" | "Ditolak"
  >("Total");

  const [filterDate, setFilterDate] = useState("");
  const filteredItems = peminjaman.filter((item) => {
    const matchSearch = item.namaPeminjam
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchDate = filterDate ? item.tglPinjam === filterDate : true;

    const matchStatus =
      filterStatus === "Total" ? true : item.status === filterStatus;

    return matchSearch && matchDate && matchStatus;
  });
  
  const countTotal = peminjaman.length;
  const countPending = peminjaman.filter((i) => i.status === "Pending").length;
  const countDisetujui = peminjaman.filter(
    (i) => i.status === "Disetujui",
  ).length;
  const countDitolak = peminjaman.filter((i) => i.status === "Ditolak").length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
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
            noKontak: item.noKontak,
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
          className={`flex flex-col fixed top-0 left-0 h-full w-64 bg-white p-4 z-50 transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8">
            <h3 className="font-bold text-2xl mb-2">Roomify</h3>
            <p className="text-sm">Campus Room Reservation System</p>
          </div>

          <div
            className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/dashboardAdmin")}
          >
            <span className="material-symbols-outlined">space_dashboard</span>
            <a className="text-white">Dashboard</a>
          </div>

          <div
            className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/buildingRooms")}
          >
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-black">Daftar Gedung</a>
          </div>

          <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-black">Riwayat</a>
          </div>

          <div
            className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
            onClick={() => navigate("/historyPage")}
          >
            <span className="material-symbols-outlined">history</span>
            <a className="text-black">Riwayat</a>
          </div>

          <button
            className="absolute top-4 right-4 text-xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="hidden lg:flex flex-col fixed top-0 left-0 w-[300px] bg-white border-r border-r-slate-200 p-4 h-screen">
        <div className="mb-8">
          <h3 className="font-bold text-[25px] mb-3">Roomify</h3>
          <a>Campus Room Reservation System</a>
        </div>

        <div
          className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/dashboardAdmin")}
        >
          <span className="material-symbols-outlined">space_dashboard</span>
          <a className="text-black">Dashboard</a>
        </div>

        <div
          className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/buildingRooms")}
        >
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-black">Daftar Gedung</a>
        </div>

        <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">history</span>
          <a className="text-white">Riwayat</a>
        </div>
      </div>

      <div className="flex-1 p-5 lg:p-8 lg:ml-[300px] overflow-y-auto h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-medium">Riwayat Peminjaman</h1>
          <a>Lihat dan pantau seluruh proses pengajuan user.</a>
        </div>

        <div className="mt-10">
          <input
            type="text"
            placeholder="Filter peminjam berdasarkan nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
          />

          <div className="flex justify-between mb-5">
            <div className="flex gap-3 flex-row items-center">
              <div
                onClick={() => setFilterStatus("Total")}
                className="flex flex-row items-center gap-3 px-3 py-2 rounded-3xl border border-blue-200 bg-blue-100 hover:bg-blue-200 transition-colors duration-300 cursor-pointer text-blue-600"
              >
                <a className="font-medium">{countTotal}</a>
                <a className="text-sm">Total</a>
              </div>
              <div
                onClick={() => setFilterStatus("Pending")}
                className="flex flex-row items-center gap-3 px-3 py-2 rounded-3xl border border-yellow-200 bg-yellow-100 hover:bg-yellow-200 transition-colors duration-300 cursor-pointer text-yellow-600"
              >
                <a className="font-medium">{countPending}</a>
                <a className="text-sm">Pending</a>
              </div>
              <div
                onClick={() => setFilterStatus("Disetujui")}
                className="flex flex-row items-center gap-3 px-3 py-2 rounded-3xl border border-green-200 bg-green-100 hover:bg-green-200 transition-colors duration-300 cursor-pointer text-green-600"
              >
                <a className="font-medium">{countDisetujui}</a>
                <a className="text-sm">Disetujui</a>
              </div>
              <div
                onClick={() => setFilterStatus("Ditolak")}
                className="flex flex-row items-center gap-3 px-3 py-2 rounded-3xl border border-red-200 bg-red-100 hover:bg-red-200 transition-colors duration-300 cursor-pointer text-red-600"
              >
                <a className="font-medium">{countDitolak}</a>
                <a className="text-sm">Ditolak</a>
              </div>
            </div>
            <div>
              <input
                type="date"
                className="h-9 rounded-lg border border-gray-300 px-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
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

          {filteredItems.length === 0 ? (
            <div className="flex justify-center items-center text-center p-4 text-gray-500 font-semibold border-slate-900">
              Tidak ada hasil
            </div>
          ) : (
            <ul className="list-none p-0 space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-300 border border-slate-200 rounded-lg p-5 flex flex-row justify-between"
                >
                  <div className="w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                      <div className="flex flex-col mb-3 lg:border-none border-b border-b-slate-300">
                        <div className="flex flex-row gap-4">
                          <a className="font-normal text-lg">
                            {item.namaPeminjam}
                          </a>
                          <div
                            className={`inline-flex items-center text-[12px] rounded-3xl w-auto px-3 ${statusStyles[item.status] || "bg-gray-100 text-gray-600"}`}
                          >
                            {item.status}
                          </div>
                        </div>
                        <a className="text-slate-500 text-[13px] mb-2">
                          {item.keperluan}
                        </a>
                      </div>
                      <div className="flex gap-3 lg:mt-0 lg:ml-auto mr-0">
                        <span
                          className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[17px]"
                          onClick={() => setSelectedBooking(item)}
                        >
                          info
                        </span>
                        <Link
                          className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[17px]"
                          to={`/editStatus/${item.id}`}
                        >
                          edit
                        </Link>
                        <span
                          className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-slate-700 text-[17px]"
                          onClick={() => handleDelete(item.id)}
                        >
                          delete
                        </span>
                      </div>
                    </div>
                    <div className="hidden lg:flex flex-row flex-wrap lg:gap-10 gap-6 py-2">
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
                </div>
              ))}
            </ul>
          )}
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
                <p className="text-gray-500">No Kontak</p>
                <p className="font-medium">{selectedBooking.noKontak}</p>
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
                <div className="md:col-span-2 mt-2">
                  <p className="text-gray-500 mb-2 font-medium">
                    Detail Ruangan
                  </p>
                  <p className="flex flex-row flex-wrap lg:gap-12 gap-3 font-medium text-gray-500">
                    <span className="text-gray-700">
                      {selectedBooking.room.nama}
                    </span>
                    <span>
                      Status:{" "}
                      <span className="text-gray-700">
                        {selectedBooking.room.status}
                      </span>
                    </span>
                    <span>
                      Tipe:{" "}
                      <span className="text-gray-700">
                        {selectedBooking.room.tipe}
                      </span>
                    </span>
                    <span>
                      Kapasitas:{" "}
                      <span className="text-gray-700">
                        {selectedBooking.room.kapasitas}
                      </span>
                    </span>
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
