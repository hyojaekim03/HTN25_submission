import { TABLE_USERS, TABLE_ACTIVITIES, TABLE_SCANS } from './constants';

export const getAllUsersQuery = `
  SELECT 
    ${TABLE_USERS}.user_id, 
    ${TABLE_USERS}.name, 
    ${TABLE_USERS}.email, 
    ${TABLE_USERS}.phone_num, 
    ${TABLE_USERS}.badge_code,
    ${TABLE_SCANS}.scanned_at, 
    ${TABLE_ACTIVITIES}.activity_name, 
    ${TABLE_ACTIVITIES}.activity_category
  FROM ${TABLE_USERS}
  LEFT JOIN ${TABLE_SCANS} ON ${TABLE_USERS}.user_id = ${TABLE_SCANS}.user_id
  LEFT JOIN ${TABLE_ACTIVITIES} ON ${TABLE_SCANS}.activity_id = ${TABLE_ACTIVITIES}.activity_id
`;

export const getUserByIdQuery = `
  SELECT 
    ${TABLE_USERS}.user_id, 
    ${TABLE_USERS}.name, 
    ${TABLE_USERS}.email, 
    ${TABLE_USERS}.phone_num, 
    ${TABLE_USERS}.badge_code,
    ${TABLE_SCANS}.scanned_at, 
    ${TABLE_ACTIVITIES}.activity_name, 
    ${TABLE_ACTIVITIES}.activity_category
  FROM ${TABLE_USERS}
  LEFT JOIN ${TABLE_SCANS} ON ${TABLE_USERS}.user_id = ${TABLE_SCANS}.user_id
  LEFT JOIN ${TABLE_ACTIVITIES} ON ${TABLE_SCANS}.activity_id = ${TABLE_ACTIVITIES}.activity_id
  WHERE ${TABLE_USERS}.user_id = ?
`;

export const updateUserByIdDynamicQuery = (fields: string[]): string => `
UPDATE ${TABLE_USERS}
SET ${fields.join(', ')}, updated_at = ?
WHERE user_id = ?
`;