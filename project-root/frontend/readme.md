# Frontend - Anti Food Waste App

React + Vite frontend for the Anti Food Waste App community food sharing platform.

## Tech Stack

- React.js with Vite for fast development
- Tailwind CSS for responsive styling
- Lucide React for modern icons
- Axios for API communication
- JWT authentication with Bearer tokens

## Project Structure

```
frontend/
├── src/
│   ├── sections/            # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx    # My Fridge
│   │   ├── Explore.jsx      # Community Market
│   │   ├── Groups.jsx       # Community Circles
│   │   ├── GroupPantry.jsx  # Group shared items
│   │   └── Profile.jsx      # User profile
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   ├── ProductItem.jsx
│   │   ├── CreateGroupModal.jsx
│   │   ├── MembersModal.jsx
│   │   ├── ProductFormModal.jsx
│   │   └── GroupMembersModal.jsx
│   │
│   ├── tools/              # Utilities
│   │   └── api.js          # Axios instance with JWT
│   │
│   ├── assets/             # Images & static files
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point
│
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── package.json            # Dependencies
├── index.html              # HTML template
└── public/                 # Static files
```

## Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Running the App

**Development mode (with hot reload):**
```bash
npm run dev
```

App runs on `http://localhost:5173`

**Production build:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Token stored in localStorage
- Auto-logout on token expiration

### My Fridge (Dashboard)
- Add products manually or by barcode scan
- Track expiration dates
- Status indicators: Available, Expiring Soon, Expired
- Mark items as available for sharing
- Delete products from fridge

### Community Market (Explore)
- Browse products shared by others
- Filter by category or user
- One-click to claim products
- Direct WhatsApp contact links
- See product details and expiration status

### Community Circles (Groups)
- Create private groups with friends
- Add members to your circles
- Admin controls to manage members
- Shared dietary preferences
- Group-specific product visibility

### User Profile
- Update profile information
- Set dietary preferences (Halal, Kosher, Vegetarian, Vegan)
- Add contact information
- Change profile settings

