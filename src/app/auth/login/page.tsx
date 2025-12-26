"use client";

import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-darkmode w-full max-w-md rounded-lg shadow-mentor-shadow p-8">
        <h2 className="mb-6 text-center">Iniciar sesión</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-[22px]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base outline-none transition placeholder:text-grey focus:border-primary text-white"
            />
          </div>

          <div className="mb-[22px]">
            <input
              type="password"
              placeholder="Password"
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
              Sign In
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
