import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const initializeDatabase = async () => {
  const db = await open({
    filename: 'hackers.db',
    driver: sqlite3.Database,
  });

  try {
    await db.exec('BEGIN');

    // create users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone_num TEXT,
        badge_code TEXT UNIQUE,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // create activities table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS activities (
        activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_name TEXT UNIQUE NOT NULL,
        activity_category TEXT NOT NULL
      );
    `);

    // create scans table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS scans (
        scan_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        activity_id INTEGER NOT NULL,
        scanned_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
      );
    `);

    await db.exec('COMMIT');

    console.log('Db init successful!');
  } catch (error) {
    console.error('err db init:', error);
    await db.exec('ROLLBACK');  
  } finally {
    await db.close();  // close conn
  }
};

initializeDatabase();
