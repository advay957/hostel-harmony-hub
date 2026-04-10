import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, Variants } from "framer-motion";
import { Building2, Loader2, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, role);
      navigate(role === "admin" ? "/admin" : "/student");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a] dark:bg-background z-[-2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)] z-[-1]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/40 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.25, 0.1], x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/40 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-500/30 blur-[100px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center p-4 bg-white/5 dark:bg-black/20 rounded-2xl mb-6 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)] border border-white/10 dark:border-white/5 relative backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse -z-10" />
            <Building2 className="h-10 w-10 text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
          </motion.div>
          <h1 className="text-display text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 mb-3">
            HostelHub
          </h1>
          <p className="text-muted-foreground font-medium">Elevating your campus living experience</p>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-600/30 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse -z-10" />
          <div className="bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] p-6 md:p-10 relative overflow-hidden">
            
            {/* Subtle inner reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            {/* Role Toggle */}
            <div className="flex bg-black/5 dark:bg-black/40 p-1.5 mb-8 rounded-2xl relative isolate border border-white/10 shadow-inner">
            {(["student", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 flex justify-center items-center gap-2 text-sm py-3 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
                  role === r
                    ? "text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {role === r && (
                  <motion.div
                    layoutId="active-role"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/20 dark:border-white/5 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {r === "student" ? <Users className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                {r === "student" ? "Student" : "Admin"}
              </button>
            ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <motion.div variants={itemVariants} className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground/80 ml-1">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder={role === "student" ? "student@hostel.edu" : "admin@hostel.edu"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/50 dark:bg-black/20 focus-visible:ring-primary/40 focus-visible:bg-white dark:focus-visible:bg-black/40 transition-all border-white/20 dark:border-white/10 h-12 rounded-xl px-4 shadow-sm"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline font-bold transition-all hover:text-primary/80">
                    Forgot setup?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-black/20 focus-visible:ring-primary/40 focus-visible:bg-white dark:focus-visible:bg-black/40 transition-all border-white/20 dark:border-white/10 h-12 rounded-xl px-4 shadow-sm"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" className="w-full h-12 text-sm font-bold rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5 transition-all duration-200 group relative overflow-hidden" disabled={loading}>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2 relative z-10" />
                  ) : (
                    <span className="flex items-center justify-center relative z-10 text-white">
                      Sign In to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4 opacity-90 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.p variants={itemVariants} className="text-center text-muted-foreground text-sm mt-8 font-medium">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-bold transition-colors">Contact Admin</button>
            </motion.p>
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-muted-foreground/50 text-xs mt-8 font-medium tracking-wide">
          SECURE ENCRYPTED CONNECTION
        </motion.p>
      </motion.div>
    </div>
  );
}
