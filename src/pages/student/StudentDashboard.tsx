import { useAuth } from "@/lib/auth-context";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { complaints, notices, leaveRequests } from "@/lib/mock-data";
import { BedDouble, CreditCard, AlertTriangle, ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myComplaints = complaints.filter((c) => c.room === user?.room);
  const myLeaves = leaveRequests.filter((l) => l.room === user?.room);

  return (
    <div className="space-y-8 max-w-5xl relative">
      {/* Dynamic Background Glows for Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/30 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/30 blur-[100px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-display text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 drop-shadow-sm font-sans mb-2">
          Welcome back, Room {user?.room}.
        </h1>
        <p className="text-muted-foreground text-base">Here's what's happening in your hostel.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, staggerChildren: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Wrapping StatCards in glowing visual containers */}
        <div className="group relative rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"></div>
          <StatCard title="Room" value={`${user?.block}-${user?.room}`} icon={BedDouble} subtitle="Block B, Floor 4" />
        </div>
        <div className="group relative rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"></div>
          <StatCard title="Fee Status" value="Paid" icon={CreditCard} subtitle="Next due: Apr 1" />
        </div>
        <div className="group relative rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"></div>
          <StatCard title="Complaints" value={myComplaints.length} icon={AlertTriangle} subtitle={`${myComplaints.filter(c => c.status === 'pending').length} pending`} />
        </div>
        <div className="group relative rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10 blur-xl"></div>
          <StatCard title="Leave" value={myLeaves.length} icon={ClipboardList} subtitle={`${myLeaves.filter(l => l.status === 'approved').length} approved`} />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="relative bg-card/60 backdrop-blur-md rounded-2xl shadow-lg border border-border/40 p-6 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <h2 className="text-display text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3 relative z-10">
          <Button size="sm" onClick={() => navigate("/student/complaints")} className="text-xs font-medium bg-primary/90 hover:bg-primary shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)] transition-all hover:scale-105">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
            Report Issue
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate("/student/leave")} className="text-xs font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]">
            <ClipboardList className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Apply Leave
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate("/student/fees")} className="text-xs font-medium border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]">
            <CreditCard className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Pay Fees
          </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Recent Complaints */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.3 }} 
          className="bg-card/60 backdrop-blur-md rounded-2xl shadow-lg border border-border/40 p-6 relative group overflow-hidden hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="text-display text-lg font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              My Complaints
            </h2>
            <button onClick={() => navigate("/student/complaints")} className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline group/btn">
              View all <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4 relative z-10">
            {myComplaints.length === 0 ? (
               <p className="text-muted-foreground text-sm italic">No complaints raised.</p>
            ) : (
              myComplaints.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-start justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-colors shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{c.category}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{c.description}</p>
                  </div>
                  <div className="ml-2 scale-90 origin-right">
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Notices */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4 }} 
          className="bg-card/60 backdrop-blur-md rounded-2xl shadow-lg border border-border/40 p-6 relative group overflow-hidden hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.15)] transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="text-display text-lg font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
              Notices
            </h2>
            <button onClick={() => navigate("/student/notices")} className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline group/btn">
              View all <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4 relative z-10">
            {notices.slice(0, 3).map((n) => (
              <div key={n.id} className="p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-colors shadow-sm">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  {n.priority === "urgent" && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 shadow-[0_0_10px_-2px_rgba(220,38,38,0.3)] animate-pulse">Urgent</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">{n.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
