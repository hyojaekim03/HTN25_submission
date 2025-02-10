import * as userModel from '../models/users.model';

// Fetch all users
interface Scan {
activity_name: string;
activity_category: string;
scanned_at: string | null;
}
  
interface GroupedUser {
user_id: number;
name: string;
email: string;
phone_num: string;
badge_code: string;
scans: Scan[];
}

export const getUsers = async () => {
const rows = await userModel.getAllUsers();

const groupedData = rows.reduce<GroupedUser[]>((acc: GroupedUser[], row) => {
    let user = acc.find((u: GroupedUser) => u.user_id === row.user_id);

    if (!user) {
    user = {
        user_id: row.user_id,
        name: row.name,
        email: row.email,
        phone_num: row.phone_num,
        badge_code: row.badge_code,
        scans: [],
    };
    acc.push(user);
    }

    if (row.activity_name) {
    user.scans.push({
        activity_name: row.activity_name,
        activity_category: row.activity_category,
        scanned_at: row.scanned_at,
    });
    }

    return acc;
}, []);

return groupedData;
};


export const getUserById = async (userId: number) => {
    const userRow = await userModel.getUserById(userId);

    return userRow
}

export const updateUserById = async (userId: number, name: string, phone_num: string) => {
    const userRow = await userModel.updateUserById(userId, name, phone_num);

    return userRow
}