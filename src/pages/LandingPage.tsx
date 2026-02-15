import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-2xl w-full text-center bg-white shadow-xl rounded-3xl p-12 border border-gray-100">
        <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
          Roomify
        </h1>

        <p className="text-lg font-medium text-gray-700 mb-4">
          Smart Way to Book Your Campus Space
        </p>

        <p className="text-gray-500 mb-10 leading-relaxed">
          Cek ketersediaan, ajukan booking, dan pantau status dalam satu
          dashboard yang rapi dan terstruktur.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
          <button
            onClick={() => navigate("/userLogin")}
            className="px-8 py-3 bg-[#547792] text-white rounded-full hover:bg-[#3c5162] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login as User
          </button>

          <button
            onClick={() => navigate("/adminLogin")}
            className="px-8 py-3 bg-white border border-[#547792] text-[#547792] rounded-full hover:bg-[#547792] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
