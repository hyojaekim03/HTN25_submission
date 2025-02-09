import * as userModel from '../models/users.model';

// Fetch all users
export const getUsers = async () => {
  return await userModel.getAllUsers();
};
