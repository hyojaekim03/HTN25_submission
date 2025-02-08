# **Hack the North 2025 Backend Challenge**

## **Overview**
This document outlines the key components of the backend solution, including the database design and APIs.

1. **Database**
2. **APIs**
3. **Bonus APIs**
4. **Final Thoughts**

---

## **Database**

### **ERD Schema**
![ERD Schema](https://github.com/user-attachments/assets/3c6de614-527e-478c-8e5f-b622e1d09793)

---

### **Database Design Explanation**

Given the JSON data, I decided to split the data across three tables:

1. **Users Table**  
   The main table that stores all user-related identity information, including:
   - Name  
   - Contacts (email, phone number)  
   - Unique badge code (QR code)

2. **Activities Table**  
   A separate table to manage all unique activities and their categories (e.g., "workshop", "meal").

3. **Scans Table**  
   Logs every scan event with references to the user 
