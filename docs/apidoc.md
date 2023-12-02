# API Documentation

This documentation provides an overview of the API endpoints, their functionalities, and usage for a web service designed to manage user interactions, submissions, and administrative tasks.

---

## 1. Ping

- **Endpoint:** `GET /ping`
- **Purpose:** Checks the availability of the service.
- **Response:** Status of the service (e.g., online).
- **Example Response:**
  ```
  {
   "pong"
  }
  ```

---

## 2. User Signup

- **Endpoint:** `POST /user/signup`
- **Purpose:** Registers a new user account.
- **Headers:** `Content-Type: application/json`
- **Body:**

  ```
  {
  "fullName": "[name]",
  "username": "[username]",
  "email": "[email]",
  "enrollNo": "[enrollment number]",
  "password": "[password]",
  "phoneNumber": "[phone number]"
  }
  ```

- **Response:** Confirmation of account creation.

---

## 3. User Login

- **Endpoint:** `POST /user/login`
- **Purpose:** Authenticates user and provides a token.
- **Headers:** `Content-Type: application/json`
- **Body:**

  ```
  {
  "username": "[username]",
  "password": "[password]"
  }
  ```

- **Response:** User authentication token.

---

## 4. User Submission

- **Endpoint:** `POST /submission`
- **Purpose:** Allows users to submit their entries.
- **Headers:** `Content-Type: application/json`, `token: [JWT token]`
- **Body:**

  ```
  {
  "domain": "ml",
  "driveLink": "[link]",
  "liveLink": "[link]",
  "dayNo": 2
  }
  ```

- **Response:** Confirmation of submission receipt.

---

## 5. Get User Submissions

- **Endpoint:** `GET /submission/my`
- **Purpose:** Fetches submissions made by a specific user.
- **Headers:** `token: [JWT token]`
- **Response:** A list of submissions made by the user.
- **Example Request:**

  ```
  {
   "domain":"ml",
   "driveLink":"https://drive.google.com/xyz",
   "liveLink":"https://x.netlify.app",
   "dayNo":2
  }
  ```

- **Example Response:**

  ```
  {
   "msg": "successfully submitted submissionId:146b6fc2-c0c2-4c5a-b1b5-9d7bdd377d7a"
  }
  ```

---

## 6. Admin Review Submissions

- **Endpoint:** `GET /submission/all/:domain`
- **Purpose:** Retrieves all submissions for admin to review.
- **Headers:** `token: [JWT token]`
- **Response:** A list of submissions awaiting admin review.
- **Example Request:** `GET /submission/all/web`
- **Example Response:**

  ```
  [
   {
    "submissionId": "9f77ad76-783b-4046-a8c1-0caea6b16791",
    "username": "arnab",
    "driveLink": "https://drive.google.com/xyz",
    "liveLink": "https://x.netlify.app",
    "domain": "web",
    "dayNo": 1
   }
  ]
  ```

---

## 7. Submission Evaluation

- **Endpoint:** `POST /submission/evaluation`
- **Purpose:** Evaluates a submission and updates points.
- **Headers:** `Content-Type: application/json`, `token: [JWT token]`
- **Body:**

  ```
  {
  "submissionId": "[id]",
  "points": 0
  }
  ```

- **Response:** Confirmation of the evaluation of the submission.
- **Example Request:**

  ```
  {
   "submissionId":"db4442d4-885f-485f-b8a3-272308c1d641",
   "points":100
  }
  ```

- **Example Response:**

  ```
  {
   "msg": "submission processed updated score 100"
  }
  ```

  if already evaluated

  ```
  {
   "error": "No such submission"
  }
  ```

---

## 8. Leaderboard (All)

- **Endpoint:** `GET /leaderboard/all`
- **Purpose:** Retrieves the complete leaderboard data.
- **Response:** A list of leaderboard entries.
- **Example Response:**

  ```
  {
   "web": [
    {
     "username": "aryannita",
     "score": 198
    },
    {
     "username": "gov",
     "score": 100
    },
    {
     "username": "arnab",
     "score": 0
    }
   ],
   "android": [
    {
     "username": "arnab",
     "score": 200
    },
    {
     "username": "aryannita",
     "score": 99
    },
    {
     "username": "gov",
     "score": 0
    }
   ],
   "ml": [
    {
     "username": "gov",
     "score": 0
    },
    {
     "username": "arnab",
     "score": 0
    },
    {
     "username": "aryannita",
     "score": 0
    }
   ]
  }
  ```

---

## 9. Day Number

- **Endpoint:** `GET /utility/day`
- **Purpose:** Retrieves the current day number of the challenge.
- **Response:** The current day number.
- **Example Response:**

  ```
  {
  	"dayNo": 2
  }
  ```

---

# General Information

- **Authentication:** JWT token is required for authenticated endpoints, specified in the header.
- **Content-Type:** `POST` requests require a `Content-Type: application/json` header.

This overview provides a basic understanding of each endpoint. For any further information, use [insomnia_api_endpoints.json](./Insomnia_api_endpoints.json) to import the API endpoints into Insomnia and test apis.
