import { useTerritoriosStore } from "@/store/territoriosStore"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { useState } from "react";
import 'fs'

import { Datepicker, Button } from 'flowbite-react';


export function PDFGenerator({ basePdf }) {

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
    } = useTerritoriosStore(state => state)

    const [selectedDate, setSelectedDate] = useState(null);

    const TERRITORIES_PER_PAGE = 20;

    const handleClick = async () => {

        Object.entries(jsonData).forEach(async function(data) {

            const basePdfDoc = await PDFDocument.load(basePdf);

            const pdfDoc = await PDFDocument.load(basePdf);
            fontObj = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const sheetName = data[0];
            const territories = data[1];

            if (sheetName == 'Calculos') return;

            territories.forEach(async function(territory, index) {
                if (index % TERRITORIES_PER_PAGE == 0 && index >= TERRITORIES_PER_PAGE) {
                    const [basePage] = await pdfDoc.copyPages(basePdfDoc, [0]);
                    pdfDoc.addPage(basePage);
                }

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
    }

    const paintYear = () => {
        const date = new Date();
        const month = date.getMonth();
        let year = date.getFullYear();
        if (month < 8) {
            year --;
        }
        
        const fontSize = 12;

        currentPage.drawText(year.toString(), {
            x: X_YEAR - calcX(year.toString(), fontSize),
            y: Y_YEAR,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

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
    }

    const paintTerritoryNum = (territory) => {
        const fontSize = 10;

        currentPage.drawText(territory.num.toString(), {
            x: currentX - calcX(territory.num.toString(), fontSize),
            y: currentY,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

    const paintTerritoryLastDate = (territory) => {
        const fontSize = 10;

        currentPage.drawText(territory.lastDate, {
            x: currentX - calcX(territory.lastDate, fontSize),
            y: currentY,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

    const paintTerritoryRegistry = (registry) => {
        registry.forEach(assignment => {
            if (isAssignmentInDateRange(assignment)) {
                paintAssignmentName(assignment);
                paintAssignmentDates(assignment);

                currentX += 106.6;
            }
        });
    }

    const isAssignmentInDateRange = (assignment) => {
        const firstDate = new Date(getFormattedDate(assignment.firstDate));
        const secondDate = new Date(getFormattedDate(assignment.secondDate));

        return selectedDate < firstDate || selectedDate < secondDate;
    }

    const paintAssignmentName = (assignment) => {
        const fontSize = 9;

        currentPage.drawText(assignment.name, {
            x: currentX - calcX(assignment.name, fontSize),
            y: currentY + 7.5,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

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
    }

    const addBasePdf = async (pdfDoc) => {
        const basePdfDoc = await PDFDocument.load(basePdf);

        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
            const [page] = await basePdfDoc.copyPages(pdfDoc, [0]);
            pdfDoc(page);
        }
    }

    const createDocWithBasePdf = async (pdfDoc) => {
        const basePdfDoc = await PDFDocument.load(basePdf);

        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
            const [page] = await pdfDocWithBase.copyPages(pdfDoc, [i]);
            pdfDocWithBase.embedPage(page);
        }

        return pdfDocWithBase;
    }

    const downloadPdf = async (pdfDoc, sheetName) => {
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${sheetName}.pdf`;

        a.click();

        URL.revokeObjectURL(url);
        
        setJsonData(null);
    }

    const calcX = (text, size) => {
        return fontObj.widthOfTextAtSize(text, size) / 2;
    }

    const getFormattedDate = (date) => {
        if (!date) {
            return '';
        }

        const split = date.split('/');
        const day = split[0];
        const month = split[1];
        const year = split[2];

        return `${month}-${day}-${year}`;
    }

    return (
        <section className="flex flex-col w-full">
            {jsonData && (
                <div className="flex flex-col items-center gap-12">
                    <div className="flex gap-8 justify-center">
                        {
                            Object.keys(jsonData).map((key) => (
                                <article key={key} className="flex gap-4 items-center p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                    <img src="/images/Google_Sheets_Logo.png" className="h-[40px]"/>
                                    <span>{key}</span>
                                </article>
                            ))
                        }
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h5 className="text-2xl font-bold text-center">Selecciona una fecha</h5>
                        <p className="font-thin mb-4 text-center">Los datos exportados serán a partir de la fecha seleccionada</p>
                        <Datepicker
                            language="es-ES"
                            onSelectedDateChanged={setSelectedDate}
                            weekStart={1}
                            labelTodayButton="Hoy"
                            labelClearButton="Limpar"
                        />
                    </div>
                    <Button onClick={handleClick}>Generar PDF</Button>
                </div>
            )}
        </section>
    )
} 