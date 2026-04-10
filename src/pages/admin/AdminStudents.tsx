import { students } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.room.includes(search) ||
    s.block.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Student Records</h1>
          <p className="text-body text-sm">{students.length} students enrolled</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 text-sm h-9" />
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Room</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Block</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Phone</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Fee Status</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3 px-4">
                    <div>
                      <p className="text-display text-sm">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </td>
                  <td className="p-3 tabular">{s.room}</td>
                  <td className="p-3">{s.block}</td>
                  <td className="p-3 text-muted-foreground tabular">{s.phone}</td>
                  <td className="p-3"><StatusBadge status={s.feeStatus} /></td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-xs tabular text-muted-foreground">{s.attendance}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
