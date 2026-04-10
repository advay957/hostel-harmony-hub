import { useState } from "react";
import { notices as initialNotices, Notice } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminNotices() {
  const [noticesList, setNoticesList] = useState(initialNotices);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<string>("normal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const newNotice: Notice = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      priority: priority as Notice["priority"],
    };
    setNoticesList(prev => [newNotice, ...prev]);
    setOpen(false);
    setLoading(false);
    setTitle(""); setContent(""); setPriority("normal");
    toast.success("Notice published");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Notices & Announcements</h1>
          <p className="text-body text-sm">{noticesList.length} notices posted</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Post Notice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="text-display">Post Notice</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-sm">Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Notice title" required />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Content</Label>
                <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Notice content..." required />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={loading || !title || !content}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Publish Notice
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {noticesList.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-xl shadow-card p-5"
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-sm text-display font-medium">{n.title}</h3>
              {n.priority !== "normal" && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ring-1 ring-inset ${
                  n.priority === "urgent" ? "bg-red-50 text-red-700 ring-red-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
                }`}>
                  {n.priority === "urgent" ? "Urgent" : "Important"}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{n.date}</p>
            <p className="text-sm text-body">{n.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
