import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs/promises';

// load JSON data
const loadData = async (): Promise<any[]> => {
  const data = await fs.readFile('src/data/htn_data.json', 'utf-8');
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
      // insert user and handle missing badge_code by inserting null
      const result = await db.run(
        `INSERT INTO users (name, email, phone_num, badge_code) VALUES (?, ?, ?, ?)`,
        user.name,
        user.email,
        user.phone,
        user.badge_code || null  // handle empty or missing badge codes
      );

      const userId = result.lastID;

      for (const scan of user.scans) {
        // check if the activity already exists
        const activity = await db.get(
          `SELECT activity_id FROM activities WHERE activity_name = ?`,
          scan.activity_name
        );

        let activityId;
        if (activity) {
          activityId = activity.activity_id;
        } else {
          const activityResult = await db.run(
            `INSERT INTO activities (activity_name, activity_category) VALUES (?, ?)`,
            scan.activity_name,
            scan.activity_category
          );
          activityId = activityResult.lastID;
        }

        // insert the scan record
        await db.run(
          `INSERT INTO scans (user_id, activity_id, scanned_at) VALUES (?, ?, ?)`,
          userId,
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
