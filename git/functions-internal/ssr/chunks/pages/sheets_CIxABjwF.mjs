/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate } from '../astro_Ck5MVThS.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Sheets = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sheets;
  return renderTemplate`<!-- <Dashboard title="Dashboard">
	<section class="flex flex-col items-center gap-12">
        <Typography as="h1" variant="big" color="black" class:list={"text-center"}>
            MIS PLANTILLAS
        </Typography>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-x-12 md:gap-y-12 w-full">
            { sheets.map((sheet: any) => {
                return (
                    <article class="p-8 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex items-center gap-6 cursor-pointer">
                        <img src="/images/Google_Sheets_Logo.png" class="h-[80px]"/>
                        <div class="flex flex-col gap-2">
                            <Typography as="span" variant="body-bold" color="black" class:list={""}>
                                { sheet.name }
                            </Typography>
                            <Typography as="span" variant="body" color="black" class:list={"break-all"}>
                                { sheet.sheetId }
                            </Typography>
                        </div>
                    </article>
                )
            })}
            <article class="p-8 rounded shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex items-center gap-6 cursor-pointer" onclick="newSheet.showModal()">
                <AddIcon class="w-[40px]"/>
                <Typography as="span" variant="body" color="black" class:list={""}>
                    Añadir nueva plantilla
                </Typography>
            </article>
        </div>
    </section>

    <dialog id="newSheet" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form class="w-full flex flex-col gap-6" method="post" action="/api/dashboard/sheets">
                <h3 class="font-bold text-lg">Nueva plantilla</h3>
                <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Nombre de la plantilla</span>
                    </div>
                    <input type="text" id="name" name="name" placeholder="Territorios" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">ID de la plantilla</span>
                    </div>
                    <input type="text" id="sheetId" name="sheetId" placeholder="Ejemplo: 118rMJGygRlZfCZ7z14uzJ8h4VplQYjmURh27YoT-9Dd" class="input input-bordered w-full" />
                </label>
                <div class="modal-action">
                    <button type="submit" id="save-sheet" class="btn">Guardar</button>
                </div>
            </form>
        </div>
    </dialog>
</Layout> -->`;
}, "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/sheets.astro", void 0);

const $$file = "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/sheets.astro";
const $$url = "/dashboard/sheets";

export { $$Sheets as default, $$file as file, $$url as url };
