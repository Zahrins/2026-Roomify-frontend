import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Building {
  id: number;
  nama: string;
}

interface Room {
  id: number;
  nama: string;
}

interface StatusHistory {
  id: number;
  bookingId: number;
  status: string;
  changedAt: string;
  changedByUserId?: number;
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
  roomId?: number;
  userId?: number;
  room?: Room;
  building?: Building;
  statusHistory?: StatusHistory[];
}

const buildingNames: { [key: number]: string } = {
  1: "Gedung D4",
  2: "Gedung D3",
  3: "Gedung SAW",
  4: "Gedung Pascasarjana",
};

interface StatusHistoryDisplayProps {
  bookingId: number;
}

function StatusHistoryDisplay({ bookingId }: StatusHistoryDisplayProps) {
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(
          `https://localhost:7252/api/Bookings/${bookingId}/history`,
        );
        if (!res.ok) throw new Error("Gagal load riwayat");
        const data: StatusHistory[] = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [bookingId]);

  if (loading)
    return <p className="text-sm text-gray-500">Memuat riwayat...</p>;
  if (history.length === 0)
    return <p className="text-sm text-gray-500">Belum ada riwayat</p>;

  return (
    <div className="space-y-2">
      {history.map((item) => (
        <div key={item.id} className="flex items-center gap-2 text-sm">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              item.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : item.status === "Disetujui"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
          <span className="text-gray-600">
            {new Date(item.changedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function EditStatus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchBooking() {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch(`https://localhost:7252/api/Bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Gagal mengambil data booking");
        const data: Booking = await res.json();
        setBooking(data);
        setStatus(data.status);
      } catch (err) {
        console.error(err);
        setError("Data tidak ditemukan");
      }
    }

    fetchBooking();
  }, [id]);

  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return "";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBuildingName = () => {
    if (booking?.buildingId && buildingNames[booking.buildingId])
      return buildingNames[booking.buildingId];
    return `Building ID: ${booking?.buildingId || "-"}`;
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking || !id) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch(
        `https://localhost:7252/api/Bookings/admin/${id}/status`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: status }), 
        },
      );

      if (!res.ok) {
        if (res.status === 403)
          throw new Error("Akses Ditolak: Anda bukan Admin.");

        const errorText = await res.text();
        const errorData = errorText ? JSON.parse(errorText) : {};
        throw new Error(errorData.message || "Gagal update status");
      }

      setSuccess(true);
      setTimeout(() => navigate("/dashboardAdmin"), 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!booking && !error)
    return <p className="text-center mt-10">Loading data...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {success && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 bg-white border border-black rounded-3xl px-4 py-2 text-black">
            <span className="material-symbols-outlined text-green-600">
              check_circle
            </span>
            <span>Status berhasil diupdate!</span>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 bg-white border border-black rounded-3xl px-4 py-2 text-black">
            <span className="material-symbols-outlined text-yellow-600">
              hourglass_bottom
            </span>
            <span>Memproses...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 bg-white border border-black rounded-3xl px-4 py-2 text-black">
            <span className="material-symbols-outlined text-red-600">
              error
            </span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h3 className="font-semibold text-[25px]">Edit Status Peminjaman</h3>
      </div>

      <form className="space-y-7" onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Peminjam
            </label>
            <p className="text-lg">{booking?.namaPeminjam}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Kontak
            </label>
            <p className="text-lg">{booking?.noKontak}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-b-slate-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gedung
            </label>
            <p className="text-lg lg:mb-5">{getBuildingName()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ruangan
            </label>
            <p className="text-lg lg:mb-5 mb-4">{booking?.room?.nama || "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <p className="text-lg">{formatTanggal(booking?.tanggal || "")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jam Mulai
            </label>
            <p className="text-lg">{booking?.jamMulai}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jam Selesai
            </label>
            <p className="text-lg">{booking?.jamSelesai}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan
          </label>
          <p className="text-lg">{booking?.keperluan}</p>
        </div>

        <div className="flex flex-row gap-10">
          <div className="mr-5">
            <h4 className="font-semibold text-gray-700 mb-2">Riwayat Status</h4>
            {booking?.id && <StatusHistoryDisplay bookingId={booking.id} />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            >
              <option value="Pending">Pending</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboardAdmin")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#547792] text-white px-6 py-2 rounded-lg hover:bg-[#435d70] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
