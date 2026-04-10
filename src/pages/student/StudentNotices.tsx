import { notices } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function StudentNotices() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-display text-xl">Notices & Announcements</h1>
        <p className="text-body text-sm">Stay updated with hostel announcements</p>
      </div>

      <div className="space-y-2">
        {notices.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl shadow-card p-5"
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-sm text-display font-medium">{n.title}</h3>
              {n.priority !== "normal" && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ring-1 ring-inset ${
                  n.priority === "urgent"
                    ? "bg-red-50 text-red-700 ring-red-600/20"
                    : "bg-amber-50 text-amber-700 ring-amber-600/20"
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
