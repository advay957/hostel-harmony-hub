import { messMenu } from "@/lib/mock-data";
import { motion } from "framer-motion";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

export default function StudentMess() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-display text-xl">Mess Menu — Week 12</h1>
        <p className="text-body text-sm">Updated weekly by administration</p>
      </div>

      <div className="space-y-2">
        {days.map((day, i) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`bg-card rounded-xl shadow-card p-4 ${day === today ? "ring-2 ring-primary/20" : ""}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm text-display font-medium">{day}</h3>
              {day === today && <span className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded">Today</span>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["breakfast", "lunch", "snacks", "dinner"] as const).map(meal => (
                <div key={meal}>
                  <p className="text-xs text-muted-foreground capitalize mb-0.5">{meal}</p>
                  <p className="text-xs text-foreground">{messMenu[day][meal]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
