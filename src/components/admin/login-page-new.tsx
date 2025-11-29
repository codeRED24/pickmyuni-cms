import { useState, useEffect, FormEvent, useRef } from "react";
import { useLogin, useNotify } from "ra-core";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/admin/notification";
import { motion } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const SpotlightInput = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  icon: Icon,
  rightElement,
}: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1"
      >
        {label}
      </label>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className="relative rounded-xl bg-zinc-900/50 p-[1px] overflow-hidden group transition-all duration-300"
      >
        {/* Spotlight Gradient */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />

        <div className="relative flex items-center rounded-xl bg-black/80 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20 focus-within:ring-indigo-500/50 focus-within:shadow-[0_0_20px_-10px_rgba(99,102,241,0.5)]">
          <div className="pl-4 text-zinc-500 transition-colors group-focus-within:text-indigo-400">
            <Icon size={18} />
          </div>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none"
          />
          {rightElement}
        </div>
      </div>
    </div>
  );
};

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
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-[45%] lg:px-20 xl:px-32 z-10">
        {/* Background Noise for Left Panel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-sm mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src="/logo.svg"
                alt="PickMyUni Logo"
                width={200}
                height={200}
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              PickMyUni CMS
            </span>
          </motion.div>

          <div className="mb-4 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-zinc-400">
              Enter your credentials to access the admin workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <SpotlightInput
              id="email"
              type="email"
              label="Email Address"
              placeholder="admin@pickmyuni.com"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              icon={Sparkles} // Using Sparkles as a generic abstract icon for email to look cool, or Mail
            />

            <SpotlightInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              icon={ShieldCheck}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-3 rounded-lg p-1 text-zinc-500 hover:bg-white/10 hover:text-zinc-300 focus:outline-none transition-colors"
                >
                  {!showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <Button
              type="submit"
              className="group relative w-full mt-3 overflow-hidden cursor-pointer rounded-xl bg-white py-6 text-base font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              disabled={!email || !password || loading}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </Button>
          </form>

          <div className="mt-10 border-t border-white/10 pt-6 text-center space-y-4">
            <p className="text-xs text-zinc-600">
              Having issue? Contact us at{" "}
              <a
                href="mailto:support@pickmyuni.com"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                support@pickmyuni.com
              </a>
              .
            </p>
            <p className="text-xs text-zinc-600">
              PickMyUni © {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>

      <Notification />
    </div>
  );
};
