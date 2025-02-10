import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const deleteDatabase = async () => {
  const db = await open({
    filename: 'hackers.db',
    driver: sqlite3.Database,
  });

  try {
    await db.exec('BEGIN');

    // drop all tables if they exist
    await db.exec('DROP TABLE IF EXISTS scans;');
    await db.exec('DROP TABLE IF EXISTS activities;');
    await db.exec('DROP TABLE IF EXISTS users;');

    await db.exec('COMMIT');

    console.log('All tables droppped');
  } catch (error) {
    console.error('Error dropping tables:', error);
    await db.exec('ROLLBACK');  
  } finally {
    await db.close();  
  }
};

deleteDatabase();
