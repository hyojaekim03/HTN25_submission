import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs/promises';

// Load the JSON data from a file (e.g., `data.json`)
const loadData = async (): Promise<any[]> => {
  const data = await fs.readFile('htn_data.json', 'utf-8');
  return JSON.parse(data);
};

const insertData = async () => {
  const db = await open({
    filename: 'hackers.db',
    driver: sqlite3.Database,
  });

  try {
    const data = await loadData();

    for (const user of data) {
      // Insert user
      const userId = await db.run(
        `INSERT INTO users (email, phone_num, badge_code) VALUES (?, ?, ?)`,
        user.email,
        user.phone,
        user.badge_code
      );

      for (const scan of user.scans) {
        // Insert activity (ignore duplicates)
        const activity = await db.get(
          `SELECT activity_id FROM activities WHERE activity_name = ?`,
          scan.activity_name
        );

        let activityId;
        if (activity) {
          activityId = activity.activity_id;
        } else {
          const result = await db.run(
            `INSERT INTO activities (activity_name, activity_category) VALUES (?, ?)`,
            scan.activity_name,
            scan.activity_category
          );
          activityId = result.lastID;
        }

        // Insert scan record
        await db.run(
          `INSERT INTO scans (user_id, activity_id, scanned_at) VALUES (?, ?, ?)`,
          userId.lastID,
          activityId,
          scan.scanned_at
        );
      }
    }

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await db.close();
  }
};

insertData();
