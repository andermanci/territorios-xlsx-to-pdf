import { useTerritoriosStore } from "@/store/territoriosStore"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { useState, useEffect } from "react";
import 'fs'

import { Datepicker, Button } from 'flowbite-react';


export function PDFGenerator({ pdfUrl }) {

    const COLOR_DANGER = rgb(0xff / 255, 0x00 / 255, 0x01 / 255);
    const COLOR_PERSONAL = rgb(0xfb / 255, 0xbc / 255, 0x03 / 255);

    const X_YEAR = 163;
    const Y_YEAR = 748;

    const Y_START = 677;
    const X_START = 54;

    let currentX = X_START;
    let currentY = Y_START;

    let fontObj;
    let currentPage;
    let currentPageNumber = -1;

    let extraPageOffset = 0;

    const [basePdf, setBasePdf] = useState(null);

    useEffect(() => {
        fetch(pdfUrl)
        .then((res) => res.arrayBuffer())
        .then((data) => setBasePdf(data))
        .catch((err) => console.error("Error loading PDF:", err));
    }, [pdfUrl]);

    const {
        jsonData,
        setJsonData
    } = useTerritoriosStore(state => state)

    const [selectedDate, setSelectedDate] = useState(null);

    const TERRITORIES_PER_PAGE = 20;

    const handleClick = async () => {
        if (!basePdf) {
            console.error("Base PDF not loaded");
            return;
        }
    
        const pdfDoc = await PDFDocument.load(basePdf);

        Object.entries(jsonData).forEach(async function(data) {
            fontObj = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const sheetName = data[0];
            const territories = data[1];

            if (sheetName == 'Calculos') return;
            if (sheetName == 'Formulario') return;

            await addPages(territories, pdfDoc);

            territories.forEach(async function(territory, index) {
                const isNewArea = territory.lastDate == undefined;

                if (isNewArea) {
                    extraPageOffset = index % TERRITORIES_PER_PAGE;
                }

                if ((index - extraPageOffset) % TERRITORIES_PER_PAGE == 0 || isNewArea) {
                    currentPageNumber ++;
                    currentPage = pdfDoc.getPage(currentPageNumber);
                    currentX = X_START;
                    currentY = Y_START;
                    paintYear();
                    paintLegend();
                }

                paintTerritory(territory, index);

                currentX = X_START;
                currentY -= 31.3;
            });

            downloadPdf(pdfDoc, sheetName);
        });
    }

    const addPages = async (territories, pdfDoc) => {
        const areas = territories.filter(territory => territory.lastDate == undefined).length;

        const pagesTotal = Math.ceil(territories.length / TERRITORIES_PER_PAGE) + areas - 1;
        const basePdfDoc = await PDFDocument.load(basePdf);

        for (let i = 0; i < pagesTotal - 1; i++) {
            const [basePage] = await pdfDoc.copyPages(basePdfDoc, [0]);
            pdfDoc.addPage(basePage);
        }
    }

    const paintYear = () => {
        const date = new Date();
        const month = date.getMonth();
        let year = date.getFullYear();
        if (month < 8) {
            year --;
        }

        const nextYear = year + 1;
        
        const fontSize = 11;

        currentPage.drawText(year.toString() + '/' + nextYear.toString(), {
            x: X_YEAR - calcX(year.toString() + '/' + nextYear.toString(), fontSize),
            y: Y_YEAR,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

    const paintLegend = () => {
        const fontSize = 7;
        const squareSize = 8;
        const rightMargin = 560;
        const yPos = Y_YEAR + 2;

        const items = [
            { label: 'Territorio peligroso', color: COLOR_DANGER },
            { label: 'Territorio personal', color: COLOR_PERSONAL },
        ];

        let xOffset = rightMargin;
        items.forEach(item => {
            const textWidth = fontObj.widthOfTextAtSize(item.label, fontSize);
            xOffset -= textWidth;
            currentPage.drawText(item.label, {
                x: xOffset,
                y: yPos,
                size: fontSize,
                color: rgb(0, 0, 0),
            });
            xOffset -= squareSize + 3;
            currentPage.drawRectangle({
                x: xOffset,
                y: yPos - 1,
                width: squareSize,
                height: squareSize,
                color: item.color,
            });
            xOffset -= 12;
        });
    }

    const paintTerritory = (territory, index) => {
        if (territory.lastDate == undefined) {
            
            paintNewArea(territory);

        } else {

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
    }

    const paintTerritoryNum = (territory) => {
        const fontSize = 10;
        const text = territory.num.toString();

        if (territory.special === 1 || territory.special === 2) {
            const fillColor = territory.special === 1
                ? COLOR_DANGER
                : COLOR_PERSONAL;

            currentPage.drawRectangle({
                x: 37.54,
                y: currentY - 11.25,
                width: 33.25,
                height: 29.75,
                color: fillColor,
            });
        }

        currentPage.drawText(text, {
            x: currentX - calcX(text, fontSize),
            y: currentY,
            size: fontSize,
            color: rgb(0, 0, 0)
        });
    }

    const paintNewArea = (territory) => {
        const fontSize = 14;
        const text = territory.num.toString();

        const rectWidth = 523.1;
        const rectHeight = 29.75;

        currentPage.drawRectangle({
            x: 37.54,
            y: currentY - 11.25,
            width: rectWidth,
            height: rectHeight,
            color: rgb(0.8, 0.8, 0.8),
        });

        currentPage.drawText(text, {
            x: currentX - 10,
            y: currentY - 1.25,
            size: fontSize,
            color: rgb(0, 0, 0),
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
        const firstDate = parseEuropeanDate(assignment.firstDate);
        const secondDate = parseEuropeanDate(assignment.secondDate);

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

    const parseEuropeanDate = (date) => {
        if (!date) return null;
        const [day, month, year] = date.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    return (
        <>
        {jsonData && (
            <section className="flex flex-col w-full">
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
                            className="w-[250px]"
                        />
                    </div>
                    <Button onClick={handleClick}>Generar PDF</Button>
                </div>
            </section>
        )}
        </>
    )
} 