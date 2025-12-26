"use client";

import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div
        className="relative mx-auto w-full max-w-md bg-simple-bg backdrop-blur-md rounded-lg shadow-mentor-shadow px-8 pt-14 pb-8 text-center"
      >

        <h2 className="mb-6 text-center text-white font-brand">Edu.Zar</h2>

        <form onSubmit={(e) => e.preventDefault()}>
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

          <div className="mb-[22px]">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base outline-none transition placeholder:text-grey focus:border-primary text-white"
            />
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
