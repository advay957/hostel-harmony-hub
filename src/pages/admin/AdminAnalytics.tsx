import { StatCard } from "@/components/StatCard";
import { students, complaints } from "@/lib/mock-data";
import { Users, BedDouble, AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAnalytics() {
  const pendingCount = complaints.filter(c => c.status === "pending").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-xl">Analytics</h1>
        <p className="text-body text-sm">Hostel performance overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard title="Total Students" value={students.length} icon={Users} trend="+2 this month" />
        <StatCard title="Rooms Available" value="38" icon={BedDouble} subtitle="Out of 180" />
        <StatCard title="Total Complaints" value={complaints.length} icon={AlertTriangle} />
        <StatCard title="Pending" value={pendingCount} icon={Clock} />
        <StatCard title="Resolved" value={resolvedCount} icon={CheckCircle} />
        <StatCard title="Resolution Rate" value={`${Math.round((resolvedCount / complaints.length) * 100)}%`} icon={TrendingUp} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl shadow-card p-5">
          <h2 className="text-display text-sm mb-4">Complaints by Category</h2>
          <div className="space-y-3">
            {["Electricity", "Water", "Maintenance", "Cleanliness"].map(cat => {
              const count = complaints.filter(c => c.category === cat).length;
              const pct = (count / complaints.length) * 100;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-body">{cat}</span>
                    <span className="text-display tabular">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl shadow-card p-5">
          <h2 className="text-display text-sm mb-4">Fee Collection</h2>
          <div className="space-y-3">
            {[
              { label: "Paid", count: students.filter(s => s.feeStatus === "paid").length, color: "bg-emerald-500" },
              { label: "Pending", count: students.filter(s => s.feeStatus === "pending").length, color: "bg-amber-500" },
              { label: "Overdue", count: students.filter(s => s.feeStatus === "overdue").length, color: "bg-red-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-body">{item.label}</span>
                </div>
                <span className="text-sm text-display tabular">{item.count} students</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
