# 🐾 PetShop - Online Pet Supplies Store

![CI Pipeline](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/ci.yml/badge.svg)
![Deploy to Production](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/deploy.yml/badge.svg)

## 🚀 Live Deployment

| Platform | URL |
|----------|-----|
| **Frontend (Vercel)** | [https://petshop-store-dusky.vercel.app](https://petshop-store-dusky.vercel.app) |
| **Backend API (Render)** | [https://petshop-backend-r5p8.onrender.com](https://petshop-backend-r5p8.onrender.com) |

---

## 👥 Group Information

| Name | Student ID | Role |
|------|-----------|------|
| **E. Dasun Manjitha** | [FILL YOUR STUDENT ID] | DevOps / Release Manager |
| **Thanuj Nimsara** | [FILL YOUR STUDENT ID] | Backend Developer |
| **E. Samintha Lakshan** | [FILL YOUR STUDENT ID] | Frontend Developer |

> ⚠️ **Note:** Replace `[FILL YOUR STUDENT ID]` with your actual Student IDs exactly as shown in LMS before submission.

---

## 📋 Project Description

PetShop is a full-stack e-commerce web application for browsing and purchasing pet supplies including food, toys, equipment, and grooming products. The project demonstrates professional Git workflows, automated CI/CD pipelines with GitHub Actions, and cloud deployment to Vercel and Render.

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 (Vite), CSS3, React Router, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB Atlas, Mongoose |
| **CI/CD** | GitHub Actions (`ci.yml`, `deploy.yml`) |
| **Deployment** | Vercel (frontend), Render (backend) |
| **Version Control** | Git, GitHub (branch protection, PRs, code reviews) |

## ✨ Features

- **User Authentication** – Login and Registration modal with localStorage session management
- **Product Catalog** – Browse products across 4 categories (Food, Toys, Equipment, Cosmetics)
- **Shopping Cart** – Add/remove items with live total calculation
- **Checkout & Payment** – Full checkout flow with order submission to MongoDB
- **Responsive Design** – Mobile-friendly, glassmorphism dark-mode UI
- **RESTful API** – Products and Orders endpoints with MongoDB Atlas persistence

---

## 🌿 Branch Strategy

We followed a **Git Flow** branching model:

```
main (production, protected)
 └── develop (integration & testing)
      ├── feature/homepage-layout
      ├── feature/global-styles
      ├── feature/api-integration
      ├── feature/db-connection
      ├── feature/product-api
      ├── feature/order-api
      ├── feature/ci-pipeline
      ├── feature/deploy-pipeline
      ├── feature/fix-deploy-pipeline
      └── feature/branch-protection-docs
```

- **`main`** – Production branch (protected, deploys automatically on merge)
- **`develop`** – Integration branch for testing before production
- **`feature/*`** – Individual developer work branches (10+ feature branches created)

---

## 👤 Individual Contributions

### E. Dasun Manjitha – DevOps / Release Manager
- Created and configured the GitHub repository
- Set up branch protection rules for `main` and `develop`
- Authored `.github/workflows/ci.yml` (CI Pipeline)
- Authored `.github/workflows/deploy.yml` (Deploy to Production)
- Configured Vercel frontend deployment with environment variables
- Configured Render backend deployment with deploy hooks
- Managed merge conflict resolution between feature branches
- Release coordination and final merge to `main`

### Thanuj Nimsara – Backend Developer
- Designed and implemented MongoDB Atlas database connection (`db.js`)
- Created Product model and schema (`Product.js`)
- Created Order model and schema (`Order.js`)
- Built RESTful API endpoints for products (`/api/products`)
- Built RESTful API endpoints for orders (`/api/orders`)
- Database seeding script with 16 realistic pet store products (`seed.js`)
- Backend testing setup and Express server configuration

### E. Samintha Lakshan – Frontend Developer
- Designed and built the Homepage with category cards and hero section
- Created the Category Page with product grid and image handling
- Built the Shopping Cart page with price calculations
- Implemented User Authentication modal (Login/Register)
- Implemented Checkout & Payment modal with form validation
- Created responsive Navbar with cart counter and user state
- Wrote and maintained project README documentation

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Local Development

```bash
# Clone the repository
git clone https://github.com/E-Dasun-Manjitha/Petshop-Store.git
cd Petshop-Store

# Install and run the frontend
cd frontend
npm install
npm run dev

# In a separate terminal, install and run the backend
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

---

## 🔄 CI/CD Pipeline

### CI Pipeline (`ci.yml`)
Triggered on every push and pull request to `main`, `develop`, and `feature/**` branches:
- **Frontend Job:** Checkout → Install dependencies → Lint → Build
- **Backend Job:** Checkout → Install dependencies → Run tests

### Deploy Pipeline (`deploy.yml`)
Triggered on push to `main` branch only:
- **Frontend:** Deploys to **Vercel** using the Vercel CLI with production environment
- **Backend:** Triggers a **Render** deploy hook to redeploy the backend service

---

## 🔀 Merge Conflict Documentation

During development, our team encountered a **Git merge conflict** when Samintha (Frontend) and Nimsara (Backend) both modified `App.jsx` simultaneously on different feature branches.

**The Conflict:**
- Nimsara added API integration logic and imports at the top of `App.jsx`
- Samintha added React Router routes and navigation components in the same section

**How We Resolved It:**
1. Dasun (DevOps) pulled the latest `develop` branch locally
2. Ran `git merge feature/frontend-auth` which triggered the conflict markers
3. Opened the conflicted file in VS Code's built-in Merge Editor
4. Selected "Accept Both Changes" and manually reorganised the import statements
5. Tested the combined code locally to verify it compiled and ran correctly
6. Committed the resolved file with message: `fix: resolve merge conflicts with develop`

**Lesson Learned:** Always communicate with team members before modifying shared entry-point files like `App.jsx` to minimise conflicts.

---

## 📁 Project Structure

```
Petshop-Store/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI Pipeline (lint, build, test)
│       └── deploy.yml          # Deploy to Vercel + Render
├── backend/
│   ├── src/
│   │   ├── config/db.js        # MongoDB Atlas connection
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express routes
│   │   └── server.js           # App entry point
│   ├── seed.js                 # Database seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, AuthModal, CheckoutModal
│   │   ├── pages/              # HomePage, CategoryPage, CartPage
│   │   ├── api.js              # Axios instance
│   │   └── main.jsx            # React entry point
│   ├── vercel.json             # SPA routing rewrites
│   └── package.json
├── docs/
│   └── branch-protection.md    # Branch protection documentation
├── .gitignore
├── vercel.json
└── README.md
```

---

## 📜 License

This project was created for the **Systems Administration & Maintenance** module assignment at NSBM Green University.

**Instructor:** Isuru Samarappulige
