💬 Fullstack Chat App

## Used Technologies in Backend

- Node.js

- Express.js

- JSON Web Token (JWT)

- Bcrypt.js

- Dotenv

- Clodinary

## Schemas

#### 🏗 User Schema Details

```
{
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}
```

#### 🏗 Messages Schema Details

```
{
  senderId: {  type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  receiverId: {  type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  text: {type: String},
  image: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}
```

## Routes

#### Auth Routes

- Signup (POST)

```
 http://localhost:5001/api/auth/signup
```

- Login (POST)

```
 http://localhost:5001/api/auth/login
```

- Logout (POST)

```
 http://localhost:5001/api/auth/logout
```

- Update Profile Picture (PUT)

```
 http://localhost:5001/api/auth/update-prifile
```

- Get User (GET)

```
 http://localhost:5001/api/auth/check
```

#### Messages Routes

- Get Users (GET)

```
 http://localhost:5001/api/message/users
```

- Get Messages (GET)

```
 http://localhost:5001/api/message/:id
```

- Send Messages (POST)

```
 http://localhost:5001/api/message/send/:id
```
