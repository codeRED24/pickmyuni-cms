import { useState, useEffect, FormEvent } from "react";
import { useLogin, useNotify } from "ra-core";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/admin/notification";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Eye, EyeOff } from "lucide-react";

export const LoginPageNew = ({ redirectTo }: { redirectTo?: string }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fireflies, setFireflies] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }[]
  >([]);
  const login = useLogin();
  const notify = useNotify();

  useEffect(() => {
    const f = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    }));
    setFireflies(f);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    login({ email, password }, redirectTo)
      .catch((error) => {
        notify(
          typeof error === "string"
            ? error
            : error?.message || "ra.auth.sign_in_error",
          { type: "error" }
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white overflow-hidden">
      {/* Fireflies */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fireflies.map(({ id, x, y, size, delay, duration }) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-white shadow-md"
            style={{
              width: size,
              height: size,
              top: `${y}%`,
              left: `${x}%`,
              opacity: 0.8,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.1, 1, 0.1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-10 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <img
            src="https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/static/footer_logo.webp"
            alt="logo"
            className="h-10 mb-2"
          />
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-zinc-400 text-sm">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent border border-white/20 rounded-md shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-white/50 focus:border-white/50 sm:text-sm"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 bg-transparent border border-white/20 rounded-md shadow-sm placeholder-zinc-500 focus:outline-none focus:ring-white/50 focus:border-white/50 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer inset-y-0 right-0 pr-3 focus:outline-none flex items-center text-zinc-400 pt-6"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {password.length > 0 &&
                (!showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                ))}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black cursor-pointer hover:bg-zinc-200 font-medium py-2"
            disabled={!email || !password || loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm space-y-4 text-zinc-500">
          <p>
            Contact -{" "}
            <a
              href="mailto:support@pickmyuni.com"
              className="text-zinc-200 underline hover:text-white"
            >
              support@pickmyuni.com
            </a>
          </p>

          <p className="text-center text-sm text-zinc-500">
            PickMyUni {dayjs().format("YYYY")} © All rights reserved.
          </p>
        </div>
      </motion.div>

      <Notification />
    </div>
  );
};
