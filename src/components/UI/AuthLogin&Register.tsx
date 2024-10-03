"use client";
import { AppDispatch } from "../../redux/store";
import { login, register } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function AuthPage({ type }: { type: "login" | "register" }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response;

    if (type === "login") {
      //@ts-ignore
      response = await dispatch(login({ email, password }));
    } else {
      //@ts-ignore
      response = await dispatch(register({ email, password, name }));

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/login");
      }

      return;
    }

    if (response.meta.requestStatus === "fulfilled") {
      router.push("/");
    }
  };

  const isLogin = type === "login";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 border shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded text-gray-700 focus:ring-0"
              />
              <span className="ml-2 text-sm">Remember me</span>
            </label>

            {isLogin && (
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-gray-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium border rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="text-gray-400 hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
