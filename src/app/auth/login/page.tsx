"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { loginUsuario,getMe } from "@/services/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!carnet || !password) {
      alert("Debe ingresar carnet y contraseña");
      return;
    }



    try {
      // 1️⃣ Login → backend guarda cookie HttpOnly
      await loginUsuario(carnet, password);

      // 2️⃣ Obtener usuario real desde el backend
      const me = await getMe();

      // 3️⃣ Guardar usuario (NO token)
      localStorage.setItem("usuario", JSON.stringify(me.usuario));

      // 4️⃣ Redirigir según rol
      router.push("/home");
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  };





  return (
    <section className="min-h-screen flex items-center justify-center">
      <div
        className="relative mx-auto w-full max-w-md bg-simple-bg backdrop-blur-md rounded-lg shadow-mentor-shadow px-8 pt-14 pb-8 text-center"
      >

        <h2 className="mb-6 text-center text-white font-brand">Edu.Zar</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-[22px]">
            <input
              type="text"
              placeholder="Carnet de identidad"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base outline-none transition placeholder:text-grey focus:border-primary text-white"
              inputMode="numeric"
            />
          </div>

          <div className="mb-[22px] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 pr-12 text-base outline-none transition placeholder:text-grey focus:border-primary text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-primary transition"
            >
              <Icon
                icon={showPassword ? "tabler:eye-off" : "tabler:eye"}
                className="text-[24px]"
              />
            </button>
          </div>

          <div className="mb-9">
            <button
              type="submit"
              className="bg-primary w-full py-3 rounded-lg text-lg text-white font-medium border border-primary hover:text-primary hover:bg-transparent transition"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <Link
          href="#"
          className="mb-2 inline-block text-base text-white hover:text-primary hover:underline"
        >
          Forgot Password?
        </Link>

        <p className="text-white text-base">
          Not a member yet?{" "}
          <Link href="#" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
