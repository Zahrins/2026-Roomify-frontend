import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#f0f4ff]">
      <h1 className="text-4xl font-bold text-[#5A7ACD] mb-10">
        Welcome to Roomify
      </h1>
      <div className="flex gap-10">
        <button
          onClick={() => navigate("/userLogin")}
          className="px-10 py-4 bg-[#5A7ACD] text-white rounded-3xl hover:bg-[#4a67ad] transition"
        >
          Login as User
        </button>
        <button
          onClick={() => navigate("/adminLogin")}
          className="px-10 py-4 bg-[#ff6b6b] text-white rounded-3xl hover:bg-[#e05555] transition"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
