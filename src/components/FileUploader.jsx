import { useTerritoriosStore } from '@/store/territoriosStore';
import * as XLSX from 'xlsx';

export function FileUploader() {

    const {
        jsonData,
        setJsonData
    } = useTerritoriosStore(state => state)

    const START_ROW = 11

    const NUM_COL = 'C'
    const LASTDATE_COL = 'D'
    const FIRSTASSIGNED_COL = 'E'

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetData = {};
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                sheetData[sheetName] = getSheetData(worksheet)
            });
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
    }

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
    }

    const getAssignedData = (worksheet, currentCol, currentRow) => {
        const name = worksheet[`${currentCol}${currentRow}`].v;
        const firstDate = worksheet[`${currentCol}${currentRow + 1}`]?.w;
        const secondDate = worksheet[`${stepColumn(currentCol, 1)}${currentRow + 1}`]?.w;
        return { name, firstDate, secondDate };
    }

    const stepColumn = (col, step) => {
        return String.fromCharCode(col.charCodeAt(0) + step);
    }

    return (
        <section className="flex flex-col gap-8">
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            {jsonData && (
                <div>
                    <h2>Resultados JSON:</h2>
                    <div>{JSON.stringify(jsonData)}</div>
                </div>
            )}
        </section>
    )
}