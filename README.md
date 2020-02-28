# S3 Photostore App

This app was made by [Katie Embrey-Farquhar]("https://github.com/kmcknight1") as a fun project to learn more about AWS S3, connected to a [React Native Frontend]("https://github.com/kmcknight1/rn-image-upload").

## **API Documentation**

**BASE URL** ???

- Attach endpoints to the Base URL to hit them with HTTP Requests.

### **Table of Contents**

#### NON-PROTECTED ENDPOINTS

| Links                                   | Endpoints            |
| --------------------------------------- | -------------------- |
| [POST Registration](#post-registration) | `/api/auth/register` |
| [POST Login](#post-login)               | `/api/auth/login`    |

### [POST] Registration

#### URL: ???/api/auth/register

**Payload:** _an object with the following:_

> **Required:** `username` & `password`

```json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

**Return:** _an object with the user credentials provided in the request body_

```json
{
  "id": 352,
  "username": "newUsername",
  "name": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWF0IjoxNTgyNzI4NTU2LCJleHAiOjE1ODI4MTQ5NTZ9.XNLEZAxkHWqjB6JKNR2ECUkkIq2BydhiqjJhWVMcqsM"
}
```

[Back to Top](#table-of-contents)

---

### [POST] Login

#### URL: https://tripsplit-backend.herokuapp.com/api/auth/login

**Payload:** _an object with the following:_

```json
{
  "username": "username",
  "password": "password"
}
```

**Return:** _an object with the user info and an authentication token. Save this token to local storage (or similar). This token will be required for all protected endpoints._

```json
{
  "id": 352,
  "username": "username",
  "name": null,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1ODI3Mjg0MTMsImV4cCI6MTU4MjgxNDgxM30.zzM1fJgosZ5sqKs7daqh0EhOR9hDUu41V9moF8tkrLc"
}
```

[Back to Top](#table-of-contents)

---
