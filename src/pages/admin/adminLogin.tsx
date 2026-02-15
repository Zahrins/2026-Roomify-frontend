import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ setUser }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7252/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Invalid username or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.token || "logged-in");
      localStorage.setItem("userData", JSON.stringify(data));
      setUser && setUser(data);

      if (data.role === "admin") navigate("/dashboardAdmin");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-black mb-2">Admin Login</h1>
        <p className="text-gray-600 mb-10">Please login to your account.</p>

        <div className="flex flex-row gap-4 border-b border-gray-200">
          <span className="material-symbols-outlined text-gray-400 mt-2 mr-2">
            person
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 border-b border-gray-200 mt-3">
          <span className="material-symbols-outlined text-gray-400">lock</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 focus:outline-none bg-transparent"
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="material-symbols-outlined cursor-pointer text-gray-500"
          >
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </div>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 mt-10 bg-[#547792] text-white rounded-3xl hover:bg-[#3c5162] mb-4"
        >
          Login
        </button>

        <p className="text-center text-gray-500 mt-3">
          Don't have an account?{" "}
          <span
            className="text-[#547792] hover:text-[#3c5162] cursor-pointer"
            onClick={() => navigate("/adminRegister")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
