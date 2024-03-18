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
                if (sheetName != 'Calculos') {
                    const worksheet = workbook.Sheets[sheetName];
                    sheetData[sheetName] = getSheetData(worksheet)
                }
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
        <section className="flex flex-col gap-8 w-full">
            {!jsonData && (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Haz click para subir un archivo</span> o arrástralo aquí</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Formato XLSX</p>
                        </div>
                        <input id="dropzone-file" type="file"  accept=".xlsx" onChange={handleFileUpload} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                </div> 
            )}
        </section>
    )
}