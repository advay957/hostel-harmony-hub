import { useState } from "react";
import { leaveRequests as initialLeaves, LeaveRequest } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function StudentLeave() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(initialLeaves.filter(l => l.room === user?.room));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newLeave: LeaveRequest = {
      id: crypto.randomUUID(),
      studentName: user?.name || "",
      room: user?.room || "",
      block: user?.block || "",
      fromDate,
      toDate,
      reason,
      type: type as LeaveRequest["type"],
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    setLeaves(prev => [newLeave, ...prev]);
    setLoading(false);
    setOpen(false);
    setType(""); setFromDate(""); setToDate(""); setReason("");
    toast.success("Leave application submitted");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Leave Applications</h1>
          <p className="text-body text-sm">Apply for leave and track status</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Apply Leave</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-display">Leave Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-sm">Type</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger><SelectValue placeholder="Leave type" /></SelectTrigger>
                  <SelectContent>
                    {["Regular", "Emergency", "Medical"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">From</Label>
                  <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">To</Label>
                  <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Reason</Label>
                <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason for leave..." required />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !type || !fromDate || !toDate || !reason}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Submit Application
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {leaves.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl shadow-card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-muted px-1.5 py-0.5 rounded">{l.type}</span>
                  <span className="text-xs text-muted-foreground">{l.date}</span>
                </div>
                <p className="text-sm text-display mt-1">{l.fromDate} → {l.toDate}</p>
                <p className="text-xs text-body mt-0.5">{l.reason}</p>
              </div>
              <StatusBadge status={l.status} className="ml-3 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
