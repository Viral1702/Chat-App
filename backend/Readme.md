💬 Fullstack Chat App

## Used Technologies in Backend

- Node.js

- Express.js

- JSON Web Token (JWT)

- Bcrypt.js

- Dotenv

## Schemas

#### 🏗 User Schema Details

```
{
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
}
```

#### 🏗 Messages Schema Details

## Routes

#### Auth Routes

- Signup

```
 http://localhost:5001/api/auth/signup
```

- Login

```
 http://localhost:5001/api/auth/login
```

- Logout

```
 http://localhost:5001/api/auth/logout
```
