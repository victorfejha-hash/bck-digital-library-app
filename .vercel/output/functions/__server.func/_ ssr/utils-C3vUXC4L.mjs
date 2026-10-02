import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C3vUXC4L.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function driveFileId(url) {
	return url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? null;
}
function driveOpenUrl(url) {
	const id = driveFileId(url);
	return id ? `https://drive.google.com/file/d/${id}/view` : url;
}
function youtubeWatchUrl(id) {
	return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
}
function youtubeThumb(id) {
	return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
function extractYoutubeId(input) {
	const s = input.trim();
	if (/^[\w-]{11}$/.test(s)) return s;
	return s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/|live\/))([\w-]{11})/)?.[1] ?? "";
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return "B";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
//#endregion
export { youtubeThumb as a, initials as i, driveOpenUrl as n, youtubeWatchUrl as o, extractYoutubeId as r, cn as t };
