import { motion } from "framer-motion";
import { BedDouble } from "lucide-react";

const blocks = [
  { name: "Block A", total: 60, occupied: 52, floors: 5 },
  { name: "Block B", total: 60, occupied: 48, floors: 5 },
  { name: "Block C", total: 60, occupied: 42, floors: 5 },
];

export default function AdminRooms() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-xl">Room Management</h1>
        <p className="text-body text-sm">Allocate and manage hostel rooms</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {blocks.map((block, i) => (
          <motion.div
            key={block.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl shadow-card p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/5 rounded-lg">
                <BedDouble className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-display text-sm font-medium">{block.name}</h3>
                <p className="text-xs text-muted-foreground">{block.floors} floors</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Occupancy</span>
                <span className="text-display tabular">{block.occupied}/{block.total}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(block.occupied / block.total) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Available</span>
                <span className="text-display tabular">{block.total - block.occupied} rooms</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
