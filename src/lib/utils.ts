import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Numéro au format international, chiffres seuls : "26 986 526" → "21626986526".
 * Accepte aussi "+216 …", "00216 …" ou un numéro étranger complet.
 */
function intlDigits(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits.length <= 8 ? `216${digits}` : digits;
}

export function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${intlDigits(phone)}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string) {
  return `tel:+${intlDigits(phone)}`;
}
