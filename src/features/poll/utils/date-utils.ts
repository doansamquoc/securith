import { formatDuration, intervalToDuration, type Locale } from "date-fns";
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

export function toUnixBigInt(date: Date) {
  return BigInt(Math.floor(date.getTime() / 1000));
}

export function fromUnixBigInt(unix: bigint) {
  return new Date(Number(unix) * 1000);
}

export function formatUnixToVNDateString(unix: bigint) {
  const date = fromUnixBigInt(unix);
  return date.toLocaleDateString("vn", { day: "2-digit", month: "long", year: "numeric" });
}
