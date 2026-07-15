import { type ApparitionStatus, STATUS_LABEL } from "@/data/apparitions";

const statusColors: Record<ApparitionStatus, string> = {
  approved: "bg-emerald-100 text-emerald-800",
  worthy: "bg-sky-100 text-sky-800",
  investigation: "bg-amber-100 text-amber-800",
  not_approved: "bg-rose-100 text-rose-800",
};

export function StatusBadge({ status }: { status: ApparitionStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight ${statusColors[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
