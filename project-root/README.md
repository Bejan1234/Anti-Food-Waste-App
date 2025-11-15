🥗 Anti Food Waste App

A community-driven web app that helps users reduce food waste by sharing food items that are close to expiring.
If you have something in your fridge that you won’t use — share it instead of throwing it away.

📌 About the Project

The app encourages users to be more aware of food waste through a fun, social, and community-based approach.
Users can track what they have in the fridge, get notified about products close to expiration, and share them with friends or groups.

This project is developed as part of the Web Technologies course at ASE (2025–2026), following the required technical stack:

SPA frontend built using a component-based framework (React)

RESTful backend using Node.js + Express

Relational DB via Prisma ORM

External API integration (OpenFoodFacts)

Deployment on a cloud provider with a free tier

Full Git versioning with incremental commits

🚀 Features (Core Functionality)
✔ Fridge Inventory

Add products to your fridge, categorized by type

Edit/delete products

Automatic category suggestions via OpenFoodFacts

✔ Expiration Tracking

Daily background job checks expiration dates

Notifications for products expiring soon (<48h)

Option to mark items as available for sharing

✔ Community Sharing

Other users can view your available items

Any user can claim an item

Owner must confirm the claim

✔ Friend Groups

Create friend groups

Add tags (vegetarian, vegan, carnivore, etc.)

Share your available items with selected groups

✔ Social Media Integration

Share items on:

Instagram (image + text)

Facebook (share dialog / link preview)

🧱 Tech Stack
Frontend

React.js (SPA)

React Router

Context API / Zustand (state management)

Material UI / TailwindCSS (UI)

Backend

Node.js

Express.js

Prisma ORM

Cron jobs for expiration notifications

Axios integration with OpenFoodFacts API

Database

PostgreSQL (recommended)
(or MySQL / MariaDB if preferred)

External API

OpenFoodFacts
Used for automatic category detection and product metadata.

Deployment

Backend: Render / Railway / Azure for Students

Frontend: Vercel / Netlify

🗄️ Database Structure (Draft)
Users

id

name

email

passwordHash

Products

id

name

categoryId

expirationDate

ownerId

status (fresh / expiring / available / claimed)

Categories

id

label

FriendGroups

id

ownerId

name

description

GroupMembers

groupId

userId

tag (vegetarian, vegan, carnivore etc.)

Claims

id

productId

claimerId

timestamp

status (pending / accepted / rejected)

🔌 API Endpoints (Initial Plan)
Auth

POST /api/auth/register
POST /api/auth/login

Products

GET /api/products – get my products
POST /api/products – add product
PUT /api/products/:id – update product
DELETE /api/products/:id – delete product
PATCH /api/products/:id/available – mark item available
POST /api/products/:id/claim – claim item

Friends & Groups

GET /api/groups
POST /api/groups
POST /api/groups/:id/members

OpenFoodFacts Integration

GET /api/external/search?query= – search and auto-complete products

🗓️ Project Timeline
📍 Nov 16 (Stage 1)

Detailed specifications

Project plan

Initial folder structure

README + Git repository setup

📍 Dec 6 (Stage 2 – Mandatory)

Fully functional REST API

Database + Prisma schema

Product CRUD

Basic friend groups

OpenFoodFacts integration

Instructions for running backend

📍 Last Seminar – Final Demo (Stage 3)

Complete React frontend

Full integration with backend

Claims system

Notifications

Deployment

Live demo

📝 Notes

This README will be updated continuously as the project progresses.
All features will be implemented incrementally with clear Git commit messages.
