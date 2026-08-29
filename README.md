# PetShop - Online Pet Supplies Store

![CI Badge](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/ci.yml/badge.svg)
![Deploy Badge](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/deploy.yml/badge.svg)

## ?? Live Deployment
- **Frontend (Live Site):** [https://petshop-store-dusky.vercel.app](https://petshop-store-dusky.vercel.app)
- **Backend API:** [Render URL - Add your Render backend URL here](https://render.com)

---

## Group Information
- **Student 1:** Dasun Manjitha - Role: DevOps/Release Manager
- **Student 2:** Nimsara - Role: Backend Developer
- **Student 3:** Samintha - Role: Frontend Developer

## Project Description
PetShop is a full-stack e-commerce web application for browsing and ordering pet equipment, cosmetics, food, and toys. Built as a team project demonstrating professional Git workflows, automated CI/CD, and cloud deployment.

## Technologies Used
- **Frontend:** React (Vite), CSS3, Lucide Icons
- **Backend:** Node.js, Express, MongoDB Atlas
- **DevOps:** GitHub Actions (CI/CD)
- **Hosting:** Vercel (frontend), Render (backend)

## ? Features
- **User Authentication:** Login and Registration system with session state.
- **Product Catalog:** Browse products by category (equipment, cosmetics, food, toys) with high-res imagery.
- **Shopping Cart:** Add, remove, and calculate total order amounts.
- **Checkout & Payments:** Fully integrated checkout flow sending real orders to the MongoDB database.
- **Responsive Design:** Mobile-friendly, glassmorphism UI.

## Branch Strategy
We followed a standard Git Flow branching model:
- `main` - Production branch (protected, auto-deploys on commit)
- `develop` - Development & integration branch (prerelease testing)
- `feature/*` - Individual developer work branches

## Individual Contributions
### Dasun - DevOps/Release Manager
- Repository setup, branch protection rules
- `ci.yml` and `deploy.yml` pipelines
- Vercel + Render deployment configuration

### Nimsara - Backend Developer
- Product, category, and order REST API endpoints
- MongoDB Atlas connection and schema design

### Samintha - Frontend Developer
- Homepage, category, product, cart, and checkout UI
- User Auth & Payment components implementation
- README documentation

## Setup & Installation

### Prerequisites
- Node.js v20+
- Git

### Installation
```bash
git clone https://github.com/E-Dasun-Manjitha/Petshop-Store.git
cd Petshop-Store

# Frontend
cd frontend && npm install && npm run dev

# Backend (in a separate terminal)
cd backend && npm install && npm run dev
```

### CI/CD Deployment Process
- On every push/PR to `main` or `develop`, GitHub Actions (`ci.yml`) runs linting and build checks for both frontend and backend.
- On merge to `main`, the `deploy.yml` pipeline triggers.
- The frontend auto-deploys to **Vercel** via the Vercel CLI.
- The backend auto-deploys to **Render** via a secure deploy hook webhook.

## Known Limitations
- Backend free tier (Render) may take ~30s to wake up after inactivity.
