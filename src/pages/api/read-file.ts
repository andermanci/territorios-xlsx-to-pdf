import type { APIRoute } from "astro";
import XLSX from 'xlsx';

export const POST: APIRoute = async ({ request }) => {

  if (!request.body) {
    return new Response('error')
  }

  // Lee el archivo y convierte los datos a un objeto
  const formData = await request.formData();

  // Obtiene el archivo del FormData
  const file = formData.get("file");

  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Devuelve los datos procesados
  return new Response(
    JSON.stringify({ data }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  );
};