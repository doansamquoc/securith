import { formatDistance, formatDistanceToNow, formatDuration, intervalToDuration, type Locale } from "date-fns";
import { vi } from "date-fns/locale";

export function formatDurationUnits(duration: ReturnType<typeof intervalToDuration>) {
  const format: ("years" | "months" | "days" | "hours" | "minutes")[] = [];
  if (duration.years) format.push("years");
  if (duration.months) format.push("months");
  if (duration.days) format.push("days");
  if (duration.hours) format.push("hours");
  if (duration.minutes) format.push("minutes");
  return format;
}

export function formatRelativeTime(date: Date, locale?: Locale) {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locale ?? vi,
  });
}

export function formatCountdown(to: Date, from?: Date, locale?: Locale) {
  const now = from ?? new Date();
  if (to < now) {
    return "Đã kết thúc";
  }
  const distance = formatDistance(to, now, { locale: locale ?? vi });
  return `${distance}`;
}

export function getFormattedDuration(from: Date, to: Date, locale?: Locale) {
  const duration = intervalToDuration({
    start: from,
    end: to,
  });
  return formatDuration(duration, {
    format: formatDurationUnits(duration),
    locale: locale ?? vi,
  });
}

/**
 * Formats a Date object to a string compatible with <input type="datetime-local" />
 * Format: YYYY-MM-DDTHH:mm
 */
export function formatDateTimeLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function toBigInt(date: Date) {
  return BigInt(Math.floor(date.getTime() / 1000));
}

export function toDate(unix: bigint) {
  return new Date(Number(unix) * 1000);
}

export function formatBigIntToDate(unix: bigint) {
  const date = toDate(unix);
  return date.toLocaleDateString("vn", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
