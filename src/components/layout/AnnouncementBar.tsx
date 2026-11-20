import { Phone } from "lucide-react";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE } from "@/constants/site";
import { telHref } from "@/lib/utils";

export function AnnouncementBar() {
  return (
    <div className="bg-zinc-950 text-[12px] text-zinc-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <OpenStatus className="shrink-0 font-medium text-zinc-200" />
          <span className="hidden h-3 w-px bg-zinc-700 md:block" />
          <span className="hidden truncate md:block">
            Fabrication et pose partout en Tunisie
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="arabic hidden text-[13px] text-zinc-400 lg:block">
            الطباعة الرقمية والإشهار المتكامل في تونس
          </span>
          <a
            href={telHref(SITE.phones[0])}
            className="hidden items-center gap-1.5 font-semibold text-white transition hover:text-brand-500 sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phones.join(" / ")}
          </a>
          <SocialLinks tone="dark" size="sm" />
        </div>
      </div>
    </div>
  );
}
