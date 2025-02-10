# **Hack the North 2025 Backend Challenge**

## **Tech Stack**

---
## **Overview**
This document outlines the key components of the backend solution, including the database design and APIs.

1. **Database**
2. **APIs**
3. **Bonus APIs**
4. **Final Thoughts**

---
## **JSON data**
Upon reviewing the JSON data, I noticed that there were a few badge codes which were empty strings. I am assuming that this happens because multiple people who signed up didn't check-in (they didn't show up). This might interfere with the definition of badge codes being "unique" and therefore we must treat this accordingly. I will be allowing NULL values for this so that existing entries are all unique. This also made it more difficult to fetch data by badge codes for a few reasons. 
For example, if a user wanted to change their phone number and name **before** the event started, we would not be able to use their badge codes  as identifiers. 


## **Database**

I will be using SQLite for a simple set up and implementation.

### **ERD Schema**
<img src="https://github.com/user-attachments/assets/733c593c-63ee-499a-8c11-360b8a0727d4" alt="ERD Schema" width="400" />


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
   Logs every scan event with references to the user and activity, along with the timestamp of when the scan occured.

---

### **Design Rationale**

- **Normalization:**  
  Normalizing the data across three tables reduces redundancy by referencing activities and categories using a simple integer identifier.

- **Maintainability:**  
  Correcting user or activity details is easy without affecting scan records.

- **Performance:**  
  Optimized for faster joins and lookups by indexing primary and foreign keys. Integer comparisons are more efficient than string-based lookups in a single denormalized table.

## **APIs**

---

## Base URL

Local Development: `http://localhost:3000`

---

## Endpoints

---

### 1. **GET `/users`**
Fetch all users along with their scan history.

#### Request
- **Method:** `GET`
- **Endpoint:** `/users`

#### Response
- **Status Code:** `200 OK`

```json
[
  {
    "user_id": 1,
    "name": "James Graves",
    "email": "hollypace@example.org",
    "phone_num": "+1-758-654-8939x00098",
    "badge_code": "give-seven-food-trade",
    "scans": [
      {
        "scanned_at": "2025-01-19T03:00:27.836055",
        "activity_name": "giving_go_a_go",
        "activity_category": "workshop"
      },
      {
        "scanned_at": "2025-01-17T04:07:35.311375",
        "activity_name": "opening_ceremony",
        "activity_category": "activity"
      }
    ]
  }
]
```

### 1. **GET `/users`**
Fetch all users along with their scan history.

#### Request
- **Method:** `GET`
- **Endpoint:** `/users`

#### Response
- **Status Code:** `200 OK`

```json
[
  {
    "user_id": 1,
    "name": "James Graves",
    "email": "hollypace@example.org",
    "phone_num": "+1-758-654-8939x00098",
    "badge_code": "give-seven-food-trade",
    "scans": [
      {
        "scanned_at": "2025-01-19T03:00:27.836055",
        "activity_name": "giving_go_a_go",
        "activity_category": "workshop"
      },
      {
        "scanned_at": "2025-01-17T04:07:35.311375",
        "activity_name": "opening_ceremony",
        "activity_category": "activity"
      }
    ]
  }
]
```

### 1. **GET `/users`**
Fetch all users along with their scan history.

#### Request
- **Method:** `GET`
- **Endpoint:** `/users`

#### Response
- **Status Code:** `200 OK`

```json
[
  {
    "user_id": 1,
    "name": "James Graves",
    "email": "hollypace@example.org",
    "phone_num": "+1-758-654-8939x00098",
    "badge_code": "give-seven-food-trade",
    "scans": [
      {
        "scanned_at": "2025-01-19T03:00:27.836055",
        "activity_name": "giving_go_a_go",
        "activity_category": "workshop"
      },
      {
        "scanned_at": "2025-01-17T04:07:35.311375",
        "activity_name": "opening_ceremony",
        "activity_category": "activity"
      }
    ]
  }
]
```

### 1. **GET `/users`**
Fetch all users along with their scan history.

#### Request
- **Method:** `GET`
- **Endpoint:** `/users`

#### Response
- **Status Code:** `200 OK`

```json
[
  {
    "user_id": 1,
    "name": "James Graves",
    "email": "hollypace@example.org",
    "phone_num": "+1-758-654-8939x00098",
    "badge_code": "give-seven-food-trade",
    "scans": [
      {
        "scanned_at": "2025-01-19T03:00:27.836055",
        "activity_name": "giving_go_a_go",
        "activity_category": "workshop"
      },
      {
        "scanned_at": "2025-01-17T04:07:35.311375",
        "activity_name": "opening_ceremony",
        "activity_category": "activity"
      }
    ]
  }
]
```

### 1. **GET `/users`**
Fetch all users along with their scan history.

#### Request
- **Method:** `GET`
- **Endpoint:** `/users`

#### Response
- **Status Code:** `200 OK`

```json
[
  {
    "user_id": 1,
    "name": "James Graves",
    "email": "hollypace@example.org",
    "phone_num": "+1-758-654-8939x00098",
    "badge_code": "give-seven-food-trade",
    "scans": [
      {
        "scanned_at": "2025-01-19T03:00:27.836055",
        "activity_name": "giving_go_a_go",
        "activity_category": "workshop"
      },
      {
        "scanned_at": "2025-01-17T04:07:35.311375",
        "activity_name": "opening_ceremony",
        "activity_category": "activity"
      }
    ]
  }
]
```

