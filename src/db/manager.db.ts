import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

class DbManager {
  private static instance: DbManager;
  private db!: Database;

  private constructor() {}

  static getInstance = async () => {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
      await DbManager.instance.init();
    }
    return DbManager.instance;
  };

  private init = async () => {
    this.db = await open({
      filename: 'hackers.db',
      driver: sqlite3.Database,
    });
  };

  async selectQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }
  
    return await this.db.all(query, params);
  }
  
  async executeQuery(query: string, params: any[] = []): Promise<{ lastInsertId: number; changes: number }> {
    if (!this.db) {
      throw new Error('Database not initialized.');
    }
  
    const result = await this.db.run(query, params);
    return {
      lastInsertId: result.lastID!,
      changes: result.changes!,
    };
  }

  beginTransaction = async () => {
    await this.db.run('BEGIN TRANSACTION');
  };

  commit = async () => {
    await this.db.run('COMMIT');
  };

  rollback = async () => {
    await this.db.run('ROLLBACK');
  };
}

export default DbManager;
