/* empty css                         */
import { c as createAstro, d as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent, m as maybeRenderHead } from '../astro_Ck5MVThS.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { create } from 'zustand';
import * as XLSX from 'xlsx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';
import { Datepicker, Button } from 'flowbite-react';
import fs from 'fs';

const $$Astro$2 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`<!-- <Dashboard title="Dashboard">
	<SheetSelector sheets={sheets} selectedSheetId=null/>
</Dashboard> -->`;
}, "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/index.astro", void 0);

const $$file$1 = "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/dashboard/index.astro";
const $$url$1 = "/dashboard";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="mx-auto min-h-screen max-w-6xl px-4"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/layouts/Layout.astro", void 0);

const useTerritoriosStore = create((set) => ({
  jsonData: null,
  setJsonData: (jsonData) => set({ jsonData })
}));

function FileUploader() {
  const {
    jsonData,
    setJsonData
  } = useTerritoriosStore((state) => state);
  const START_ROW = 11;
  const NUM_COL = "E";
  const LASTDATE_COL = "F";
  const FIRSTASSIGNED_COL = "G";
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e2) => {
      const data = new Uint8Array(e2.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetData = {};
      workbook.SheetNames.forEach((sheetName) => {
        if (sheetName != "Calculos") {
          const worksheet = workbook.Sheets[sheetName];
          sheetData[sheetName] = getSheetData(worksheet);
        }
      });
      console.log({ sheetData });
      setJsonData(sheetData);
    };
    reader.readAsArrayBuffer(file);
  };
  const getSheetData = (worksheet) => {
    let currentRow = START_ROW;
    const response = [];
    let rowValid = worksheet[`${NUM_COL}${currentRow}`]?.v;
    while (rowValid) {
      const rowData = getRowData(worksheet, currentRow);
      response.push(rowData);
      currentRow += 2;
      rowValid = worksheet[`${NUM_COL}${currentRow}`]?.v;
    }
    return response;
  };
  const getRowData = (worksheet, currentRow) => {
    const num = worksheet[`${NUM_COL}${currentRow}`]?.v;
    const lastDate = worksheet[`${LASTDATE_COL}${currentRow}`]?.w;
    const registry = [];
    let currentCol = FIRSTASSIGNED_COL;
    let assignedValid = worksheet[`${currentCol}${currentRow}`]?.v;
    while (assignedValid) {
      const assignedData = getAssignedData(worksheet, currentCol, currentRow);
      registry.push(assignedData);
      currentCol = stepColumn(currentCol, 2);
      assignedValid = worksheet[currentCol + currentRow]?.v;
    }
    return { num, lastDate, registry };
  };
  const getAssignedData = (worksheet, currentCol, currentRow) => {
    console.log(worksheet[`${currentCol}${currentRow + 1}`]);
    const name = worksheet[`${currentCol}${currentRow}`].v;
    const firstDate = worksheet[`${currentCol}${currentRow + 1}`]?.w;
    const secondDate = worksheet[`${stepColumn(currentCol, 1)}${currentRow + 1}`]?.w;
    return { name, firstDate, secondDate };
  };
  const stepColumn = (col, step) => {
    return String.fromCharCode(col.charCodeAt(0) + step);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: !jsonData && /* @__PURE__ */ jsx("section", { className: "flex flex-col gap-8 w-full", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsxs("label", { htmlFor: "dropzone-file", className: "relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 16", children: /* @__PURE__ */ jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" }) }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm text-gray-500 dark:text-gray-400", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Haz click para subir un archivo" }),
        " o arrástralo aquí"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Formato XLSX" })
    ] }),
    /* @__PURE__ */ jsx("input", { id: "dropzone-file", type: "file", accept: ".xlsx", onChange: handleFileUpload, className: "absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" })
  ] }) }) }) });
}

function PDFGenerator({ basePdf }) {
  const X_YEAR = 163;
  const Y_YEAR = 748;
  const Y_START = 677;
  const X_START = 54;
  let currentX = X_START;
  let currentY = Y_START;
  let fontObj;
  let currentPage;
  const {
    jsonData,
    setJsonData
  } = useTerritoriosStore((state) => state);
  const [selectedDate, setSelectedDate] = useState(null);
  const TERRITORIES_PER_PAGE = 20;
  const handleClick = async () => {
    Object.entries(jsonData).forEach(async function(data) {
      const pdfDoc = await PDFDocument.load(basePdf);
      fontObj = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const sheetName = data[0];
      const territories = data[1];
      if (sheetName == "Calculos")
        return;
      await addPages(territories, pdfDoc);
      territories.forEach(async function(territory, index) {
        if (index % TERRITORIES_PER_PAGE == 0) {
          currentPage = pdfDoc.getPage(Math.floor(index / TERRITORIES_PER_PAGE));
          currentX = X_START;
          currentY = Y_START;
          paintYear();
        }
        paintTerritory(territory);
        currentX = X_START;
        currentY -= 31.3;
      });
      downloadPdf(pdfDoc, sheetName);
    });
  };
  const addPages = async (territories, pdfDoc) => {
    const pagesTotal = Math.ceil(territories.length / TERRITORIES_PER_PAGE);
    const basePdfDoc = await PDFDocument.load(basePdf);
    for (let i = 0; i < pagesTotal - 1; i++) {
      const [basePage] = await pdfDoc.copyPages(basePdfDoc, [0]);
      pdfDoc.addPage(basePage);
    }
  };
  const paintYear = () => {
    const date = /* @__PURE__ */ new Date();
    const month = date.getMonth();
    let year = date.getFullYear();
    if (month < 8) {
      year--;
    }
    const fontSize = 12;
    currentPage.drawText(year.toString(), {
      x: X_YEAR - calcX(year.toString(), fontSize),
      y: Y_YEAR,
      size: fontSize,
      color: rgb(0, 0, 0)
    });
  };
  const paintTerritory = (territory) => {
    paintTerritoryNum(territory);
    currentX += 49;
    if (territory.lastDate) {
      paintTerritoryLastDate(territory);
    }
    currentX += 85;
    if (territory.registry && territory.registry.length > 0) {
      paintTerritoryRegistry(territory.registry);
    }
  };
  const paintTerritoryNum = (territory) => {
    const fontSize = 10;
    currentPage.drawText(territory.num.toString(), {
      x: currentX - calcX(territory.num.toString(), fontSize),
      y: currentY,
      size: fontSize,
      color: rgb(0, 0, 0)
    });
  };
  const paintTerritoryLastDate = (territory) => {
    const fontSize = 10;
    currentPage.drawText(territory.lastDate, {
      x: currentX - calcX(territory.lastDate, fontSize),
      y: currentY,
      size: fontSize,
      color: rgb(0, 0, 0)
    });
  };
  const paintTerritoryRegistry = (registry) => {
    registry.forEach((assignment) => {
      if (isAssignmentInDateRange(assignment)) {
        paintAssignmentName(assignment);
        paintAssignmentDates(assignment);
        currentX += 106.6;
      }
    });
  };
  const isAssignmentInDateRange = (assignment) => {
    const firstDate = new Date(getFormattedDate(assignment.firstDate));
    const secondDate = new Date(getFormattedDate(assignment.secondDate));
    return selectedDate < firstDate || selectedDate < secondDate;
  };
  const paintAssignmentName = (assignment) => {
    const fontSize = 9;
    currentPage.drawText(assignment.name, {
      x: currentX - calcX(assignment.name, fontSize),
      y: currentY + 7.5,
      size: fontSize,
      color: rgb(0, 0, 0)
    });
  };
  const paintAssignmentDates = (assignment) => {
    const fontSize = 9;
    if (assignment.firstDate) {
      currentPage.drawText(assignment.firstDate, {
        x: currentX - 26 - calcX(assignment.firstDate, fontSize),
        y: currentY - 7.5,
        size: fontSize,
        color: rgb(0, 0, 0)
      });
    }
    if (assignment.secondDate) {
      currentPage.drawText(assignment.secondDate, {
        x: currentX + 27.5 - calcX(assignment.secondDate, fontSize),
        y: currentY - 7.5,
        size: fontSize,
        color: rgb(0, 0, 0)
      });
    }
  };
  const downloadPdf = async (pdfDoc, sheetName) => {
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sheetName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    setJsonData(null);
  };
  const calcX = (text, size) => {
    return fontObj.widthOfTextAtSize(text, size) / 2;
  };
  const getFormattedDate = (date) => {
    if (!date) {
      return "";
    }
    const split = date.split("/");
    const day = split[0];
    const month = split[1];
    const year = split[2];
    return `${month}-${day}-${year}`;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: jsonData && /* @__PURE__ */ jsx("section", { className: "flex flex-col w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-12", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-8 justify-center", children: Object.keys(jsonData).map((key) => /* @__PURE__ */ jsxs("article", { className: "flex gap-4 items-center p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]", children: [
      /* @__PURE__ */ jsx("img", { src: "/images/Google_Sheets_Logo.png", className: "h-[40px]" }),
      /* @__PURE__ */ jsx("span", { children: key })
    ] }, key)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx("h5", { className: "text-2xl font-bold text-center", children: "Selecciona una fecha" }),
      /* @__PURE__ */ jsx("p", { className: "font-thin mb-4 text-center", children: "Los datos exportados serán a partir de la fecha seleccionada" }),
      /* @__PURE__ */ jsx(
        Datepicker,
        {
          language: "es-ES",
          onSelectedDateChanged: setSelectedDate,
          weekStart: 1,
          labelTodayButton: "Hoy",
          labelClearButton: "Limpar",
          className: "w-[250px]"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: handleClick, children: "Generar PDF" })
  ] }) }) });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pdfPath = "public/S-13_S.pdf";
  const basePdf = fs.readFileSync(pdfPath);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "xlsx -> pdf" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col gap-y-8 justify-center items-center h-full"> <h1 class="text-5xl text-center font-extralight">EXPORTA TU REGISTRO A PDF</h1> ${renderComponent($$result2, "FileUploader", FileUploader, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FileUploader.jsx", "client:component-export": "FileUploader" })} ${renderComponent($$result2, "PDFGenerator", PDFGenerator, { "basePdf": basePdf, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/PDFGenerator.jsx", "client:component-export": "PDFGenerator" })} <!-- <span>o</span>
		<a href="/dashboard" class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">Abre tu archivo desde Google Sheets</a> --> </main> ` })}`;
}, "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/index.astro", void 0);

const $$file = "/Users/andermancisidorpikabea/Desktop/Proyectos/territorios/territorios-xlsx-to-pdf/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
