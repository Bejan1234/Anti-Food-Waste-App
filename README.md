# Anti Food Waste App

Web Technologies Project — ASE 2025–2026

A community-driven web application that helps users reduce food waste by sharing items that are close to expiring.

If you have something in your fridge that you won't use — share it instead of throwing it away.

---

## Key Features

### My Fridge
- **Smart Inventory Management**: Track items with expiration dates and automated status alerts
- **Color-Coded Status**: Visual indicators for available items, expiring soon, and expired products
- **Quick Add with Barcode**: Scan barcodes using OpenFoodFacts API for instant product entry
- **Expired Product Protection**: Can't share expired items—your community's safety comes first

### Community Market
- **Discover Available Products**: Browse items shared by other community members
- **Smart Claiming**: One-click to claim products available in your area
- **Direct Communication**: WhatsApp integration for seamless pickup coordination
- **Social Sharing**: Share items to Facebook, WhatsApp, and Twitter

### Community Circles
- **Create Private Groups**: Form circles with friends, family, or neighborhood members
- **Admin Controls**: Manage group members with kick functionality
- **Shared Preferences**: Track dietary preferences (Halal, Kosher, Vegetarian, etc.)
- **Smart Visibility**: Share only within your trusted circles

### User Experience
- **Glassmorphism Design**: Modern, sleek interface with stunning visual effects
- **Full Dark Mode**: Premium dark theme with persistent toggle
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant notifications for claims and group invitations

---

## Deployment

✅ **Application is live!**

- **Frontend**: https://anti-food-waste-app.vercel.app
- **Backend API**: https://anti-food-waste-app-12.onrender.com

---

## Quick Start

### Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**
- **PostgreSQL** database (or Supabase cloud database)

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the server:
```bash
node server.js
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Tech Stack

### Frontend
- **React.js** with Vite for lightning-fast development
- **Tailwind CSS** for responsive, utility-first styling
- **Lucide React** for modern, beautiful icons
- **Axios** for API communication with JWT authentication

### Backend
- **Node.js** with Express.js web framework
- **Sequelize ORM** for database management
- **JWT (jsonwebtoken)** for secure authentication
- **bcryptjs** for password hashing

### Database
- **PostgreSQL** via Supabase cloud database
- Fully normalized schema with relationships

### Deployment
- **Frontend**: Ready for Vercel
- **Backend**: Ready for Render or Heroku

---

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Create account with email & password
POST   /api/auth/login         - Login and receive JWT token
```

### Product Management
```
GET    /api/products           - Get your fridge items
GET    /api/products/explore   - Browse community marketplace
POST   /api/products           - Add new product manually
GET    /api/products/scan/:id  - Fetch barcode data from external API
PATCH  /api/products/:id       - Update product details
POST   /api/products/:id/claim - Claim a product from community
DELETE /api/products/:id       - Remove product from your fridge
```

### Groups & Social
```
GET    /api/groups             - List your community circles
POST   /api/groups             - Create new group
DELETE /api/groups/:id         - Delete group (admin only)
GET    /api/groups/:id/members - View group members
POST   /api/groups/:id/invite  - Invite user to group
DELETE /api/groups/:id/members/:userId - Remove member (admin only)
```

### User Profile
```
GET    /api/users/profile      - Fetch profile data
POST   /api/users/profile      - Update dietary preferences & contact info
```

---

## Project Structure

```
backend/
├── configuration/              # Database configuration
├── database/                   # Models (User, Product, Group schemas)
├── services/                   # Authentication middleware
├── routes/                     # API endpoints (controllers)
└── server.js                   # Entry point

frontend/
├── src/
│   ├── sections/              # Page components (Login, Dashboard, Groups, etc.)
│   ├── components/            # Reusable UI components
│   ├── tools/                 # Utilities & API client
│   ├── assets/                # Images & static files
│   └── main.jsx               # App entry point
└── vite.config.js
```

---

## How It Works

1. **Sign Up**: Create an account with your dietary preferences
2. **Add Items**: Track food in your fridge with expiration dates
3. **Share or Explore**: Share items with your circles or browse the community market
4. **Connect**: Use WhatsApp to coordinate pickup with other users
5. **Build Community**: Create groups to share with trusted people

---



