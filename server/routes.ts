import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHealthRecordSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/records", async (req, res) => {
    const records = await storage.getHealthRecords();
    res.json(records);
  });

  app.post("/api/records", async (req, res) => {
    try {
      const record = insertHealthRecordSchema.parse(req.body);
      const saved = await storage.createHealthRecord(record);
      res.json(saved);
    } catch (e) {
      res.status(400).json({ error: "Invalid record data" });
    }
  });

  return httpServer;
}
