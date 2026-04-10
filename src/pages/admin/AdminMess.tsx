import { useState } from "react";
import { messMenu as initialMenu } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AdminMess() {
  const [menu] = useState(initialMenu);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-xl">Mess Menu Management</h1>
          <p className="text-body text-sm">Update weekly mess menu</p>
        </div>
        <Button size="sm" onClick={() => toast.success("Menu saved")}>Save Changes</Button>
      </div>

      <div className="space-y-2">
        {days.map((day, i) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-xl shadow-card p-4"
          >
            <h3 className="text-sm text-display font-medium mb-3">{day}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["breakfast", "lunch", "snacks", "dinner"] as const).map(meal => (
                <div key={meal}>
                  <p className="text-xs text-muted-foreground capitalize mb-0.5">{meal}</p>
                  <p className="text-xs text-foreground">{menu[day][meal]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
