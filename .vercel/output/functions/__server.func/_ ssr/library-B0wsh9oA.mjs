import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DJKpphXP.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-B0wsh9oA.js
var listSavedIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e322f61474ec82bf9c08e4c992f16676bc80e6be81cd9aff4f6654776aeab7e0"));
var toggleSaved = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((resourceId) => resourceId.trim()).handler(createSsrRpc("f148e0d81073df91c932c9f11cf28cfcee0e5613fa378945aff6a793bf6871e3"));
//#endregion
export { toggleSaved as n, listSavedIds as t };
