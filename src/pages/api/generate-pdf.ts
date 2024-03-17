import type { APIRoute } from "astro";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const POST: APIRoute = async ({ request }) => {

    return new Response(
        JSON.stringify({ body: request.body }),
        {
            headers: { "Content-Type": "application/json" },
            status: 500,
        }
    );

    const pdfPath = '/S-13_S.pdf'

    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Creating PDFs in JavaScript is awesome!', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Crea un Blob con el contenido del PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Crea un enlace para descargar el Blob
    const url = URL.createObjectURL(blob);

    // Crea un enlace HTML
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo.pdf';
    a.textContent = 'Descargar archivo.pdf';

    // Añade el enlace al DOM
    document.body.appendChild(a);

    // Devuelve los datos procesados
    return new Response(
        JSON.stringify({ a: 'a' }),
        {
            headers: { "Content-Type": "application/json" },
            status: 200,
        }
    );
};