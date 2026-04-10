import { cn } from "@/lib/utils";

type Status = "pending" | "progress" | "resolved" | "approved" | "rejected" | "paid" | "overdue";

const styles: Record<Status, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  progress: "bg-blue-50 text-blue-700 ring-blue-600/20",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  rejected: "bg-red-50 text-red-700 ring-red-600/20",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  overdue: "bg-red-50 text-red-700 ring-red-600/20",
};

const labels: Record<Status, string> = {
  pending: "Pending",
  progress: "In Progress",
  resolved: "Resolved",
  approved: "Approved",
  rejected: "Rejected",
  paid: "Paid",
  overdue: "Overdue",
};

const icons: Record<Status, string> = {
  pending: "●",
  progress: "◐",
  resolved: "✓",
  approved: "✓",
  rejected: "✕",
  paid: "✓",
  overdue: "!",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ring-1 ring-inset tabular", styles[status], className)}>
      <span className="text-[10px]">{icons[status]}</span>
      {labels[status]}
    </span>
  );
}
