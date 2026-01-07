# Backend API

This repository contains the backend implementation of the application, built using **Node.js, Express, MongoDB (Mongoose)**.

The backend follows a clean layered architecture:

**Routes → Controllers → Services → Models**

Request validation is handled using **Joi**, authentication is implemented using **JWT (Access & Refresh Tokens)**, and passwords are securely hashed using **bcrypt**.

---

## Base URL

```
http://localhost:<PORT>
```

Example:
```
http://localhost:3000
```

> In production, the backend is hosted separately (e.g. Render) and consumed by a frontend hosted on a different domain (e.g. Vercel).

---

## Authentication Overview

- Authentication is **cookie-based**
- Tokens are stored in **httpOnly cookies**
- Tokens are **not exposed to JavaScript**
- Cross-site authentication is supported using `SameSite=None`

### Cookies Used

| Cookie Name | Purpose |
|------------|--------|
| `user_accessToken` | Short-lived access token |
| `user_refreshToken` | Long-lived refresh token |

---

## API Endpoints

---

## Register User

Creates a new user account and sets authentication cookies.

### Endpoint
```
POST /users/register
```

---

### Request Body

```json
{
  "fullname": {
    "firstname": "Parv",
    "lastname": "Goel"
  },
  "email": "test@example.com",
  "password": "test@1234"
}
```

---

### Validation Rules

- `fullname.firstname` → required, minimum 3 characters  
- `fullname.lastname` → optional, minimum 3 characters  
- `email` → required, valid email format  
- `password` → required, minimum 8 characters  

Invalid requests return **400 Bad Request**.

---

### Success Response

**Status Code**
```
201 Created
```

```json
{
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "Parv",
      "lastname": "Goel"
    },
    "email": "test@example.com"
  }
}
```

> Access and refresh tokens are sent via **httpOnly cookies**, not in the response body.

---

## Login User

Authenticates an existing user and sets authentication cookies.

### Endpoint
```
POST /users/login
```

---

### Request Body

```json
{
  "email": "test@example.com",
  "password": "test@1234"
}
```

---

### Validation Rules

- `email` → required, valid email format  
- `password` → required, minimum 8 characters  

---

### Success Response

**Status Code**
```
200 OK
```

```json
{
  "authStatus": "authenticated",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "Parv",
      "lastname": "Goel"
    },
    "email": "test@example.com"
  }
}
```

---

### Error Response

**Invalid email or password**
```
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

> The same error message is returned for invalid email or password to prevent user-enumeration attacks.

---

## Logout User (Current Device)

Logs the user out from the current session by deleting the refresh token and clearing cookies.

### Endpoint
```
POST /users/logout
```

### Authentication
- Requires valid `user_accessToken`

---

### Success Response

```
200 OK
```

```json
{
  "message": "Successfully logout."
}
```

---

## Logout From All Devices

Invalidates **all refresh tokens** for the user and logs them out from every device.

### Endpoint
```
POST /users/logoutAll
```

### Authentication
- Requires valid `user_accessToken`

---

### Success Response

```
200 OK
```

```json
{
  "message": "Successfully logout from all devices."
}
```

---

## Password Security

- Passwords are hashed using **bcrypt**
- Secure bcrypt comparison is used during login
- Plain-text passwords are never stored or returned
- Password field is excluded by default from queries

---

## Token Management

- **Access Token**
  - Short-lived
  - Used for request authentication
- **Refresh Token**
  - Stored in database with:
    - user agent
    - IP address
    - expiry timestamp
  - Used to maintain sessions securely
- Refresh tokens are deleted on logout

---

## Validation

- All incoming requests are validated using **Joi**
- Validation occurs before controller logic
- Invalid requests fail fast with proper error responses

---

## Project Structure

```
backend/
├── controllers/
├── services/
├── models/
├── routes/
├── validators/
├── middleware/
├── utils/
├── app.js
├── server.js
└── README.md
```

---

## Notes

- Cookie-based authentication (JWT)
- Cross-site compatible (Vercel + Render)
- Refresh tokens stored securely in DB
- Clean separation of concerns
- Scalable, secure, and interview-ready architecture
