#  Anti Food Waste App  
**Web Technologies Project — ASE 2025–2026**

A community-driven web application that helps users reduce food waste by sharing items that are close to expiring.  
If you have something in your fridge that you won’t use — share it instead of throwing it away.

---

##  About  
This project encourages users to become more aware of food waste through a fun, social, and community-based approach.

The system allows users to:
- Manage products in their fridge
- Track expiration dates
- Mark items as available for sharing
- Allow friends to claim items
- Organize friends into tagged groups
- Share items on social media platforms

This application is developed for the **Web Technologies** course and follows the required stack:
- SPA frontend using **React**
- REST backend with **Node.js + Express**
- Relational database with **Prisma ORM**
- External API integration (**OpenFoodFacts**)
- Full Git versioning & deployment on a cloud provider

---

##  Features

###  Fridge Inventory
- Add/edit/delete food items
- Products organized into categories
- Automatic category suggestions via OpenFoodFacts

###  Expiration Tracking
- Daily cron job checks expiration dates
- Notifications for items expiring within 48h
- Products can be marked as *available for sharing*

###  Community Sharing
- Users can view available items
- Any user can *claim* an item
- The owner confirms or rejects the claim

###  Friend Groups
- Create groups of friends
- Add preference tags (vegetarian, vegan, carnivore, etc.)
- Share items only with selected groups

### ✔ Social Media Integration
- Share available items on:
  - Instagram
  - Facebook

---

##  Tech Stack

### Frontend
- React.js (SPA)
- React Router
- Context API / Zustand
- Material UI or TailwindCSS

### Backend
- Node.js  
- Express.js  
- Prisma ORM  
- Cron jobs for expiration notifications  
- Axios for API consumption  

### Database
- PostgreSQL 

### External API
- **OpenFoodFacts** (free and open source)  
Used for product data and category suggestions.

### Deployment
- Frontend: Vercel / Netlify  
- Backend: Render / Railway / Azure for Students  

---

## 🗄️ Database Structure (Draft)

### **Users**
| Field          | Type         |
|----------------|--------------|
| id             | int (PK)     |
| name           | string       |
| email          | string       |
| passwordHash   | string       |

### **Products**
| Field          | Type         |
|----------------|--------------|
| id             | int (PK)     |
| name           | string       |
| categoryId     | int (FK)     |
| ownerId        | int (FK)     |
| expirationDate | date         |
| status         | enum         |

### **Categories**
| Field  | Type     |
|--------|----------|
| id     | int (PK) |
| label  | string   |

### **FriendGroups**
| Field     | Type     |
|-----------|----------|
| id        | int (PK) |
| ownerId   | int (FK) |
| name      | string   |
| desc      | string   |

### **GroupMembers**
| Field    | Type      |
|----------|-----------|
| groupId  | int (FK)  |
| userId   | int (FK)  |
| tag      | string    |

### **Claims**
| Field      | Type      |
|------------|-----------|
| id         | int (PK)  |
| productId  | int (FK)  |
| claimerId  | int (FK)  |
| timestamp  | datetime  |
| status     | enum      |

---

##  API Endpoints (Initial Plan)
### **Auth**
-  POST /api/auth/register
-  POST /api/auth/login

### **Products**
- GET /api/products – get my products
- POST /api/products – add product
- PUT /api/products/:id – update product
- DELETE /api/products/:id – delete product
- PATCH /api/products/:id/available – mark item available
- POST /api/products/:id/claim – claim item


### **Groups & Friends**
- GET /api/groups
- POST /api/groups
- POST /api/groups/:id/members

---

##  Project Timeline

###  Stage 1 — Nov 16  
- Specifications & project plan  
- Initial repository setup  
- README + basic structure  

###  Stage 2 — Dec 6  
- Functional REST backend  
- Prisma schema + database migrations  
- CRUD operations  
- External API integration  
- Run instructions  

###  Final Stage — Last Seminar  
- Complete React frontend  
- Full integration with backend  
- Claims system  
- Deployment  
- Live demo  

---

##  To-Do Roadmap

- [ ] Initialize backend (Node + Express)
- [ ] Configure Prisma + database schema
- [ ] Implement REST API endpoints
- [ ] Add OpenFoodFacts integration
- [ ] Set up cron job notifications
- [ ] Initialize frontend (React + Vite)
- [ ] Create main pages and routes
- [ ] Implement sharing & claiming logic
- [ ] Add social media integration
- [ ] Deploy backend & frontend
- [ ] Final testing + polish

---

##  Notes  
This README will be updated throughout development.  
All progress will be documented using incremental Git commits.

---




