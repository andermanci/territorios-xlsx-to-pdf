import { column, defineDb } from "astro:db"

const Sheets = {
	columns: {
		id: column.text({ primaryKey: true }), // `userId-combatId`
		userId: column.text(),
		sheetId: column.text()
	},
}

// https://astro.build/db/config
export default defineDb({
  tables: {
    Sheets
  }
});
