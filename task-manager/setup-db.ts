// setup-db.ts (ή όπου κάνεις το insert)
import { db, employeeTable, initializeDB, fieldTable, charTable } from "./db";
import { characteristics, employees, fields } from "./dataset";

async function createDb() {
  await initializeDB();

  for (const e of employees) {
    await db.insert(employeeTable).values(e);
  }

  for (const f of fields) {
    await db.insert(fieldTable).values(f);
  }

  for (const c of characteristics) {
    await db.insert(charTable).values(c);
  }

  const allEmployees = await db.select().from(employeeTable).all();
  console.log(allEmployees);

  const allFields = await db.select().from(fieldTable).all();
  console.log(allFields);

  const allChars = await db.select().from(charTable).all();
  console.log(allChars);
}

createDb();
