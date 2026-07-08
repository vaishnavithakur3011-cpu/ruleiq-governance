import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

const BG = "#080B14";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: BG }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
        style={{
          padding: 48,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <span
            className="font-display font-bold text-white"
            style={{ fontSize: 28 }}
          >
            RuleIQ
          </span>
          <p
            className="text-[#A0A0A0] mt-2"
            style={{ fontSize: 14 }}
          >
            Govern What Runs Your Business
          </p>
        </div>

        <h2 className="text-white font-display font-bold text-center mb-6" style={{ fontSize: 24 }}>
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-[#A0A0A0] text-xs uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 bg-transparent border-white/10 text-white placeholder:text-white/40"
              style={{ fontSize: 16, padding: "12px 16px" }}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-[#A0A0A0] text-xs uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 bg-transparent border-white/10 text-white placeholder:text-white/40"
              style={{ fontSize: 16, padding: "12px 16px" }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#A0A0A0]">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-transparent"
              />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/90"
            style={{ padding: "14px 32px", fontSize: 16 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#A0A0A0]" style={{ fontSize: 14 }}>
            Don't have an account?{" "}
            <a href="/sign-up" className="text-white hover:underline">
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
