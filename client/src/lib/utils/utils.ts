import { format, formatDistanceToNow, type DateArg } from "date-fns";
import { z } from "zod";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatDate(date: DateArg<Date>): string {
  return format(date, "dd MMM yyyy h:mm a");
}

export function timeAgo(date: DateArg<Date>) {
  return formatDistanceToNow(date) + " ago";
}

export const requiredString = (fieldName: string) =>
  z.string().min(1, { message: `${fieldName} is required` });


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
