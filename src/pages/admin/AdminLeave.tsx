import { useState } from "react";
import { leaveRequests as initialLeaves } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminLeave() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState("all");

  const filtered = leaves.filter(l => filter === "all" || l.status === filter);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
    toast.success(`Leave ${action}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Leave Requests</h1>
          <p className="text-body text-sm">{leaves.filter(l => l.status === "pending").length} pending approval</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[140px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="divide-y">
          {filtered.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-display">{l.studentName}</span>
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{l.type}</span>
                </div>
                <p className="text-xs text-body mt-0.5">Room {l.room}, Block {l.block} · {l.fromDate} → {l.toDate}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{l.reason}</p>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                {l.status === "pending" ? (
                  <>
                    <Button size="sm" variant="ghost" className="h-8 text-xs text-emerald-600 hover:bg-emerald-50" onClick={() => handleAction(l.id, "approved")}>
                      <Check className="h-3.5 w-3.5 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive hover:bg-red-50" onClick={() => handleAction(l.id, "rejected")}>
                      <X className="h-3.5 w-3.5 mr-1" /> Reject
                    </Button>
                  </>
                ) : (
                  <StatusBadge status={l.status} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
