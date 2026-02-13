import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditBooking() {
  const { id } = useParams(); 
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [noKontak, setNoKontak] = useState("");
  const [tanggal, setTanggal] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [keperluan, setKeperluan] = useState("");

  const [buildings, setBuildings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  useEffect(() => {
    if (!id) return;

    async function loadBooking() {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch(`https://localhost:7252/api/Bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!res.ok) throw new Error("Gagal mengambil data booking");

        const data = await res.json();

        setNamaPeminjam(data.namaPeminjam);
        setNoKontak(data.noKontak);
        setTanggal(data.tanggal.split("T")[0]);
        setJamMulai(data.jamMulai);
        setJamSelesai(data.jamSelesai);
        setKeperluan(data.keperluan);

        setSelectedBuilding(String(data.buildingId));
        setSelectedRoom(String(data.roomId));
      } catch (err) {
        console.error(err);
      }
    }

    loadBooking();
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadBuildings() {
      try {
        const res = await fetch(
          `https://localhost:7252/api/buildings?tanggal=${tanggal}`,
          {
            signal: controller.signal,
          },
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const normalized = data.map((b: any) => ({
          id: b.id ?? b.Id,
          nama: b.nama ?? b.Nama,
          rooms: (b.rooms ?? b.Rooms ?? []).map((r: any) => ({
            id: r.id ?? r.Id,
            nama: r.nama ?? r.Nama,
          })),
        }));
        setBuildings(normalized);

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Gagal memuat gedung:", err);
        }
      }
    }
    loadBuildings();
    return () => controller.abort();
  }, [tanggal]);

  useEffect(() => {
    const currentBuilding = buildings.find(
      (b) => String(b.id) === String(selectedBuilding),
    );
    if (currentBuilding) {
      setRooms(currentBuilding.rooms);
    } else {
      setRooms([]);
    }
  }, [selectedBuilding, buildings]);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `https://localhost:7252/api/Bookings/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            namaPeminjam,
            noKontak,
            tanggal,
            jamMulai,
            jamSelesai,
            keperluan,
            buildingId: parseInt(selectedBuilding),
            roomId: parseInt(selectedRoom),
          }),
        },
      );
      const responseData = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/dashboardUser");
          setLoading(false);
        }, 3000);
      } else {
        setError(responseData.message || "Sign up failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6">
        {isSuccess && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
            <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
              <span className="material-symbols-outlined text-green-600">
                check_circle
              </span>
              <a>Sign up successful!</a>
            </div>
          </div>
        )}
        {loading && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
            <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
              <span className="material-symbols-outlined text-yellow-600">
                hourglass_bottom
              </span>
              <a>Signing in...</a>
            </div>
          </div>
        )}
        {error && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto">
            <div className="flex justify-center items-center bg-white rounded-3xl border border-black text-black px-4 py-2">
              <span className="material-symbols-outlined text-red-600">
                error
              </span>
              <a>{error}</a>
            </div>
          </div>
        )}
        <div className="mb-10">
          <h3 className="font-semibold text-[25px]">Edit Peminjaman Ruangan Baru</h3>
          <a className="mt-2 text-slate-600">
            Isi formulir di bawah untuk mengajukan peminjaman ruangan
          </a>
        </div>

        <form className="space-y-6" onSubmit={handleConnect}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Peminjam <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={namaPeminjam}
                onChange={(e) => setNamaPeminjam(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Kontak <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={noKontak}
                onChange={(e) => setNoKontak(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gedung <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
              >
                <option value="">Pilih Gedung</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ruangan <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-100 focus:outline-none"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                disabled={!selectedBuilding}
              >
                <option value="">Pilih Ruangan</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam Mulai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam Selesai <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
                value={jamSelesai}
                onChange={(e) => setJamSelesai(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keperluan <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Jelaskan keperluan peminjaman ruangan..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#547792]"
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#547792] text-white px-6 py-2 rounded-lg hover:bg-[#435d70] transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
