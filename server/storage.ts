import { type User, type InsertUser, users } from "@shared/schema";
import { randomUUID } from "crypto";

/**
 * Interface for the storage layer.
 * Can be implemented as MemStorage for development or DatabaseStorage for production.
 */
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

/**
 * In-memory implementation of the storage interface.
 * Useful for development and rapid prototyping.
 */
export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const userArray = Array.from(this.users.values());
    return userArray.find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
