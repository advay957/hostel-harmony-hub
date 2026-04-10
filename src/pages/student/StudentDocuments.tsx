import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const documents = [
  { name: "Hostel Rules & Regulations", type: "PDF", size: "245 KB" },
  { name: "Fee Structure 2025-26", type: "PDF", size: "128 KB" },
  { name: "Leave Application Form", type: "PDF", size: "86 KB" },
  { name: "Anti-Ragging Declaration", type: "PDF", size: "102 KB" },
  { name: "Medical Emergency Contacts", type: "PDF", size: "54 KB" },
];

export default function StudentDocuments() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-display text-xl">Documents</h1>
        <p className="text-body text-sm">Download important hostel documents</p>
      </div>

      <div className="bg-card rounded-xl shadow-card">
        <div className="divide-y">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-display">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.type} · {doc.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toast.info("Download started")}>
                <Download className="h-4 w-4 text-muted-foreground" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
