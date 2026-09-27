"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ListChecks, MessageCircle, Zap } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CONFIG_OPTIONS } from "@/constants/content";
import { SITE, WHATSAPP_MESSAGE } from "@/constants/site";
import { cn, whatsappUrl } from "@/lib/utils";

function SelectField({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <span className="text-brand-600">{icon}</span>
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 pr-10 text-sm font-medium text-slate-800",
            "outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
          )}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  );
}

export function Configurator() {
  const [support, setSupport] = useState<string>(CONFIG_OPTIONS.support[0]);
  const [dimensions, setDimensions] = useState<string>(
    CONFIG_OPTIONS.dimensions[0],
  );
  const [pose, setPose] = useState<string>(CONFIG_OPTIONS.pose[0]);

  const message = `${WHATSAPP_MESSAGE}

• Support : ${support}
• Dimensions : ${dimensions}
• Pose : ${pose}`;

  const wa = whatsappUrl(SITE.phones[0], message);

  return (
    <section id="configurateur" className="bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <AnimateIn>
          <motion.div
            whileHover={{ y: -2 }}
            className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/80 sm:p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
              <div>
                <Badge variant="soft">
                  <ListChecks className="h-3.5 w-3.5" />
                  Configurateur Express
                </Badge>
                <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Calculez Votre Estimation en Quelques Clics
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                  Sélectionnez vos spécifications et recevez une estimation
                  sans engagement directement sur WhatsApp ou par appel atelier.
                </p>
              </div>

              <div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <SelectField
                    label="Support & Technique"
                    icon={<Zap className="h-3.5 w-3.5" />}
                    value={support}
                    options={CONFIG_OPTIONS.support}
                    onChange={setSupport}
                  />
                  <SelectField
                    label="Dimensions & Format"
                    icon={<ListChecks className="h-3.5 w-3.5" />}
                    value={dimensions}
                    options={CONFIG_OPTIONS.dimensions}
                    onChange={setDimensions}
                  />
                  <SelectField
                    label="Pose & Déplacement"
                    icon={<MessageCircle className="h-3.5 w-3.5" />}
                    value={pose}
                    options={CONFIG_OPTIONS.pose}
                    onChange={setPose}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-start gap-2 text-xs text-slate-500 sm:max-w-sm">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    Estimation sans engagement transmise directement sur
                    WhatsApp ou par appel.
                  </p>
                  <Button
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Lancer ma commande rapide
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  );
}
