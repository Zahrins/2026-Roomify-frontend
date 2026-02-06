export default function PinjamForm() {
    return (
        <div className="">
                <div className="max-w-4xl mx-auto p-6">
                    <div className="mb-10">
                        <h3 className="font-semibold text-[25px]">Peminjaman Ruangan Baru</h3>
                        <a className="mt-2 text-slate-600">Isi formulir di bawah untuk mengajukan peminjaman ruangan</a>
                    </div>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Peminjam <span className="text-red-500">*</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nomor Kontak <span className="text-red-500">*</span>
                            </label>
                            <input
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gedung <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Pilih Gedung</option>
                            <option>Gedung A</option>
                            <option>Gedung B</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ruangan <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-100 focus:outline-none">
                            <option>Pilih Ruangan</option>
                            <option>Ruang 101</option>
                            <option>Ruang 102</option>
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Jam Mulai <span className="text-red-500">*</span>
                            </label>
                            <input
                            type="time"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Jam Selesai <span className="text-red-500">*</span>
                            </label>
                            <input
                            type="time"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>

                        <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Simpan
                        </button>
                        </div>
                    </form>
                </div>
        </div>
    )
}