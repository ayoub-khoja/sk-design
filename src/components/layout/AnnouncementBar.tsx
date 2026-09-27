import { SITE } from "@/constants/site";

export function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:items-center lg:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
            Atelier Ouvert
          </span>
          <span className="text-slate-200">
            Fabrication &amp; Pose Express • Devis gratuit sous 2h
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <span className="arabic text-[13px]">
            الطباعة الرقمية والإشهار المتكامل في تونس
          </span>
          <span className="font-semibold text-white">
            {SITE.phones[0]} • {SITE.phones[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
