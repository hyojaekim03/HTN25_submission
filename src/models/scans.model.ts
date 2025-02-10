import DbManager from '../db/manager.db';
import {
  getUserByBadgeCodeQuery,
  getActivityByNameQuery,
  insertActivityQuery,
  insertScanQuery,
  updateUserUpdatedAtQuery,
  getScanByIdQuery,
  getScanDataQuery
} from './queries/scans.queries';

export const addScan = async (badgeCode: string, activity_name: string, activity_category: string) => {
  const db = await DbManager.getInstance();

  try {
    await db.beginTransaction(); //everything has to be done in one transaction -> some of the queries might not go through

    // this isn't nessecary (we can handle it by badge code), but to keep things consistent, fetch userId
    const user = await db.selectQuery<{ user_id: number }>(getUserByBadgeCodeQuery, [badgeCode]);
    if (!user.length) {
      throw new Error('User not found.');
    }

    const userId = user[0].user_id;

    // check if activity exists
    let activity = await db.selectQuery<{ activity_id: number }>(getActivityByNameQuery, [activity_name]);

    let activityId;
    if (activity.length > 0) {
      activityId = activity[0].activity_id;
    } else {
      // insert new activity if not found
      const activityResult = await db.executeQuery(insertActivityQuery, [activity_name, activity_category]);
      activityId = activityResult.lastInsertId;
    }

    // insert the scan record
    const scanResult = await db.executeQuery(insertScanQuery, [userId, activityId, new Date().toISOString()]);

    // update user's updated_at field
    await db.executeQuery(updateUserUpdatedAtQuery, [new Date().toISOString(), userId]);

    // fetch and return the newly created scan details
    const newScan = await db.selectQuery(getScanByIdQuery, [scanResult.lastInsertId]);

    await db.commit();

    return newScan[0];
  } catch (error) {
    await db.rollback();
    throw error;
  }
};

export const getScanData = async (filters: { min_frequency?: number; max_frequency?: number; category?: string }) => {
    const db = await DbManager.getInstance();
  
    const query = getScanDataQuery(filters);
  
    const params: any[] = [];
    if (filters.category) params.push(filters.category);
    if (filters.min_frequency !== undefined) params.push(filters.min_frequency);
    if (filters.max_frequency !== undefined) params.push(filters.max_frequency);
  
    const result = await db.selectQuery(query, params);
  
    return result;
  };