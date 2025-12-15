# grocery-calculator-2

This repository provides a bootstrap for a Progressive Web App (PWA) frontend using Angular and a NestJS backend connected to MongoDB via Mongoose.

Quick summary:
- Backend: `/server` — minimal NestJS-style app using `@nestjs/*` packages and `@nestjs/mongoose` to talk to MongoDB.
- Client: a latest Angular PWA scaffold (not checked in) — instructions below to generate a proper Angular PWA using the Angular CLI and connect it to the backend.

Follow the instructions in the Backend and Frontend sections to generate and run both parts.

Backend
-------

1. Change to the server folder and install dependencies:

```bash
cd server
npm install
```

2. Set the MongoDB connection string (example uses local MongoDB):

On Windows (PowerShell):

```powershell
$env:MONGO_URI = "mongodb://localhost:27017/grocery"
npm run start:dev
```

Or set `MONGO_URI` in your environment or `.env` manager.

The backend exposes a small REST API under `/api/items`.

Client (Angular PWA)
----------------------

I recommend using the Angular CLI to generate a modern Angular app and add PWA support. From the repository root run:

```powershell
npx -y @angular/cli@latest new client --routing --style=css --skip-install
cd client
npm install
npx ng add @angular/pwa@latest --skip-confirmation
```

After scaffolding, update the Angular environment to point API calls at the backend (e.g. `http://localhost:3000/api`). Then build and serve with `ng serve` or `ng build`.

Running both apps
-----------------

1. Start MongoDB (e.g., `mongod`).
2. Start server: `cd server && npm run start:dev`.
3. Start client (from `client`): `ng serve`.

If you'd like, I can also scaffold a fully checked-in Angular app in this repo — let me know if you want that.
A progressive web app to help you track your spending on groceries and calculate your bill before you reach the cash register.
