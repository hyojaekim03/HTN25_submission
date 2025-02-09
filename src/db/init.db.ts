import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initializeDatabase = async () => {
  const db = await open({
    filename: 'hackers.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      phone_num TEXT,
      badge_code TEXT UNIQUE NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS activities (
      activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
      activity_name TEXT UNIQUE NOT NULL,
      activity_category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS scans (
      scan_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      activity_id INTEGER NOT NULL,
      scanned_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
    );
  `);

  console.log('DB init');
  await db.close();
};

initializeDatabase().catch((error) => {
  console.error('Error DB init:', error);
});
