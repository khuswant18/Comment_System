# Comment System Frontend

A modern React-based frontend for the comment system featuring nested conversations, real-time interactions, and responsive design.

## 🚀 Features

- **React 19** with latest features and performance improvements
- **Modular Component Architecture** with reusable components
- **Firebase Authentication** for Google OAuth login
- **Emoji Picker Integration** for rich text expressions
- **Responsive Design** with Tailwind CSS
- **Custom Hooks** for state management
- **Real-time UI Updates** with optimistic rendering
- **Loading States** for better user experience

## 📁 Project Structure

```
src/
├── components/
│   ├── Comments/
│   │   ├── Comment.jsx          # Individual comment component
│   │   ├── CommentInput.jsx     # Comment creation form
│   │   └── CommentList.jsx      # List of comments
│   ├── Layout/
│   │   ├── Header.jsx           # App header with auth
│   │   ├── LoginButton.jsx      # Google login button
│   │   ├── TabNavigation.jsx    # Tab navigation bar
│   │   └── UserProfile.jsx      # User dropdown menu
│   └── Tabs/
│       └── TabContent.jsx       # Tab content renderer
├── hooks/
│   ├── useAuth.js               # Authentication hook
│   └── useComments.js           # Comments API hook
├── firebase.js                  # Firebase configuration
├── App.jsx                      # Main application component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles
```

## 🛠 Tech Stack

- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Firebase 12.3.0** - Authentication and backend services
- **emoji-picker-react 4.13.3** - Emoji selection component
- **React Router DOM 7.9.3** - Client-side routing (for future expansion)

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Firebase project with Google Authentication enabled

### Installation

1. **Clone and navigate to frontend directory**
```bash
cd Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**

Create or update `src/firebase.js` with your Firebase configuration:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
```

4. **Configure API endpoint**

Set your backend API URL in the environment or update the `BASEURL` in `useComments.js`:

```javascript
const BASEURL = import.meta.env.VITE_API_URL || "http://localhost:3001"
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port).

## 🏗 Architecture

### Component Design

#### Core Components

**App.jsx**
- Main application orchestrator
- Manages global state (auth, comments, UI state)
- Handles authentication and comment operations

**Comment.jsx**
- Renders individual comments with replies
- Supports nested threading with Reddit-style connectors
- Handles reply interactions and like functionality

**CommentInput.jsx**
- Rich comment creation interface
- Emoji picker integration
- Auto-expanding textarea with loading states

#### Layout Components

**Header.jsx**
- Application title and authentication UI
- Responsive design for mobile and desktop

**UserProfile.jsx**
- User avatar and profile dropdown
- Logout functionality and user information display

**TabNavigation.jsx**
- Tab switching interface ("Thoughts", "Top Holders", "Activity")
- Comment count display and responsive design

#### Custom Hooks

**useAuth.js**
- Firebase authentication state management
- Local storage persistence for user data
- Login/logout functionality

**useComments.js**
- API integration for comment operations
- Loading state management (fetch, submit, reply)
- Optimized data fetching with silent updates

### State Management

The application uses React's built-in state management with custom hooks:

- **Authentication State**: Managed by `useAuth` hook
- **Comment State**: Managed by `useComments` hook
- **UI State**: Local component state for interactions

### Key Features Implementation

#### Nested Comments
- Recursive component rendering for unlimited nesting depth
- Visual threading lines using SVG connectors
- Collapsible threads with show/hide functionality

#### Loading States
- **Submitting**: Main comment creation loading
- **Reply Submitting**: Per-reply loading (tracks specific comment being replied to)
- **Fetching**: Initial data load and refresh operations

#### Emoji Integration
- `emoji-picker-react` component with custom positioning
- Click-outside handling for proper UX
- Seamless integration with comment input

#### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interfaces for mobile devices

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:3001
```

### Build Configuration

The project uses Vite with the following configuration:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## 📱 Usage

### Authentication
1. Click "Login with Google" to authenticate
2. Grant necessary permissions for profile access
3. User data is stored locally for persistence

### Creating Comments
1. Write your comment in the main input area
2. Click the emoji button to add emojis
3. Submit with "Post Comment" button
4. Loading indicator shows submission progress

### Replying to Comments
1. Click "Reply" on any comment
2. Write your reply in the expanded input
3. Click "Post" to submit the reply
4. New replies auto-expand for visibility

### Managing Conversations
1. Use "Show/Hide replies" to manage thread visibility
2. Like comments using the heart icon
3. Navigate between different tabs for content organization


## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive design utilities
- Custom component classes
- Consistent color scheme and typography
- Hover and focus states for accessibility

Key design principles:
- Mobile-first responsive design
- Consistent spacing and typography
- Accessible color contrasts
- Smooth animations and transitions


The production build is optimized for:
- Tree-shaking unused code
- CSS purging with Tailwind
- Asset optimization with Vite 

## 🚀 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview  # Preview production build locally
```

### Deployment

The frontend can be deployed to:
- **Vercel** (recommended for Vite projects)
- **Netlify**
- **Firebase Hosting**
- **Static hosting services**

Example Vercel deployment:
```bash
npm install -g vercel
vercel --prod
```

### Common Issues 

**Firebase Authentication not working:**
- Verify Firebase configuration in `firebase.js`
- Check Google OAuth settings in Firebase Console
- Ensure proper domain configuration

**API calls failing:**
- Verify backend server is running
- Check CORS configuration
- Validate API endpoint URLs

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts
- Verify responsive breakpoints

### Debug Mode

Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'comment-system:*')
```

---
