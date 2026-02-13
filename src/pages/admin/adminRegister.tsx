import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://localhost:7252/api/Users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role: "admin" }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/adminLogin");
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-[#5A7ACD] mb-2">
          Admin Register
        </h1>
        <p className="text-gray-600 mb-6">Create your account.</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border-b border-gray-200 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border-b border-gray-200 focus:outline-none"
        />
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full py-2 bg-[#5A7ACD] text-white rounded-3xl hover:bg-[#4a67ad] mb-4"
        >
          Register
        </button>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-[#5A7ACD] cursor-pointer"
            onClick={() => navigate("/adminLogin")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
