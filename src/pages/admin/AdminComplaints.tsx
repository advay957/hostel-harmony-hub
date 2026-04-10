import { useState } from "react";
import { complaints as initialComplaints, Complaint } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [reply, setReply] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const filtered = complaints.filter(c => {
    if (filter !== "all" && c.status !== filter) return false;
    if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
    if (search && !c.studentName.toLowerCase().includes(search.toLowerCase()) && !c.ticketNo.includes(search)) return false;
    return true;
  });

  const handleUpdate = () => {
    if (!selected) return;
    setComplaints(prev => prev.map(c =>
      c.id === selected.id
        ? { ...c, status: (newStatus || c.status) as Complaint["status"], reply: reply || c.reply }
        : c
    ));
    setSelected(null);
    setReply("");
    setNewStatus("");
    toast.success("Complaint updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-xl">Complaints Management</h1>
        <p className="text-body text-sm">{complaints.length} total complaints</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search by name or ticket..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 text-sm h-9" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[140px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[140px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {["Electricity", "Water", "Maintenance", "Cleanliness", "Other"].map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="divide-y">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => { setSelected(c); setNewStatus(c.status); setReply(c.reply || ""); }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground tabular">{c.ticketNo}</span>
                  <span className="text-sm text-display">{c.studentName}</span>
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{c.category}</span>
                </div>
                <p className="text-xs text-body mt-0.5 truncate max-w-md">{c.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Room {c.room}, Block {c.block} · {c.date}</p>
              </div>
              <div className="flex items-center gap-2 ml-3 shrink-0">
                <StatusBadge status={c.status} />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-body text-sm">No complaints found</div>
          )}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-display">Complaint {selected?.ticketNo}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Student</p>
                <p className="text-sm text-display">{selected.studentName} · Room {selected.room}, Block {selected.block}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm text-display">{selected.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-sm text-body">{selected.description}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Update Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Reply to Student</Label>
                <Textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Write a reply..." />
              </div>
              <Button onClick={handleUpdate} className="w-full">Update Complaint</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
