import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Room {
  status: string;
  nama: string;
  tipe: string;
  kapasitas: number;
}

interface Building {
  nama: string;
  rooms: Room[];
}

export default function BuildingRooms() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    tanggal: new Date().toISOString().split("T")[0], 
    tipe: "All",
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const filteredBuildings = buildings
    .map((b) => ({
      ...b,
      rooms:
        filters.tipe === "All"
          ? b.rooms
          : b.rooms.filter((r) => r.tipe === filters.tipe),
    }))
    .filter((b) => b.rooms.length > 0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const url = `https://localhost:7252/api/Buildings?tanggal=${filters.tanggal}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Sesi habis, silakan login kembali.");
        }
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => {
        setBuildings(data);
      })
      .catch((err) => {
        console.error("Error Fetching:", err);
      });
  }, [filters.tanggal]);

  const getStats = (rooms: Room[] = []) => {
    const ruangKosong = rooms.filter((r) => r.status === "kosong").length;
    const ruangTerpakai = rooms.filter((r) => r.status === "terpakai").length;

    return { ruangKosong, ruangTerpakai };
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
            <a className="text-black">Dashboard</a>
          </div>

          <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
            <span className="material-symbols-outlined">apartment</span>
            <a className="text-white">Daftar Gedung</a>
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

        <div className="bg-[#547792] p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black">
          <span className="material-symbols-outlined">apartment</span>
          <a className="text-white">Daftar Gedung</a>
        </div>

        <div
          className="hover:bg-[#547792] transition-colors duration-300 p-4 mb-5 rounded-lg flex gap-4 items-center cursor-pointer text-black"
          onClick={() => navigate("/historyPage")}
        >
          <span className="material-symbols-outlined">history</span>
          <a className="text-black">Riwayat</a>
        </div>
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
            {["All", "Kelas", "Laboratorium", "Theater", "Auditorium"].map(
              (item) => (
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
                      ? "bg-[#547792] text-white hover:bg-[#435d70] transition-colors duration-300"
                      : "bg-white text-gray-700 hover:bg-slate-300 transition-colors duration-300"
                  }
                `}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredBuildings.map((gedung) => {
              const { ruangKosong, ruangTerpakai } = getStats(gedung.rooms);

              return (
                <div className="bg-white border border-slate-200 transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-1 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-xl">
                      <span className="material-symbols-outlined">domain</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{gedung.nama}</h2>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <div className="flex-1 bg-green-50 text-green-600 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold">{ruangKosong}</p>
                      <p className="text-sm">Ruang Kosong</p>
                    </div>
                    <div className="flex-1 bg-red-50 text-red-600 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold">{ruangTerpakai}</p>
                      <p className="text-sm">Ruang Terpakai</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 overflow-y-auto pr-2">
                    {gedung.rooms.map((room, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-xl py-3 px-1 hover:bg-gray-100 transition-colors duration-300 cursor-pointer relative"
                      >
                        <span
                          className={`lg:hidden absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${room.status === "kosong" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <div className="flex items-center gap-2">
                          <span
                            className={`hidden lg:inline-block w-2.5 h-2.5 rounded-full ${room.status === "kosong" ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <p className="font-semibold text-sm mt-2 lg:mt-0">
                            {room.nama}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 lg:mt-0">
                          {room.tipe} • {room.kapasitas} org
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
