//#region node_modules/.nitro/vite/services/ssr/assets/ai-fallback-BzzGZSyw.js
var FALLBACK = [
	{
		keys: ["photosynthesis"],
		answer: "Photosynthesis is how green plants make food. Chlorophyll in the leaves traps sunlight. Carbon dioxide from air and water from roots combine to form glucose, and oxygen is released. Word equation: carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll). Revise limiting factors: light intensity, CO2 concentration and temperature."
	},
	{
		keys: ["pythagoras", "hypotenuse"],
		answer: "Pythagoras’ theorem: in a right-angled triangle, a² + b² = c², where c is the hypotenuse (the side opposite the right angle). To find a shorter side, rearrange: a² = c² − b². Always check that the triangle is right-angled before using it."
	},
	{
		keys: [
			"algebra",
			"equation",
			"solve for"
		],
		answer: "To solve a linear equation, do the same operation to both sides. Expand brackets first, collect like terms, then isolate the unknown. Example: 2(x − 3) = 14 → 2x − 6 = 14 → 2x = 20 → x = 10. Check by substituting back."
	},
	{
		keys: [
			"atom",
			"proton",
			"electron",
			"periodic"
		],
		answer: "Atoms have a nucleus of protons and neutrons, with electrons in shells. Atomic number = protons. Mass number = protons + neutrons. Group number hints at outer electrons; period number is the number of shells. Neutral atoms have equal protons and electrons."
	},
	{
		keys: [
			"cell",
			"mitochondria",
			"nucleus"
		],
		answer: "Animal and plant cells share a nucleus, cytoplasm, cell membrane and mitochondria. Plant cells also have a cell wall, chloroplasts and a large vacuole. Mitochondria release energy by respiration; the nucleus holds DNA that controls the cell."
	},
	{
		keys: [
			"kampala",
			"uganda",
			"equator",
			"map scale"
		],
		answer: "Uganda is in East Africa; Kampala is the capital. The equator is 0° latitude. Map scale 1:50,000 means 1 cm on the map represents 50,000 cm = 500 m on the ground. Always state units when converting scale."
	},
	{
		keys: [
			"password",
			"https",
			"virus",
			"ict"
		],
		answer: "Use a long unique password and never share it. HTTPS means the connection is encrypted. Avoid untrusted downloads and email attachments — that is how many viruses spread. Hardware is physical (keyboard); software is programs (Word, Chrome)."
	},
	{
		keys: [
			"exam",
			"revise",
			"study"
		],
		answer: "Plan revision in short focused blocks, practise past-paper questions, and mark against a scheme. Sleep, water and timed practice matter as much as notes. For BCK papers, show working, label diagrams, and attempt every part of a question."
	}
];
function offlineTutorAnswer(question) {
	const q = question.toLowerCase();
	const hit = FALLBACK.find((item) => item.keys.some((k) => q.includes(k)));
	if (hit) return hit.answer;
	return "I could not reach the live coach just now. Try a more specific topic — for example photosynthesis, Pythagoras, linear equations, atomic structure, cells, map scale, or exam technique — or check your connection and ask again.";
}
//#endregion
export { offlineTutorAnswer as t };
