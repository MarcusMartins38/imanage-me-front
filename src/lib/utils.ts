import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTime(time: string): string {
	return new Date(time).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

export function formatDuration(duration: string): string {
	const [hours, minutes] = duration.split(":").map(Number);
	return `${hours}h ${minutes}m`;
}
