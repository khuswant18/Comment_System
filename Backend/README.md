# Comment System Backend

A robust Node.js REST API backend for the comment system with PostgreSQL database, user management, and real-time comment operations.

## 🚀 Features

- **RESTful API** with Express.js framework
- **PostgreSQL Database** with Prisma ORM
- **User Management** with Firebase integration
- **Nested Comments** with unlimited threading depth
- **Like System** with user tracking
- **CORS Support** for cross-origin requests
- **Database Migrations** for schema evolution 
- **Input Validation** and error handling

## 📁 Project Structure 

```
Backend/
├── controllers/
│   └── comment.controller.js    # Comment CRUD operations
├── routes/
│   └── comment.route.js         # API route definitions
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Database migrations
│   └── seed.js                 # Database seeding
├── lib/
│   └── prisma.js               # Prisma client configuration
├── server.js                   # Express server setup
├── package.json               # Dependencies and scripts
└── .env                       # Environment variables
```

## 🛠 Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **Prisma 6.16.3** - Database toolkit and ORM
- **PostgreSQL** - Relational database (Neon hosted)
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **dotenv 17.2.3** - Environment variable management
- **Nodemon 3.1.10** - Development server with auto-reload

## 🗄 Database Schema

### User Model
```prisma
model User {
  id       String    @id                 # Firebase UID
  name     String                        # User display name
  email    String?   @unique            # User email (optional)
  photoURL String?                      # Profile photo URL
  comments Comment[]                    # User's comments
  likes    Like[]                       # User's likes
}
```

### Comment Model
```prisma
model Comment {
  id        String   @id @default(uuid())  # Unique comment ID
  parentId  String?                        # Parent comment ID for threading
  text      String                         # Comment content
  authorId  String                         # Author's user ID
  timestamp DateTime @default(now())      # Creation timestamp
  likes     Int      @default(0)          # Like count
  
  # Relations
  user     User      @relation(fields: [authorId], references: [id])
  parent   Comment?  @relation("ParentChild", fields: [parentId], references: [id])
  children Comment[] @relation("ParentChild")
  Likes    Like[]    # Individual like records
}
```

### Like Model
```prisma
model Like {
  user      User    @relation(fields: [userId], references: [id])
  comment   Comment @relation(fields: [commentId], references: [id])
  userId    String
  commentId String
  
  @@id([userId, commentId])  # Composite primary key
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (local or hosted)
- npm or yarn package manager

### Installation

1. **Navigate to backend directory**
```bash
cd Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file with the following variables:

```env
# Database connection
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Server configuration
PORT=3001

# Example with Neon (recommended)
DATABASE_URL="postgresql://user:pass@ep-xxx.pooler.neon.tech/neondb?sslmode=require"
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## 🔌 API Endpoints

### Comments

#### GET `/api/comments`
Retrieve all comments with nested structure.

**Response:**
```json
[
  {
    "id": "uuid",
    "text": "Comment content",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "likes": 5,
    "user": {
      "id": "firebase-uid",
      "name": "User Name",
      "email": "user@example.com",
      "photoURL": "https://..."
    },
    "children": [
      {
        "id": "uuid",
        "text": "Reply content",
        "parentId": "parent-uuid",
        // ... 
      }
    ]
  }
]
```

#### POST `/api/comments`
Create a new comment or reply.

**Request Body:**
```json
{
  "text": "Comment content",
  "uid": "firebase-uid",
  "author": "User Name",
  "email": "user@example.com",
  "photoURL": "https://...",
  "parentId": "parent-uuid" // Optional for replies
}
```

**Response:**
```json
{
  "message": "Comment created successfully",
  "comment": {
    "id": "uuid",
    "text": "Comment content",
    // ... full comment object 
  }
}
```

#### GET `/api/comments/:id`
Retrieve a specific comment with its replies.

#### DELETE `/api/comments/:id`
Delete a comment (author only).

**Request Body:**
```json
{
  "uid": "firebase-uid"
}
```

#### POST `/api/comments/:id/like`
Toggle like status for a comment.

**Request Body:**
```json
{
  "uid": "firebase-uid"
}
```

**Response:**
```json
{
  "message": "Comment liked", // or "Comment unliked"
  "liked": true // or false
}
```

## 🏗 Architecture

### Controller Layer

**`comment.controller.js`** handles all comment-related operations:

- **`createComment`**: Creates new comments and replies with user upserts
- **`getAllComments`**: Fetches nested comment structure
- **`getCommentById`**: Retrieves specific comment with children
- **`deleteComment`**: Removes comments (with authorization)
- **`toggleLike`**: Manages comment likes/unlikes

### Route Layer

**`comment.route.js`** defines API endpoints:
```javascript
router.post('/comments', createComment)
router.get('/comments', getAllComments)
router.get('/comments/:id', getCommentById)
router.delete('/comments/:id', deleteComment) 
router.post('/comments/:id/like', toggleLike)
```

### Database Layer

**Prisma ORM** provides:
- Type-safe database queries
- Automatic migrations
- Relationship management
- Connection pooling

### Key Implementation Details

#### Nested Comments
Comments are retrieved with recursive children relationships:
```javascript
const comments = await prisma.comment.findMany({
  include: {
    user: { select: { id: true, name: true, email: true } },
  },
  orderBy: { timestamp: "desc" }
});

// Build nested structure
const rootComments = [];
comments.forEach(comment => {
  if (comment.parentId) {
    parent.children.push(comment);
  } else {
    rootComments.push(comment);
  }
});
```

#### User Management
User data is upserted on each comment creation:
```javascript
await prisma.user.upsert({
  where: { id: uid },
  update: { name: author, email: email },
  create: { id: uid, name: author, email: email }
});
```

#### Like System
Likes use composite keys to prevent duplicate likes:
```javascript
const existingLike = await prisma.like.findUnique({
  where: { userId_commentId: { userId: uid, commentId: id } }
});
```

## 🔧 Configuration

### Environment Variables

```env
# Required
DATABASE_URL="postgresql://..."  # PostgreSQL connection string
PORT=3001                        # Server port (optional, defaults to 3001)

# Development
NODE_ENV=development            # Environment mode
```

### CORS Configuration

The server accepts requests from multiple origins:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", 
  "https://your-frontend-domain.com" 
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

### Database Configuration

**Neon PostgreSQL** (recommended):
1. Create account at [neon.tech](https://neon.tech)
2. Create a database
3. Copy connection string to `DATABASE_URL`

**Local PostgreSQL**:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/comment_system"
```

## 🛠 Database Operations

### Migrations

Create new migration:
```bash
npx prisma migrate dev --name migration_name
```

Apply migrations to production:
```bash
npx prisma migrate deploy
```

Reset database (development only):
```bash
npx prisma migrate reset
```

### Prisma Studio

Open database browser:
```bash
npx prisma studio
```

### Seeding

Run the seed script:
```bash
npx prisma db seed
```

The seed script creates sample users and nested comments for testing.

## 🧪 Testing

### Manual API Testing

Test with cURL or Postman:

```bash
# Get all comments
curl http://localhost:3001/api/comments

# Create a comment
curl -X POST http://localhost:3001/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test comment",
    "uid": "test-uid",
    "author": "Test User",
    "email": "test@example.com"
  }'

# Like a comment
curl -X POST http://localhost:3001/api/comments/comment-id/like \
  -H "Content-Type: application/json" \
  -d '{"uid": "test-uid"}'
```

### Database Testing

Use Prisma Studio to inspect:
- User records and relationships
- Comment threading structure
- Like associations

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
```env
NODE_ENV=production
DATABASE_URL="postgresql://..." # Production database
PORT=3001
```

2. **Database Migration**
```bash
npx prisma migrate deploy
npx prisma generate
```

3. **Start Production Server**
```bash
npm start
```

### Deployment Platforms

**Render (recommended)**:
- Automatic deployments from Git
- Built-in PostgreSQL support
- Environment variable management

**Railway**:
- Simple deployment process
- Integrated database hosting
- Automatic HTTPS

**Heroku**:
- Easy PostgreSQL add-on
- Automatic deployments
- Extensive documentation

### Health Check

The server provides a simple health check:
```
GET /
Response: "Hello World"
```

## 📈 Monitoring

### Logging
The application logs:
- All database errors
- API request failures
- Server startup events

### Metrics to Monitor
- Response times for API endpoints
- Database connection health
- Error rates and types
- Active user sessions  



Enable detailed logging:
```javascript
// Add to server.js
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
  });
}
```