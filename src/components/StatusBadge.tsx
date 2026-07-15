import { type ApparitionStatus, STATUS_LABEL } from "@/data/apparitions";

const statusStyles: Record<ApparitionStatus, string> = {
  approved:
    "bg-emerald-400/15 text-emerald-200 border-emerald-300/30",
  worthy:
    "bg-sky-400/15 text-sky-200 border-sky-300/30",
  investigation:
    "bg-amber-400/15 text-amber-200 border-amber-300/30",
  not_approved:
    "bg-rose-400/15 text-rose-200 border-rose-300/30",
};

const statusDot: Record<ApparitionStatus, string> = {
  approved: "bg-emerald-300",
  worthy: "bg-sky-300",
  investigation: "bg-amber-300",
  not_approved: "bg-rose-300",
};

export function StatusBadge({ status }: { status: ApparitionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-md ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]} animate-halo`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
