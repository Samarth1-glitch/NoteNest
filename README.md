# NoteNest Backend (Express + Mongoose) - Auth Enabled

## Setup
1. Create a MongoDB (Atlas), copy connection string.
2. Create `.env` with `MONGODB_URI`, `JWT_SECRET`, and optionally `PORT`.
3. Install dependencies: `npm install`
4. Run: `npm start` (or `npm run dev` with nodemon)

## Deployment (Render)
- Create a Web Service on Render, point to `backend` folder, set env vars `MONGODB_URI` and `JWT_SECRET`.
