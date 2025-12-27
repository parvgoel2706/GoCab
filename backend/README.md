# Backend API

This repository contains the backend implementation of the application, built using **Node.js, Express, MongoDB (Mongoose)**.

The backend follows a clean layered architecture:  
**Routes → Controllers → Services → Models**  

Request validation is handled using **Joi**, authentication using **JWT**, and passwords are securely hashed using **bcrypt**.

---

## Base URL

```
http://localhost:<PORT>
```

Example:
```
http://localhost:3000
```

---

## API Endpoints

---

## Register User

Creates a new user account and returns a JWT token.

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
  "password": "test@123"
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
  },
  "token": "JWT_TOKEN"
}
```

> Passwords are never returned in responses.

---

## Login User

Authenticates an existing user and returns a JWT token along with user details.

### Endpoint
```
POST /users/login
```

---

### Request Body

```json
{
  "email": "test@example.com",
  "password": "test@123"
}
```

---

### Validation Rules

- `email` → required, valid email format  
- `password` → required  

Invalid credentials return **401 Unauthorized**.

---

### Success Response

**Status Code**
```
200 OK
```

```json
{
  "authStatus": "authenticated",
  "token": "JWT_TOKEN",
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

> The same error message is returned for invalid email or password to prevent user enumeration attacks.

---

## Password Security

- Passwords are hashed using **bcrypt**
- Password comparison is done using secure bcrypt comparison
- Plain-text passwords are never stored or returned

---

## Authentication

- JWT-based authentication
- Token is generated after successful login or registration

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
├── app.js
├── server.js
└── README.md
```

---

## Notes

- Register and Login routes are implemented
- Additional routes (profile, protected APIs) will be added later
- Project follows industry best practices with clean separation of concerns
- Designed to be scalable, testable, and interview-ready
