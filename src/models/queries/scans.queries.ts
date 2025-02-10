import { TABLE_USERS, TABLE_ACTIVITIES, TABLE_SCANS } from './constants';

export const getUserByBadgeCodeQuery = `
  SELECT user_id FROM ${TABLE_USERS} WHERE badge_code = ?
`;

export const getActivityByNameQuery = `
  SELECT activity_id FROM ${TABLE_ACTIVITIES} WHERE activity_name = ?
`;

export const insertActivityQuery = `
  INSERT INTO ${TABLE_ACTIVITIES} (activity_name, activity_category) VALUES (?, ?)
`;

export const insertScanQuery = `
  INSERT INTO ${TABLE_SCANS} (user_id, activity_id, scanned_at) VALUES (?, ?, ?)
`;

export const updateUserUpdatedAtQuery = `
  UPDATE ${TABLE_USERS} SET updated_at = ? WHERE user_id = ?
`;

export const getScanByIdQuery = `
  SELECT ${TABLE_SCANS}.scanned_at, ${TABLE_ACTIVITIES}.activity_name, ${TABLE_ACTIVITIES}.activity_category
  FROM ${TABLE_SCANS}
  JOIN ${TABLE_ACTIVITIES} ON ${TABLE_SCANS}.activity_id = ${TABLE_ACTIVITIES}.activity_id
  WHERE ${TABLE_SCANS}.scan_id = ?
`;


export const getScanDataQuery = (filters: { min_frequency?: number; max_frequency?: number; category?: string }) => {
  let query = `
    SELECT ${TABLE_ACTIVITIES}.activity_name, 
           ${TABLE_ACTIVITIES}.activity_category, 
           COUNT(${TABLE_SCANS}.scan_id) AS frequency
    FROM ${TABLE_ACTIVITIES}
    LEFT JOIN ${TABLE_SCANS} ON ${TABLE_ACTIVITIES}.activity_id = ${TABLE_SCANS}.activity_id
  `;

  const conditions: string[] = [];

  if (filters.category) {
    conditions.push(`${TABLE_ACTIVITIES}.activity_category = ?`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  query += ` GROUP BY ${TABLE_ACTIVITIES}.activity_name, ${TABLE_ACTIVITIES}.activity_category`;

  const havingConditions: string[] = [];
  if (filters.min_frequency !== undefined) {
    havingConditions.push(`frequency >= ?`);
  }
  if (filters.max_frequency !== undefined) {
    havingConditions.push(`frequency <= ?`);
  }

  //NOTE: WHERE -> HAVING fix. It didn't like using COUNT AS with WHERE because of aggregated values
  if (havingConditions.length > 0) {
    query += ` HAVING ` + havingConditions.join(' AND ');
  }

  return query;
};
