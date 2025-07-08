// setup-db.ts (ή όπου κάνεις το insert)
import { db, employeeTable, initializeDB } from './db';
import { employees } from './dataset';

async function createDb() {
  await initializeDB();

  for (const e of employees) {
    await db.insert(employeeTable).values(e);
  }

  const allEmployees = await db.select().from(employeeTable).all();
  console.log(allEmployees);
}

createDb();
