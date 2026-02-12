import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Building {
  id: number;
  name: string;
}

interface Room {
  id: number;
  name: string;
  buildingId: number;
}

interface Booking {
  id: number;
  namaPeminjam: string;
  noKontak: string;
  tanggal: string;
  jamMulai: string;
  jamSelesai: string;
  keperluan: string;
  status: string;
  buildingId: number;
  roomId: number;
}

export default function EditStatus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [noKontak, setNoKontak] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [status, setStatus] = useState("");

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // LOAD BUILDINGS (sekali saja)
  // ===============================
  useEffect(() => {
    async function loadBuildings() {
      try {
        const res = await fetch(`https://localhost:7252/api/buildings`);
        if (!res.ok) throw new Error("Gagal ambil buildings");

        const data: Building[] = await res.json();
        setBuildings(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadBuildings();
  }, []);

  // ===============================
  // LOAD BOOKING DETAIL
  // ===============================
  useEffect(() => {
    if (!id) return;

    async function loadBooking() {
      try {
        const res = await fetch(`https://localhost:7252/api/Bookings/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data booking");

        const data: Booking = await res.json();

        setNamaPeminjam(data.namaPeminjam);
        setNoKontak(data.noKontak);
        setTanggal(data.tanggal.split("T")[0]);
        setJamMulai(data.jamMulai);
        setJamSelesai(data.jamSelesai);
        setKeperluan(data.keperluan);
        setStatus(data.status);
        setSelectedBuilding(String(data.buildingId));
        setSelectedRoom(String(data.roomId));
      } catch (err) {
        console.error(err);
      }
    }

    loadBooking();
  }, [id]);

  // ===============================
  // LOAD ROOMS saat building sudah ada
  // ===============================
  useEffect(() => {
    if (!selectedBuilding) return;

    async function loadRooms() {
      try {
        const res = await fetch(
          `https://localhost:7252/api/rooms/byBuilding/${selectedBuilding}`,
        );

        if (!res.ok) throw new Error("Gagal ambil rooms");

        const data: Room[] = await res.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadRooms();
  }, [selectedBuilding]);

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://localhost:7252/api/Bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
            status,
          }),
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/dashboardUser");
        }, 3000);
      } else {
        setError(responseData.message || "Update gagal.");
      }
    } catch (err) {
      setError("Terjadi kesalahan.");
    } finally {
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
          <h3 className="font-semibold text-[25px]">Edit Status Peminjaman</h3>
          <a className="mt-2 text-slate-600">
            Isi formulir di bawah untuk mengajukan peminjaman ruangan
          </a>
        </div>

        <form className="space-y-6" onSubmit={handleConnect}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Peminjam
              </label>
              <a>{namaPeminjam}</a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Kontak
              </label>
              <a>{noKontak}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gedung
              </label>
              <a>
                {buildings.find((b) => String(b.id) === selectedBuilding)?.name}
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ruangan
              </label>
              <a>{rooms.find((r) => String(r.id) === selectedRoom)?.name}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal
              </label>
              <a>{tanggal}</a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam Mulai
              </label>
              <a>{jamMulai}</a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jam Selesai
              </label>
              <a>{jamSelesai}</a>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keperluan
            </label>
            <a>{keperluan}</a>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Pending">Pending</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
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
