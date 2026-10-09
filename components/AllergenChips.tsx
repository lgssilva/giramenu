"use client";

import { ALLERGENS, type Allergen } from "@/lib/menu";
import { useLang } from "./LangProvider";

export function AllergenChips({ allergens, size = "sm" }: { allergens: Allergen[]; size?: "sm" | "md" }) {
  const { t } = useLang();
  if (!allergens.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {allergens.map((a) => (
        <li
          key={a}
          className={`flex items-center rounded-md bg-surface-high text-on-surface-variant ${
            size === "sm" ? "h-6 px-2 text-[11px] font-medium tracking-wide" : "h-8 px-3 text-[13px] font-medium"
          }`}
        >
          {t(ALLERGENS[a])}
        </li>
      ))}
    </ul>
  );
}
