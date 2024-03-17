import { useTerritoriosStore } from "@/store/territoriosStore"
import { PDFDocument, rgb } from "pdf-lib"
import 'fs'


export function PDFGenerator({ basePdf }) {

    const {
        jsonData
    } = useTerritoriosStore(state => state)

    const handleClick = async () => {

        Object.entries(jsonData).forEach(async function(data) {
            // Carga el PDF
            const pdfDoc = await PDFDocument.load(pdf);

            const sheetName = data[0];
            const territories = data[1];

            territories.forEach(function(territory, index) {
                if (index % 30 == 0) {
                    addPageWithBase(pdfDoc);
                }
            });
        });

        // Agregar páginas con el mismo fondo del PDF base
        for (let i = 0; i < 5; i++) {
            await addPageWithBackground(pdfDoc, basePdfBytes);
        }

        // Cargar el PDF base

        // Obtiene la primera página del PDF
        
        pdfDoc.addPage();

        paintPdf(pdfDoc);
        downloadPdf(pdfDoc);
    }

    const addPageWithBackground = async (pdfDoc, basePdfBytes) => {
        // Cargar la fuente estándar (puedes cambiar esto según tus necesidades)
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
        // Crear una nueva página
        const page = pdfDoc.addPage();
      
        // Obtener el fondo del PDF base
        const basePdf = await PDFDocument.load(basePdfBytes);
        const basePage = basePdf.getPage(0);
      
        // Copiar el contenido del fondo al nuevo PDF
        const { width, height } = basePage.getSize();
        const [x, y] = [0, 0];
        const [newWidth, newHeight] = [page.getWidth(), page.getHeight()];
        page.drawImage(basePage, {
          x,
          y,
          width: newWidth,
          height: newHeight,
        });
      
        // Agregar texto o contenido adicional si es necesario
        page.drawText('Contenido adicional', {
          x: 50,
          y: height - 100,
          size: 50,
          font,
          color: rgb(0, 0, 0),
        });
      
        return pdfDoc;
      };

    const paintPdf = () => {
        // Define el contenido a escribir
        const text = '¡Hola, mundo!';
        const fontSize = 30;

        // Escribe el texto en la página
        firstPage.drawText(text, {
            x: 50,
            y: firstPage.getHeight() - 50,
            size: fontSize,
            color: rgb(0, 0, 0), // Color negro
        });
    }

    const downloadPdf = async (pdfDoc) => {
        // Guarda los cambios en un nuevo archivo PDF
        const pdfBytes = await pdfDoc.save();

        // Crea un Blob con el contenido del PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Crea un enlace para descargar el Blob
        const url = URL.createObjectURL(blob);

        // Crea un enlace HTML
        const a = document.createElement('a');
        a.href = url;
        a.download = 'archivo.pdf';
        a.textContent = 'Descargar archivo.pdf';

        a.click();

        // Libera el objeto de URL creado
        URL.revokeObjectURL(url);
    }

    return (
        <section>
            {jsonData && (
                <button onClick={handleClick}>Generar PDF</button>
            )}
        </section>
    )
} 