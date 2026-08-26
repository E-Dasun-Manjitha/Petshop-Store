# PetShop 🐾 — Online Pet Supplies Store

## Group Information
- **Student 1:** Dasun [Full Name] - [Student ID] - Role: DevOps/Release Manager
- **Student 2:** Nimsara [Full Name] - [Student ID] - Role: Backend Developer
- **Student 3:** Samintha [Full Name] - [Student ID] - Role: Frontend Developer

## Project Description
PetShop is a full-stack e-commerce web application for browsing and ordering
pet equipment, cosmetics, food, and toys. Built as a team project demonstrating
professional Git workflows, automated CI/CD, and cloud deployment.

## Live Deployment
🔗 Frontend: [Vercel URL — will be added after deployment]
🔗 Backend API: [Render URL — will be added after deployment]

## Technologies Used
- React (Vite), Node.js, Express, MongoDB Atlas
- GitHub Actions (CI/CD)
- Vercel (frontend hosting), Render (backend hosting)

## Features
- Browse products by category (equipment, cosmetics, food, toys)
- Product detail pages
- Shopping cart
- Checkout with order submission
- Fully responsive design

## Branch Strategy
We followed a standard Git Flow branching model:
- `main` - Production branch (protected, auto-deploys on commit)
- `develop` - Development & integration branch (prerelease testing)
- `feature/*` - Individual developer work branches

## Individual Contributions
### Dasun — DevOps/Release Manager
- Repository setup, branch protection rules
- ci.yml and deploy.yml pipelines
- Vercel + Render deployment configuration

### Nimsara — Backend Developer
- Product, category, and order REST API endpoints
- MongoDB Atlas connection and schema design

### Samintha — Frontend Developer
- Homepage, category, product, cart, and checkout UI
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
On every push/PR, GitHub Actions builds and lints both frontend and backend.
On merge to main, the frontend auto-deploys to Vercel and the backend
auto-deploys to Render via a deploy hook.

### Challenges & Resolutions
[Will be documented after the merge conflict exercise — see Section 7 of the plan]

## Build Status
![CI Badge](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/ci.yml/badge.svg)
![Deploy Badge](https://github.com/E-Dasun-Manjitha/Petshop-Store/actions/workflows/deploy.yml/badge.svg)

## Known Limitations
- Backend free tier (Render) may take ~30s to wake up after inactivity
- No payment gateway integration (checkout is a form submission only)
- No user authentication system (planned for future improvements)
