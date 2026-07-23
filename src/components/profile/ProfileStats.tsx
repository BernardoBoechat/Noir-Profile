import { CalendarDays, Eye, MapPin } from "lucide-react";
import { formatNumber } from "@/utils/formatNumber";

interface ProfileStatsProps {
  views: number;
  joinedAt: string;
  location?: string;
}
export function ProfileStats({
  views,
  joinedAt,
  location,
}: ProfileStatsProps): React.JSX.Element {
  const date = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(joinedAt));
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[.08em] text-white/35 min-[380px]:gap-x-4 min-[380px]:text-[11px]">
      <span className="flex items-center gap-1.5">
        <Eye size={14} />
        {formatNumber(views)} views
      </span>
      {location && (
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {location}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <CalendarDays size={14} />
        desde {date}
      </span>
    </div>
  );
}
