import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const healthRecords = pgTable("health_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  childName: text("child_name").notNull(),
  age: real("age").notNull(),
  weight: real("weight").notNull(),
  height: real("height").notNull(),
  riskLevel: text("risk_level").notNull(),
  riskColor: text("risk_color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHealthRecordSchema = createInsertSchema(healthRecords).pick({
  childName: true,
  age: true,
  weight: true,
  height: true,
  riskLevel: true,
  riskColor: true,
});

export type InsertHealthRecord = z.infer<typeof insertHealthRecordSchema>;
export type HealthRecord = typeof healthRecords.$inferSelect;
