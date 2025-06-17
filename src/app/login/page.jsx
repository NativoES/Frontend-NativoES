"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/Context";
import { login } from "@/services/user/auth.service";

export default function Login() {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    try {
      const data = await login({ body: { email, password } });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      const rol = data.user?.rol;

      if (rol === "ADMINISTRADOR") {
        router.push("/Admin");
      } else if (rol === "PROFESOR") {
        router.push("/Classes");
      } else if (rol === "ESTUDIANTE") {
        router.push("/MisClases");
      } else {
        setError("Rol no reconocido");
      }
    } catch (err) {
      setError("Error de red o servidor");
      console.error(err);
    }
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





