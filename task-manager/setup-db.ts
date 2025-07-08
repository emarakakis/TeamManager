// setup-db.ts (ή όπου κάνεις το insert)
import { db, employeeTable, initializeDB, fieldTable } from './db';
import { employees, fields } from './dataset';

async function createDb() {
  await initializeDB();

  for (const e of employees) {
    await db.insert(employeeTable).values(e);
  }

  for (const f of fields) {
    await db.insert(fieldTable).values(f)
  }

  const allEmployees = await db.select().from(employeeTable).all();
  console.log(allEmployees);

  const allFields = await db.select().from(fieldTable).all();
  console.log(allFields)
}

createDb();
