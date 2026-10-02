import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as listAdminVideos } from "./community-C13aOkMU.mjs";
import { a as youtubeThumb, o as youtubeWatchUrl } from "./utils-C3vUXC4L.mjs";
import { t as Button } from "./button-CIZ_yk94.mjs";
import { t as Card } from "./card-CV_4R-OM.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Input } from "./input-DvY4bSDz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-1eieGpCf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEATURED_VIDEOS = [
	{
		title: "Algebra Basics",
		channel: "TabletClass Math",
		yt: "NybHckSEQBI",
		topic: "Mathematics",
		tags: "math algebra"
	},
	{
		title: "Fractions Explained",
		channel: "Math Antics",
		yt: "4Tk7D4xG5cE",
		topic: "Mathematics",
		tags: "math fractions"
	},
	{
		title: "Linear Equations",
		channel: "Khan Academy",
		yt: "bAerID24QJ0",
		topic: "Mathematics",
		tags: "math equations"
	},
	{
		title: "Quadratic Equations",
		channel: "Khan Academy",
		yt: "i7idZfS8t8w",
		topic: "Mathematics",
		tags: "math quadratic"
	},
	{
		title: "Pythagoras Theorem",
		channel: "Math Antics",
		yt: "AA6RfgP-AHU",
		topic: "Mathematics",
		tags: "math geometry"
	},
	{
		title: "Percentages",
		channel: "Math Antics",
		yt: "JeDhaAsj1OQ",
		topic: "Mathematics",
		tags: "math percent"
	},
	{
		title: "Introduction to Cells",
		channel: "Amoeba Sisters",
		yt: "8IlzKri08kk",
		topic: "Biology",
		tags: "biology cells"
	},
	{
		title: "Photosynthesis",
		channel: "Amoeba Sisters",
		yt: "uixA8ZXx0KU",
		topic: "Biology",
		tags: "biology plants"
	},
	{
		title: "DNA Structure",
		channel: "Amoeba Sisters",
		yt: "8vXoMqWvxYw",
		topic: "Biology",
		tags: "biology dna genetics"
	},
	{
		title: "Mitosis",
		channel: "Amoeba Sisters",
		yt: "f-ldPgEfAHI",
		topic: "Biology",
		tags: "biology cell division"
	},
	{
		title: "Enzymes",
		channel: "Amoeba Sisters",
		yt: "ok9esggzN18",
		topic: "Biology",
		tags: "biology enzymes"
	},
	{
		title: "Ecology Intro",
		channel: "Amoeba Sisters",
		yt: "SjPmA4XXnM0",
		topic: "Biology",
		tags: "biology ecology"
	},
	{
		title: "Newton Laws",
		channel: "Professor Dave",
		yt: "CQYELiTtUs8",
		topic: "Physics",
		tags: "physics motion"
	},
	{
		title: "Electric Circuits",
		channel: "FuseSchool",
		yt: "m4X5ZN8wQxw",
		topic: "Physics",
		tags: "physics electricity"
	},
	{
		title: "Waves Basics",
		channel: "FuseSchool",
		yt: "7yPTa8qi5X8",
		topic: "Physics",
		tags: "physics waves"
	},
	{
		title: "Energy Forms",
		channel: "FuseSchool",
		yt: "8kQdPZGp3jY",
		topic: "Physics",
		tags: "physics energy"
	},
	{
		title: "Atomic Structure",
		channel: "FuseSchool",
		yt: "EMDrb2LqL7E",
		topic: "Chemistry",
		tags: "chemistry atoms"
	},
	{
		title: "Periodic Table",
		channel: "Periodic Videos",
		yt: "0RRVV4Diomg",
		topic: "Chemistry",
		tags: "chemistry elements"
	},
	{
		title: "Chemical Reactions",
		channel: "FuseSchool",
		yt: "8m6hHMuKOMY",
		topic: "Chemistry",
		tags: "chemistry reactions"
	},
	{
		title: "Acids and Bases",
		channel: "FuseSchool",
		yt: "OP62ApPq3lY",
		topic: "Chemistry",
		tags: "chemistry acids"
	},
	{
		title: "Organic Chemistry Intro",
		channel: "Professor Dave",
		yt: "6uyn6JIRKmw",
		topic: "Chemistry",
		tags: "chemistry organic"
	},
	{
		title: "Parts of Speech",
		channel: "English with Lucy",
		yt: "vdpTz1YuQyw",
		topic: "English",
		tags: "english grammar"
	},
	{
		title: "Essay Writing",
		channel: "English with Lucy",
		yt: "o9aJVVT2F5Y",
		topic: "English",
		tags: "english essay"
	},
	{
		title: "Tenses Overview",
		channel: "English with Lucy",
		yt: "sCiEAKR3bwY",
		topic: "English",
		tags: "english tenses"
	},
	{
		title: "Map Skills",
		channel: "Geography Now",
		yt: "1KieyP0WFbs",
		topic: "Geography",
		tags: "geography maps"
	},
	{
		title: "Climate Zones",
		channel: "National Geographic",
		yt: "hbdL2sYgG88",
		topic: "Geography",
		tags: "geography climate"
	},
	{
		title: "Plate Tectonics",
		channel: "National Geographic",
		yt: "ryrXAGY1dmE",
		topic: "Geography",
		tags: "geography earth"
	},
	{
		title: "Water Cycle",
		channel: "National Geographic",
		yt: "al-do-PGuIk",
		topic: "Geography",
		tags: "geography water"
	},
	{
		title: "Computer Basics",
		channel: "LearnFree",
		yt: "y2kg3MOk1sY",
		topic: "ICT",
		tags: "ict computer"
	},
	{
		title: "Internet Safety",
		channel: "Common Sense",
		yt: "aQ3ehXWXvOE",
		topic: "ICT",
		tags: "ict safety"
	},
	{
		title: "How Computers Work",
		channel: "Crash Course",
		yt: "OAx_6gVDgFw",
		topic: "ICT",
		tags: "ict hardware"
	},
	{
		title: "Coding Intro",
		channel: "freeCodeCamp",
		yt: "zOjov-2OZ0E",
		topic: "ICT",
		tags: "ict coding"
	},
	{
		title: "History Study Tips",
		channel: "Crash Course",
		yt: "Yocja_N5s1I",
		topic: "History",
		tags: "history revision"
	},
	{
		title: "Agriculture Basics",
		channel: "National Geographic",
		yt: "hLkC7vqVlAY",
		topic: "Agriculture",
		tags: "agriculture farming"
	},
	{
		title: "Study Skills",
		channel: "TED-Ed",
		yt: "IlU-zDU6aQ0",
		topic: "Study Skills",
		tags: "study revision"
	},
	{
		title: "Memory Techniques",
		channel: "TED-Ed",
		yt: "6v75sKAUFdc",
		topic: "Study Skills",
		tags: "study memory"
	},
	{
		title: "Exam Stress Tips",
		channel: "TED-Ed",
		yt: "rcGdWzF2uqA",
		topic: "Study Skills",
		tags: "study stress"
	},
	{
		title: "Human Body Systems",
		channel: "Amoeba Sisters",
		yt: "OgQ7p2bJaY8",
		topic: "Biology",
		tags: "biology body"
	},
	{
		title: "Stoichiometry",
		channel: "Khan Academy",
		yt: "UL1jmJaUkaQ",
		topic: "Chemistry",
		tags: "chemistry mole"
	},
	{
		title: "Trigonometry Intro",
		channel: "Khan Academy",
		yt: "PUBOjXliBVM",
		topic: "Mathematics",
		tags: "math trig"
	}
];
function MediaPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const admin = useQuery({
		queryKey: ["admin-videos"],
		queryFn: () => listAdminVideos()
	});
	const list = (0, import_react.useMemo)(() => {
		const all = [...(admin.data ?? []).map((v) => ({
			title: v.title,
			channel: v.channel,
			yt: v.youtubeId,
			topic: v.topic,
			tags: `${v.topic} admin`
		})), ...FEATURED_VIDEOS];
		const query = q.trim().toLowerCase();
		if (!query) return all;
		return all.filter((v) => [
			v.title,
			v.channel,
			v.topic,
			v.tags
		].join(" ").toLowerCase().includes(query));
	}, [admin.data, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "view-enter space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Study Media"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Featured educational videos. Search opens more on YouTube."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search algebra, photosynthesis, map skills…",
					value: q,
					onChange: (e) => setQ(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${q || "secondary school revision"} education tutorial`)}`,
						target: "_blank",
						rel: "noreferrer",
						children: "Search on YouTube"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [list.length, " videos"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: youtubeWatchUrl(v.yt),
					target: "_blank",
					rel: "noreferrer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: youtubeThumb(v.yt),
							alt: "",
							className: "aspect-video w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-medium",
								children: v.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									v.topic,
									" · ",
									v.channel
								]
							})]
						})]
					})
				}, `${v.yt}-${v.title}`))
			})
		]
	});
}
//#endregion
export { MediaPage as component };
