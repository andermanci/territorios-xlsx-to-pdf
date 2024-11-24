import { renderers } from './renderers.mjs';
import { manifest } from './manifest_B9B8a4I7.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DNWUHG1t.mjs');
const _page1 = () => import('./chunks/sheets_BEVFkWMk.mjs');
const _page2 = () => import('./chunks/sheets_a-zQIy1o.mjs');
const _page3 = () => import('./chunks/_id__DomSmsoq.mjs');
const _page4 = () => import('./chunks/index_Dd4sNFag.mjs');
const _page5 = () => import('./chunks/index_DlZ6-we-.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/dashboard/sheets.ts", _page1],
    ["src/pages/dashboard/sheets.astro", _page2],
    ["src/pages/dashboard/[id].astro", _page3],
    ["src/pages/dashboard/index.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "48124144-aba0-4934-adb9-7a84afb7d6c0"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
