// db.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');

export const employeeTable = sqliteTable('employees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  phoneNumber: text('phoneNumber'),
  sex: text('sex'),
  email: text('email'),
});

export const db = drizzle(sqlite, {
  schema: {
    employeeTable,
  },
});

export async function initializeDB() {
  await sqlite.exec(`
    DROP TABLE IF EXISTS employees;
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      phoneNumber TEXT,
      sex TEXT,
      email TEXT
    );
  `);
}
