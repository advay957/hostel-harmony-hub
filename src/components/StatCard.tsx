import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, subtitle, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden bg-card/60 backdrop-blur-xl rounded-[1.5rem] p-6 shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(99,102,241,0.15)] transition-all border border-black/5 dark:border-white/5 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1.5">
          <p className="font-semibold text-muted-foreground/80 tracking-wide text-sm uppercase">{title}</p>
          <p className="text-display text-4xl font-extrabold tabular-nums tracking-tighter text-foreground drop-shadow-sm">{value}</p>
          {subtitle && <p className="font-medium text-xs text-muted-foreground/70">{subtitle}</p>}
          {trend && <p className="text-xs text-emerald-500 font-bold tracking-wide">{trend}</p>}
        </div>
        <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-2xl shadow-inner group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20">
          <Icon className="h-6 w-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
