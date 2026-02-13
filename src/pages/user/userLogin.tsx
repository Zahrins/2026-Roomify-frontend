import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserLoginProps {
  setUser: (user: any) => void;
}

export default function UserLogin({ setUser }: UserLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

      if (data.role === "user") navigate("/dashboardUser");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-[#5A7ACD] mb-2">User Login</h1>
        <p className="text-gray-600 mb-6">Please login to your account.</p>

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
          onClick={handleLogin}
          className="w-full py-2 bg-[#5A7ACD] text-white rounded-3xl hover:bg-[#4a67ad] mb-4"
        >
          Login
        </button>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-[#5A7ACD] cursor-pointer"
            onClick={() => navigate("/userRegister")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
