import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_Ck5MVThS.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/dashboard/sheets","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/dashboard\\/sheets\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"sheets","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/dashboard/sheets.ts","pathname":"/api/dashboard/sheets","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.n25bekPt.css"}],"routeData":{"route":"/dashboard/sheets","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/sheets\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"sheets","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/sheets.astro","pathname":"/dashboard/sheets","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.n25bekPt.css"}],"routeData":{"route":"/dashboard/[id]","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/([^/]+?)\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/dashboard/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.n25bekPt.css"}],"routeData":{"route":"/dashboard","isIndex":true,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard/index.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_id_.n25bekPt.css"},{"type":"inline","content":"html{font-family:system-ui,sans-serif;background-size:224px}body{width:100vw;height:100vh}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/dashboard/[id].astro":"chunks/pages/_id__D4XtOfn_.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_C0vWghUB.mjs","/src/pages/dashboard/sheets.astro":"chunks/pages/sheets_CIxABjwF.mjs","/src/pages/api/dashboard/sheets.ts":"chunks/pages/sheets_l0sNRNKZ.mjs","\u0000@astrojs-manifest":"manifest_B9B8a4I7.mjs","/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DNWUHG1t.mjs","\u0000@astro-page:src/pages/api/dashboard/sheets@_@ts":"chunks/sheets_BEVFkWMk.mjs","\u0000@astro-page:src/pages/dashboard/sheets@_@astro":"chunks/sheets_a-zQIy1o.mjs","\u0000@astro-page:src/pages/dashboard/[id]@_@astro":"chunks/_id__DomSmsoq.mjs","\u0000@astro-page:src/pages/dashboard/index@_@astro":"chunks/index_Dd4sNFag.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DlZ6-we-.mjs","@astrojs/react/client.js":"_astro/client.DRtVOg_I.js","@/components/FileUploader.jsx":"_astro/FileUploader.BW4m283n.js","@/components/PDFGenerator.jsx":"_astro/PDFGenerator.DjZN1ul4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_id_.n25bekPt.css","/S-13_S.pdf","/favicon.svg","/logo.png","/_astro/FileUploader.BW4m283n.js","/_astro/PDFGenerator.DjZN1ul4.js","/_astro/client.DRtVOg_I.js","/_astro/index.CfyKTq7u.js","/_astro/index.D3g0PtM7.js","/_astro/territoriosStore.C2Av7rrX.js","/images/Google_Sheets_Logo.png"],"buildFormat":"directory"});

export { manifest };
