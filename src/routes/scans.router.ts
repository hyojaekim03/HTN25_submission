import express, { Request, Response } from 'express';
import * as scanService from '../services/scans.services';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { min_frequency, max_frequency, activity_category } = req.query;

    const filters: { min_frequency?: number; max_frequency?: number; category?: string } = {};
    if (min_frequency) filters.min_frequency = parseInt(min_frequency as string, 10);
    if (max_frequency) filters.max_frequency = parseInt(max_frequency as string, 10);
    if (activity_category) filters.category = activity_category as string;

    const scanData = await scanService.getScanData(filters);

    res.status(200).json(scanData);
  } catch (error) {
    console.error('Error fetching scan data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:badgeCode', async (req: Request, res: Response):Promise<any> => {
  try {
    const { badgeCode } = req.params;
    const { activity_name, activity_category } = req.body;

    // check for nessecary values
    if (!activity_name || !activity_category) {
      return res.status(400).json({ message: 'Activity name and category are required.' });
    }

    // add scan 
    const newScan = await scanService.addScan(badgeCode, activity_name, activity_category);

    res.status(201).json(newScan);
  } catch (error) {
    console.error('Error adding scan:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
