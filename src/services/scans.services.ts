import * as scanModel from '../models/scans.model';

export const getScanData = async (filters: { min_frequency?: number; max_frequency?: number; category?: string }) => {
    return await scanModel.getScanData(filters);
  };

export const addScan = async (badgeCode: string, activity_name: string, activity_category: string) => {
  const rows = await scanModel.addScan(badgeCode, activity_name, activity_category);
  
  return rows
};
