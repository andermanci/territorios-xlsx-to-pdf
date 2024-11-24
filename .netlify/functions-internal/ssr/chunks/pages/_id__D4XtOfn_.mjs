/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate } from '../astro_Ck5MVThS.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  return renderTemplate`<!-- <Dashboard title="Dashboard">
	<SheetSelector sheets={sheets} selectedSheetId={id}/>
    { spreadSheetData && (
        <Stats data={spreadSheetData}/>
    )}
</Dashboard> -->`;
}, "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/[id].astro", void 0);

const $$file = "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/[id].astro";
const $$url = "/dashboard/[id]";

export { $$id as default, $$file as file, $$url as url };
