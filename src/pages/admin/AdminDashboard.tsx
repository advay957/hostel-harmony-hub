import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { complaints, leaveRequests, students, notices } from "@/lib/mock-data";
import { Users, BedDouble, AlertTriangle, ClipboardList, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const pendingComplaints = complaints.filter(c => c.status === "pending").length;
  const pendingLeaves = leaveRequests.filter(l => l.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-xl">Admin Dashboard</h1>
        <p className="text-body text-sm">Overview of hostel operations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total Students" value={students.length} icon={Users} trend="+2 this month" />
        <StatCard title="Rooms Occupied" value="142/180" icon={BedDouble} subtitle="78% occupancy" />
        <StatCard title="Pending Complaints" value={pendingComplaints} icon={AlertTriangle} subtitle="2 urgent" />
        <StatCard title="Leave Requests" value={pendingLeaves} icon={ClipboardList} subtitle="Awaiting approval" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Complaints */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl shadow-card">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-display text-sm">Recent Complaints</h2>
            <button onClick={() => navigate("/admin/complaints")} className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="divide-y">
            {complaints.slice(0, 4).map(c => (
              <div key={c.id} className="p-3 px-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular">{c.ticketNo}</span>
                    <span className="text-sm text-display">{c.studentName}</span>
                  </div>
                  <p className="text-xs text-body truncate">{c.category}: {c.description}</p>
                </div>
                <StatusBadge status={c.status} className="ml-3 shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leave Requests */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl shadow-card">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-display text-sm">Pending Leaves</h2>
            <button onClick={() => navigate("/admin/leave")} className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="divide-y">
            {leaveRequests.filter(l => l.status === "pending").map(l => (
              <div key={l.id} className="p-3 px-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm text-display">{l.studentName}</p>
                  <p className="text-xs text-body">{l.type} · {l.fromDate} → {l.toDate}</p>
                </div>
                <StatusBadge status={l.status} className="ml-3 shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
