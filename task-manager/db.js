// db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import Database from "better-sqlite3";
import { varchar } from "drizzle-orm/mysql-core";

const sqlite = new Database("sqlite.db");

export const employeeTable = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  phoneNumber: text("phoneNumber"),
  sex: text("sex"),
  email: text("email"),
});

export const fieldTable = sqliteTable("fields", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // charTable: integer('id').primaryKey().notNull(),
  name: text("name").notNull(),
  area: text("area").notNull(),
});

export const jobTable = sqliteTable("jobs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  profession: text("profession").notNull(),
  area: text("area"),
});

export const fieldJobsTable = sqliteTable(
  "fieldJobs",
  {
    fieldId: integer("fieldId").notNull(),
    jobId: integer("jobId").notNull(),
    area: text("area").notNull(),
    fieldName: text("fieldName").notNull(),
    jobName: text("jobName").notNull(),
    profession: text("profession").notNull(),
  },
  (table) => [primaryKey({ columns: [table.fieldId, table.jobId] })]
);

export const db = drizzle(sqlite, {
  schema: {
    employeeTable,
    fieldTable,
    jobTable,
    fieldJobsTable,
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
    DROP TABLE IF EXISTS fields;
    CREATE TABLE IF NOT EXISTS fields (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      area TEXT NOT NULL
    );
    DROP TABLE IF EXISTS jobs;
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      profession TEXT NOT NULL,
      area TEXT  
    );
    DROP TABLE IF EXISTS fieldJobs;
    CREATE TABLE IF NOT EXISTS fieldJobs (
      fieldId INTEGER,
      jobId INTEGER,
      fieldName TEXT NOT NULL,
      jobName TEXT NOT NULL,
      area TEXT NOT NULL,
      profession TEXT NOT NULL,
      PRIMARY KEY (fieldId, jobId))
  `);
}
