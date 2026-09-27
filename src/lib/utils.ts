import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const full = digits.startsWith("216") ? digits : `216${digits}`;
  return `https://wa.me/${full}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string) {
  return `tel:+216${phone.replace(/\D/g, "")}`;
}
