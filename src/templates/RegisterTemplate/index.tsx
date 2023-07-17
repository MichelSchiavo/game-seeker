import { LoadingSpin } from "@/components/LoadingSpin";
import { useAuthContext } from "@/context/AuthContext";
import { FormEvent, useState } from "react";

export function RegisterTemplate() {
  const { handleRegister, loginLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleCkick(e: FormEvent) {
    e.preventDefault();
    handleRegister(email, password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {loginLoading ? (
        <LoadingSpin />
      ) : (
        <form className="max-w-sm w-[500px] mx-auto bg-[#4c102a] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 text-[#4c102a] shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Senha
            </label>

            <input
              type="password"
              id="password"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 text-[#4c102a] shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-[#3f0d23] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-background duration-300 ease-in-out"
            onClick={handleCkick}
          >
            Fazer Login
          </button>

          <span className="mt-4 text-sm text-white">
            Já tem uma conta?{" "}
            <a
              href="/auth/login"
              className="font-bold text-white hover:text-black transition-background duration-300 ease-in-out"
            >
              Clique aqui!
            </a>
          </span>
        </form>
      )}
    </div>
  );
}
