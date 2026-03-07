# Course Platform Backend (Express + MongoDB)

A backend API for a simple **course platform** where:

* **Admins** can create and manage courses
* **Users** can sign up, sign in, purchase courses, and view their purchases

The project demonstrates **authentication, middleware, rate limiting, and session-based security** using Node.js and Express.

---

# Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **express-session (cookie-based authentication)**
* **bcrypt (password hashing)**
* **Zod (request validation)**
* **express-rate-limit (API protection)**
* **dotenv (environment variables)**

---

# Features

## User Features

* User signup
* User signin (session authentication)
* Purchase courses
* View purchased courses

## Admin Features

* Admin signup
* Admin signin
* Create courses
* Update courses

## Security

* Password hashing using **bcrypt**
* Session-based authentication
* Protected routes with middleware
* **Rate limiting** to prevent brute-force attacks

---

# Project Structure

```
week-8
│
├── index.js
├── db.js
├── config.js
├── .env
│
├── routes
│   ├── user.js
│   ├── admin.js
│   └── course.js
│
├── middlewares
│   ├── user.js
│   ├── admin.js
│   └── rateLimiter.js
│
└── package.json
```

---

# Environment Variables

Create a `.env` file in the root directory.

```
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

Example:

```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/courses
SESSION_SECRET=myverystrongsecret
```

---

# Installation

Clone the repository:

```
git clone <repo-url>
cd week-8
```

Install dependencies:

```
npm install
```

---

# Running the Server

Start the server:

```
node index.js
```

Server runs on:

```
http://localhost:3000
```

---

# API Routes

## User Routes

### Signup

```
POST /api/v1/user/signup
```

Body:

```
{
  "email": "user@example.com",
  "password": "123456",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

### Signin

```
POST /api/v1/user/signin
```

Creates a **session cookie** for authentication.

---

### View Purchased Courses

```
GET /api/v1/user/purchases
```

Requires user authentication.

---

## Admin Routes

### Admin Signup

```
POST /api/v1/admin/signup
```

---

### Admin Signin

```
POST /api/v1/admin/signin
```

Creates a session cookie for admin authentication.

---

### Create Course

```
POST /api/v1/admin/course
```

Body:

```
{
  "title": "Node.js Course",
  "description": "Learn backend development",
  "price": 5000,
  "imageURL": "image.png"
}
```

Requires admin authentication.

---

### Update Course

```
PUT /api/v1/admin/course
```

---

## Course Routes

### Preview Courses

```
GET /api/v1/course/preview
```

Returns all available courses.

---

### Purchase Course

```
POST /api/v1/course/purchase
```

Requires user authentication.

Body:

```
{
  "courseId": "course_id_here"
}
```

---

# Security Middleware

### Session Authentication

User and admin authentication use **express-session**.

Sessions are stored in cookies and verified in middleware.

---

### Rate Limiting

The API uses **express-rate-limit** to prevent excessive requests.

Example limit:

* **100 requests per 15 minutes per IP**

---

# Example Authentication Flow

```
User login
↓
Server creates session
↓
Session ID stored in cookie
↓
Browser/Postman sends cookie automatically
↓
Middleware verifies session
↓
Access granted to protected routes
```

---

# Future Improvements

* Frontend using **React**
* Store sessions in **MongoDB (connect-mongo)**
* Add **pagination for courses**
* Implement **course content system**
* Add **request logging (Morgan)**

---

# License

This project is for learning and educational purposes.
