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

### Register User

Creates a new user account and returns a JWT token.

**Endpoint**
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

## Password Security

- Passwords are hashed using **bcrypt**
- Hashing is enforced using a Mongoose pre-save hook
- Plain-text passwords are never stored

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

- Additional routes (login, profile, protected APIs) will be added later
- This project is structured to follow industry best practices
