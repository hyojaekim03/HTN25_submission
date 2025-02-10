# **Hack the North 2025 Backend Challenge**

## **Tech Stack**
- **Language:** TypeScript with Node.js and Express.js
- **Database:** SQLite (chosen for simplicity and lightweight implementation)
- **Framework:** Express.js (for building RESTful API services)
- **Package Manager:** npm
---
## **Overview**
This document outlines the key components of the backend solution, including the database design and APIs.

1. **JSON data**
2. **Database**
3. **APIs**
4. **Bonus APIs**
5. **Set-up**
6. **Final Thoughts**

---
## **JSON data**
Upon reviewing the JSON data, I noticed that there were a few badge codes which were empty strings. I am assuming that this happens because multiple people who signed up didn't check-in (they didn't show up). This might interfere with the definition of badge codes being "unique" and therefore we must treat this accordingly. I will be allowing NULL values for this so that existing entries are all unique. This also made it more difficult to fetch data by badge codes for a few reasons. 
For example, if a user wanted to change their phone number and name **before** the event started, we would not be able to use their badge codes  as identifiers. 


## **Database**

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

### Base URL

Local Development: `http://localhost:3000`

---

### Endpoints

---

#### 1. **GET `/users`**
Fetch all users along with their scan history.

##### Request
- **Method:** `GET`
- **Endpoint:** `/users`

##### Response
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

### **2. GET /users/:userId**

Fetch full details of a specific user by their `userId`.

#### **Request**

- **Method:** `GET`
- **Endpoint:** `/users/:userId`

#### **Path Parameters**

| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| `userId`  | string | The unique ID of the user |

#### **Response**

**200 OK**

```json
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
```

### **3. PATCH /users/:userId**

Update a user's data. This endpoint supports partial updates, meaning only the fields you provide in the request body will be updated. It does not allow updating scan records. Although the requirements suggested using the PUT method, I believed that PATCH would be a little more appropriate in this situation because of partial updates! 

#### **Request**

- **Method:** `PATCH`
- **Endpoint:** `/users/:userId`

#### **Path Parameters**

| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| `userId`  | string | The unique ID of the user. |

#### **Request Body**

The request body should contain a combination of the following fields:

| Field          | Type   | Description               |
|----------------|--------|---------------------------|
| `phone_num`    | string | Updated phone number.      |
| `name`         | string | Updated name of the user.  |

**Example Request:**

```json
{
  "phone_num": "111-1111-1111",
  "name": "Test Name"
}
```
#### **Response**

**200 OK**

```json
{
    "user_id": 1,
    "name": "Test Name",
    "email": "hollypace@example.org",
    "phone_num": "111-1111-1111",
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
        },
        {
            "scanned_at": "2025-02-10T02:25:22.095Z",
            "activity_name": "giving_go_a_go",
            "activity_category": "workshop"
        }
    ]
}
```


### **4. PUT /scan/:badgeCode**

Add a new scan for a user by their `badgeCode`. I chose badgeCode as the identifier here, because a new activity is added only when hackers' scans their QR Codes. This endpoint allows creating a scan record for a specific activity. If the activity doesn't exist, it will be created. The user's `updated_at` field will also be updated.

#### **Request**

- **Method:** `PUT`
- **Endpoint:** `/scan/:badgeCode`

#### **Path Parameters**

| Parameter     | Type   | Description                  |
|---------------|--------|------------------------------|
| `badgeCode`   | string | The unique badge code of the user |

#### **Request Body**

| Field              | Type   | Description                                |
|--------------------|--------|--------------------------------------------|
| `activity_name`    | string | The name of the activity                   |
| `activity_category`| string | The category of the activity (e.g., workshop, meal) |

**Example Request Body:**
```json
{
  "activity_name": "giving_go_a_go",
  "activity_category": "workshop"
}
```
#### **Response**

**200 OK**

```json
{
  "scanned_at": "2025-01-19T03:00:27.836055",
  "activity_name": "giving_go_a_go",
  "activity_category": "workshop"
}
```

### **5. GET /scans**

Retrieve a list of activities with their frequency (# of total scans throughout the event). This endpoint supports optional filtering by activity category and scan frequency.

#### **Request**

- **Method:** `GET`
- **Endpoint:** `/scans`

#### **Query Parameters**

| Parameter           | Type   | Description                                     |
|---------------------|--------|-------------------------------------------------|
| `min_frequency`     | number | Minimum number of scans required to be included |
| `max_frequency`     | number | Maximum number of scans allowed to be included  |
| `activity_category` | string | Filter by activity category (e.g., workshop, meal) |

**Example Request:**

`GET /scans?min_frequency=5&activity_category=workshop`

#### **Response**

**200 OK**

```json
[
  {
    "activity_name": "giving_go_a_go",
    "activity_category": "workshop",
    "frequency": 12
  },
  {
    "activity_name": "opening_ceremony",
    "activity_category": "activity",
    "frequency": 8
  }
]
```

## **Bonus APIs**
