import DbManager from '../db/manager.db';
import { getAllUsersQuery, getUserByIdQuery, updateUserByIdDynamicQuery } from './queries/users.queries';

interface User {
  id: number;
  name: string;
  email: string;
}

export const getAllUsers = async () => {
  const db = await DbManager.getInstance();
  const rows =  await db.selectQuery(getAllUsersQuery);

  return rows
};


export const getUserById = async (id: number) => {
  const db = await DbManager.getInstance();
  const rows = await db.selectQuery(getUserByIdQuery, [id]);

  if (rows.length === 0) {
    return null;
  }

  const user = {
    user_id: rows[0].user_id,
    name: rows[0].name,
    email: rows[0].email,
    phone_num: rows[0].phone_num,
    badge_code: rows[0].badge_code,
    scans: rows.map(row => ({
      scanned_at: row.scanned_at,
      activity_name: row.activity_name,
      activity_category: row.activity_category,
    })),
  };

  return user
};

export const updateUserById = async (userId: number, name?: string, phone_num?: string): Promise<any | null> => {
  const db = await DbManager.getInstance();

  const updates: string[] = [];
  const params: any[] = [];

  console.log('name and phone')

  // build updates by adding fields dynamically
  if (name) {
    updates.push('name = ?');
    params.push(name.trim());
  }

  console.log('updates', updates)

  if (phone_num) {
    updates.push('phone_num = ?');
    params.push(phone_num);  
  }

  // if no fields to update, throw an error
  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  // add updated_at timestamp and userId to params
  params.push(new Date().toISOString(), userId);

  const query = updateUserByIdDynamicQuery(updates);

  const result = await db.executeQuery(query, params);

  if (result.changes === 0) {
    return null;  
  }

  // return updated user info using the same query from getUserById
  const rows = await db.selectQuery(getUserByIdQuery, [userId]);

  if (rows.length === 0) {
    return null;
  }

  const user = {
    user_id: rows[0].user_id,
    name: rows[0].name,
    email: rows[0].email,
    phone_num: rows[0].phone_num,
    badge_code: rows[0].badge_code,
    scans: rows.map(row => ({
      scanned_at: row.scanned_at,
      activity_name: row.activity_name,
      activity_category: row.activity_category,
    })),
  };

  return user
};