import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const resetDatabase = async () => {
  const db = await open({
    filename: 'hackers.db',
    driver: sqlite3.Database,
  });

  try {
    await db.exec('BEGIN'); //begin transaction

    await db.exec('DELETE FROM scans');
    await db.exec('DELETE FROM activities');
    await db.exec('DELETE FROM users');

    await db.exec('DELETE FROM sqlite_sequence WHERE name IN ("users", "activities", "scans")');

    await db.exec('COMMIT'); //commit transaction

    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    await db.exec('ROLLBACK'); //rollback entire transaction if fail
  } finally {
    await db.close();
  }
};

resetDatabase();
