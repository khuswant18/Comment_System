# Comment System Project

A Full-stack, modular comment system with nested replies, emoji support, and Google OAuth authentication. Features Reddit-style threaded conversations, real-time interactions, and responsive design.

## 🚀 Features

### Core Functionality 
- **Nested Comments & Replies**: Unlimited depth comment threading with Reddit-style connectors
- **Google OAuth Authentication**: Secure login/logout with Firebase Auth 
- **Real-time Interactions**: Like comments, post replies, and manage conversations 
- **Emoji Support**: Rich emoji picker integration for enhanced expression

### UI/UX Enhancements 
- **Fully Responsive Design**: Mobile-first approach with adaptive layouts
- **Loading States**: Granular loading indicators for all async operations
- **Tab Navigation**: Organized content with "Thoughts", "Top Holders", and "Activity" tabs
- **Show/Hide Replies**: Collapsible comment threads with reply count indicators
- **Auto-expand New Replies**: Newly posted replies automatically expand for better UX

### Technical Features
- **Modular Architecture**: Reusable components and custom hooks
- **Optimized Performance**: Separate loading states to prevent UI blocking
- **Error Handling**: Comprehensive error management and user feedback
- **Database Persistence**: PostgreSQL with Prisma ORM for reliable data storage

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Auth** - Google OAuth authentication
- **emoji-picker-react** - Emoji selection component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Relational database (Neon)
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Comment_Sys_Project/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Comments/    # Comment-related components
│   │   │   ├── Layout/      # Layout and navigation components
│   │   │   └── Tabs/        # Tab content components
│   │   ├── hooks/           # Custom React hooks
│   │   └── firebase.js      # Firebase configuration
│   ├── package.json
│   └── README.md
├── Backend/                 # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── routes/             # API routes
│   ├── prisma/             # Database schema and migrations
│   ├── lib/                # Utility libraries
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Neon account)
- Firebase project with Google Auth enabled

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Comment_Sys_Project
```

### 2. Backend Setup
```bash
cd Backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run database migrations
npx prisma migrate dev
npx prisma generate

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install

# Configure Firebase
# Update src/firebase.js with your Firebase config

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5174`
- Backend API: `http://localhost:3001`

## 🌟 Additional Features Implemented

### Beyond Basic Requirements
1. **Modular Component Architecture**: Broke down monolithic components into reusable, maintainable pieces
2. **Custom Hooks**: `useAuth` and `useComments` for state management and API interactions
3. **Advanced Loading States**: Separate loading indicators for different operations
4. **Reddit-style Threading**: Visual connector lines for nested comment relationships
5. **Emoji Integration**: Rich emoji picker with click-outside handling
6. **Profile Photo Management**: Dynamic user avatars from Google OAuth
7. **Responsive Tab System**: Multi-tab interface for future feature expansion
8. **Auto-expand Functionality**: Smart reply visibility management

## 📱 Usage

1. **Login**: Click "Login with Google" to authenticate
2. **Post Comments**: Write your thoughts in the main comment input
3. **Add Replies**: Click "Reply" on any comment to respond
4. **Use Emojis**: Click the emoji button to add expressions
5. **Like Comments**: Click the heart icon to like comments
6. **Manage Threads**: Use "Show/Hide replies" to manage conversation visibility
7. **Profile**: Click your avatar to access profile options and logout

## 🧪 Testing

The application includes comprehensive functionality:
- Comment posting and reply threading
- Authentication flow with Google OAuth
- Like/unlike functionality
- Responsive design across devices
- Loading states and error handling
- Emoji picker integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Firebase for authentication services
- Prisma for excellent database tooling
- Tailwind CSS for rapid UI development
- React team for the amazing framework
- emoji-picker-react for emoji functionality

---

Built with ❤️ by khuswant