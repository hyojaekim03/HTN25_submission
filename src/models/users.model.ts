import DbManager from '../db/manager.db';

interface User {
  id: number;
  name: string;
  email: string;
}

const TABLE1 = 'users'

const getAllUsersQuery = `SELECT * FROM ${TABLE1}`

export const getAllUsers = async () => {
  const db = await DbManager.getInstance();
  return await db.query(getAllUsersQuery);
};

export const getUserById = async (id: number) => {
  const db = await DbManager.getInstance();
  const result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return result
};

export const createUser = async (name: string, email: string) => {
  const db = await DbManager.getInstance();
  return await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
};
