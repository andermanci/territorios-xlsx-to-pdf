import { useState } from 'react';
import * as XLSX from 'xlsx';

export function FileUploader() {

    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = (e) => {
        console.log({e});
        const file = e.target.files[0];
        const reader = new FileReader();

        console.log({file});

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            setJsonData(jsonData);

            console.log({jsonData});
        };

        reader.readAsArrayBuffer(file);
    };

    const click = () => {
        setJsonData({ prueba: 'a'})
        console.log('click');
    }

    return (
        <section class="flex flex-col gap-8">
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            <button onClick={click}>Upload</button>

            {jsonData && (
                <div>
                    <h2>Resultados JSON:</h2>
                    <div>{JSON.stringify(jsonData)}</div>
                </div>
            )}
        </section>
    )
}