"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    localStorage.setItem('userEmail', "ksdjhfkldsjlk");

    router.push('/Admin');

    // setError("");
    // try {
    //   const response = await fetch("https://api.example.com/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password })
    //   });
    //   const data = await response.json();
    //   if (!response.ok) throw new Error(data.message || "Login failed");
    //   console.log("Login successful", data);
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-[#FEAB5F] text-center">Iniciar Sesion</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FEAB5F]"
          />
        </div>
        <div className="mt-4 relative">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#FEAB5F]"
          />
          <button
            type="button"
            className="absolute right-2 top-9 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-[#FEAB5F] hover:bg-[#FEAB5F] text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}





