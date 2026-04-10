import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { CreditCard, Receipt, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const payments = [
  { id: "1", description: "Hostel Fee - Semester 2", amount: "₹45,000", date: "2026-01-15", status: "paid" as const },
  { id: "2", description: "Mess Fee - March 2026", amount: "₹4,500", date: "2026-03-01", status: "paid" as const },
  { id: "3", description: "Hostel Fee - Semester 3", amount: "₹45,000", date: "2026-04-01", status: "pending" as const },
];

export default function StudentFees() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-display text-xl">Fee Payment</h1>
        <p className="text-body text-sm">View payment history and pay pending fees</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total Paid" value="₹49,500" icon={IndianRupee} />
        <StatCard title="Pending" value="₹45,000" icon={Receipt} />
        <StatCard title="Next Due" value="Apr 1" icon={CreditCard} />
      </div>

      <div className="bg-card rounded-xl shadow-card">
        <div className="p-4 border-b">
          <h2 className="text-display text-sm">Payment History</h2>
        </div>
        <div className="divide-y">
          {payments.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-sm text-display">{p.description}</p>
                <p className="text-xs text-muted-foreground">{p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-display font-medium tabular">{p.amount}</span>
                {p.status === "pending" ? (
                  <Button size="sm" className="text-xs" onClick={() => toast.success("Payment initiated")}>
                    Pay Now
                  </Button>
                ) : (
                  <StatusBadge status={p.status} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
