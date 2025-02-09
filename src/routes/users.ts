import { Router, Request, Response } from 'express';
import * as userService from '../services/users.services';

const router = Router();

// Fetch all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();  
    res.status(200).json(users);  
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

export default router;
