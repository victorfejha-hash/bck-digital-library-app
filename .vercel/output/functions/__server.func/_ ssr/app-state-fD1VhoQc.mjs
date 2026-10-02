import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as listNotifications } from "./community-C13aOkMU.mjs";
import { n as ensureProfile } from "./profile-BXAVSI7O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-state-fD1VhoQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AppStateContext = (0, import_react.createContext)(null);
function AppStateProvider({ children }) {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const [p, notes] = await Promise.all([ensureProfile(), listNotifications()]);
			setProfile(p);
			setUnread(notes.filter((n) => !n.read).length);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppStateContext.Provider, {
		value: {
			profile,
			unread,
			refresh
		},
		children
	});
}
function useAppState() {
	const ctx = (0, import_react.useContext)(AppStateContext);
	if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
	return ctx;
}
//#endregion
export { useAppState as n, AppStateProvider as t };
