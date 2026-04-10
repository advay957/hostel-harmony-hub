import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { User, Mail, Phone, BedDouble, Building2, CreditCard } from "lucide-react";

export default function StudentProfile() {
  const { user } = useAuth();

  const details = [
    { label: "Full Name", value: user?.name, icon: User },
    { label: "Email", value: user?.email, icon: Mail },
    { label: "Phone", value: "+91 98765 43210", icon: Phone },
    { label: "Room Number", value: user?.room, icon: BedDouble },
    { label: "Block", value: `Block ${user?.block}`, icon: Building2 },
    { label: "Fee Status", value: "Paid", icon: CreditCard },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-display text-xl">Profile</h1>
        <p className="text-body text-sm">Your personal information</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl shadow-card p-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-display text-lg">{user?.name}</h2>
            <p className="text-body text-sm">Room {user?.room}, Block {user?.block}</p>
          </div>
        </div>
        <div className="space-y-4">
          {details.map(d => (
            <div key={d.label} className="flex items-center gap-3 py-2 border-b last:border-0">
              <d.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{d.label}</p>
                <p className="text-sm text-display tabular">{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
