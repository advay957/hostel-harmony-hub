import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { CalendarCheck, CalendarX, Calendar } from "lucide-react";

const attendanceData = [
  { month: "January", present: 28, absent: 3, total: 31 },
  { month: "February", present: 25, absent: 3, total: 28 },
  { month: "March", present: 13, absent: 2, total: 15 },
];

export default function StudentAttendance() {
  const totalPresent = attendanceData.reduce((s, m) => s + m.present, 0);
  const totalDays = attendanceData.reduce((s, m) => s + m.total, 0);
  const pct = Math.round((totalPresent / totalDays) * 100);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-display text-xl">Attendance</h1>
        <p className="text-body text-sm">Your hostel attendance record</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Overall" value={`${pct}%`} icon={CalendarCheck} />
        <StatCard title="Present" value={totalPresent} icon={Calendar} />
        <StatCard title="Absent" value={totalDays - totalPresent} icon={CalendarX} />
      </div>

      <div className="bg-card rounded-xl shadow-card">
        <div className="p-4 border-b">
          <h2 className="text-display text-sm">Monthly Breakdown</h2>
        </div>
        <div className="divide-y">
          {attendanceData.map((m, i) => (
            <motion.div
              key={m.month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 flex items-center justify-between"
            >
              <span className="text-sm text-display">{m.month} 2026</span>
              <div className="flex items-center gap-4">
                <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(m.present / m.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-display tabular w-16 text-right">
                  {m.present}/{m.total}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
