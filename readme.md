# Hack the North 2025 Backend Challenge

Overview:
1. Database
2. APIs
3. Bonus APIs
4. Final thoughts

## Database
- ERD Schema
<img width="540" alt="Screenshot 2025-02-08 at 1 29 50 PM" src="https://github.com/user-attachments/assets/3c6de614-527e-478c-8e5f-b622e1d09793" />
- Given the json data, I have decided to split the data across three tables. The main table is the users table which holds all user identity related information such as their name, contacts, and badge code. Next, I decided to create separate tables for activities and scans. This reduces repetition of data, improves maintainability, and allows for faster joins. For my database, I have decided to use SQLite, as it is the simple to set up and implement. 
