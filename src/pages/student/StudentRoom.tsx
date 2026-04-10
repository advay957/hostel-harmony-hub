import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { BedDouble, Users, Wifi, Zap } from "lucide-react";

export default function StudentRoom() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-display text-xl">Room Details</h1>
        <p className="text-body text-sm">Room {user?.room}, Block {user?.block}</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl shadow-card p-5">
        <h2 className="text-display text-sm mb-4">Room Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: BedDouble, label: "Room Type", value: "Double Sharing" },
            { icon: Users, label: "Floor", value: "4th Floor" },
            { icon: Wifi, label: "Wi-Fi", value: "Connected" },
            { icon: Zap, label: "Electricity", value: "Active" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm text-display">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl shadow-card p-5">
        <h2 className="text-display text-sm mb-4">Roommate</h2>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">R</span>
          </div>
          <div>
            <p className="text-sm text-display">Rohan Patel</p>
            <p className="text-xs text-body">3rd Year, Computer Science</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
