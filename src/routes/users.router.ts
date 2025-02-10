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

// Fetch user information by userId
router.get('/:userId', async (req: Request, res: Response):Promise<any> => {
    try {
        const { userId } = req.params;
    
        if (!userId) {
          return res.status(400).json({ message: 'UserId is required' });
        }
    
        const user = await userService.getUserById(parseInt(userId, 10))
    
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  

  router.patch('/:userId', async (req: Request, res: Response):Promise<any> => {
    try {
      const { userId } = req.params;
      let {name, phone_num} = req.body;

      console.log('name and phone: ', name, phone_num)
  
      if (!userId) {
        return res.status(400).json({ message: 'UserId is required.' });
      }
  
      if (!name && !phone_num) {
        return res.status(400).json({ message: 'No fields to update.' });
      }

      if (name) {
        name = name.trim(); 
      }

      const updatedUser = await userService.updateUserById(parseInt(userId, 10), name, phone_num);
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;
