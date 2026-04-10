import { useState } from "react";
import { complaints as initialComplaints, Complaint } from "@/lib/mock-data";
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

export default function StudentComplaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState(initialComplaints.filter(c => c.room === user?.room));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newComplaint: Complaint = {
      id: crypto.randomUUID(),
      ticketNo: `#${1843 + complaints.length}`,
      studentName: user?.name || "",
      room: user?.room || "",
      block: user?.block || "",
      category: category as Complaint["category"],
      description,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    setComplaints(prev => [newComplaint, ...prev]);
    setLoading(false);
    setOpen(false);
    setCategory("");
    setDescription("");
    toast.success(`Ticket ${newComplaint.ticketNo} created`);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Complaints</h1>
          <p className="text-body text-sm">Track and raise issues</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New Complaint</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-display">Report an Issue</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-sm">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {["Electricity", "Water", "Maintenance", "Cleanliness", "Other"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  required
                  className="focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Attachment (optional)</Label>
                <Input type="file" accept="image/*" className="text-sm" />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !category || !description}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Submit Complaint
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {complaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-card rounded-xl shadow-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground tabular">{c.ticketNo}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{c.date}</span>
                </div>
                <p className="text-sm text-display mt-1">{c.category}</p>
                <p className="text-xs text-body mt-0.5 line-clamp-2">{c.description}</p>
                {c.reply && (
                  <div className="mt-2 p-2 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Reply from Warden:</p>
                    <p className="text-xs text-display">{c.reply}</p>
                  </div>
                )}
              </div>
              <StatusBadge status={c.status} className="ml-3 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
