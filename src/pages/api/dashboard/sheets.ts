import type { APIRoute } from "astro"
import { Sheet, db } from "astro:db"
import { getSession } from "auth-astro/server"

export const POST: APIRoute = async ({ request, redirect }) => {
	const session = await getSession(request)

	if (!session || session?.user?.email == null) {
		return new Response("No autorizado", {
			status: 401,
		});
	}

	const formData = await request.formData();
  
	const name = formData.get("name")?.toString();
	const sheetId = formData.get("sheetId")?.toString();

	if (!name || !sheetId) {
		return new Response("Faltan campos obligatorios", {
		  status: 400,
		});
	}

	const userId = session.user.email
	const newId = `${userId}-${name}`

	const sheet = { id: newId, userId, sheetId, name }

	try {
		await db.insert(Sheet).values(sheet)
	} catch (error) {
		console.error(error)
		return new Response("Ha ocurrido un error", {
			status: 500,
		});
	}

	return redirect("/dashboard/sheets");
}