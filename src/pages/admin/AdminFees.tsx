import { students } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";

export default function AdminFees() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-xl">Fee Records</h1>
        <p className="text-body text-sm">Track student fee payments</p>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 px-4 text-xs font-medium text-muted-foreground">Student</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Room</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3 px-4 text-display">{s.name}</td>
                  <td className="p-3 tabular">{s.block}-{s.room}</td>
                  <td className="p-3 tabular">₹45,000</td>
                  <td className="p-3"><StatusBadge status={s.feeStatus} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
