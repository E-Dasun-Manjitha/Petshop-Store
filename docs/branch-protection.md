# Git Workflow and Branch Protection Strategy

This document outlines the DevOps strategies implemented for the PetShop assignment to ensure code quality and collaboration integrity.

## 🛡️ Branch Protection Rules

The `main` branch is our production branch and has been strictly protected in GitHub. The following rules are enforced:

1. **Direct Pushes Disabled:** No developer, including the repository admin, can push directly to `main`.
2. **Pull Requests Required:** All changes must go through a Pull Request (PR). This ensures that code is reviewed before it reaches production.
3. **Approvals Required:** At least **1 approving review** from a team member is required before a PR can be merged into `main`. This satisfies the peer review requirement in our assignment rubric.
4. **Conversation Resolution:** All comments and discussions on a PR must be resolved before merging.

## 🔀 Git Flow Strategy

We are following a simplified Git Flow branching model:

- **`main`**: Represents the live, production-ready code. Commits here automatically trigger the Vercel and Render deployment pipelines.
- **`develop`**: The main integration branch. All feature branches are merged here first for testing before a release to `main`.
- **`feature/*`**: Short-lived branches created for specific tasks (e.g., `feature/ci-pipeline`, `feature/product-api`).

### Standard Developer Workflow:
1. Ensure local `develop` is up to date: `git pull origin develop`
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes locally.
4. Push the feature branch to GitHub: `git push -u origin feature/your-feature-name`
5. Open a Pull Request on GitHub targeting the `develop` branch.
6. Request a review from a teammate.
7. Merge upon approval.
