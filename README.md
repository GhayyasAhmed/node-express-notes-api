# Node Express Notes API

A simple Express and MongoDB notes app with JWT-based authentication, server-rendered pages, and CRUD note endpoints.

## Features

- User registration and login
- JWT auth stored in an HTTP-only cookie
- Protected notes routes
- Create, read, update, and delete notes
- Server-rendered views with EJS
- Global error handling

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- JSON Web Token
- Cookie Parser

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start MongoDB locally.

3. Run the app:

```bash
npm start
```

4. Open:

```text
http://localhost:3001
```

## Environment

Create a `.env` file in the project root with:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: secret used for signing JWT cookies

Example:

```env
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your_secret_here
```

If `MONGODB_URI` is not provided, the app falls back to:

```text
mongodb://localhost:27017/notes-app
```

## Flow

- Unauthenticated users who visit `/` are redirected to `/login`
- Logged-in users who visit `/login` or `/register` are redirected to `/`
- `/` shows the note creation form
- `/notes` shows all notes
- `/notes/:noteId` shows a single note and allows updating it

## Routes

### Pages

- `GET /`
- `GET /login`
- `GET /register`
- `GET /notes`
- `GET /notes/:noteId`

### Auth API

- `POST /api/auth/register`
- `POST /api/auth/login`

### Notes API

- `POST /api/notes`
- `GET /api/notes`
- `GET /api/notes/:noteId`
- `POST /api/notes/:noteId`
- `PATCH /api/notes/:noteId`
- `DELETE /api/notes/:noteId`

## Notes

- The app uses cookie-based JWT auth for browser requests.
- The JWT secret is loaded from `JWT_SECRET` in `.env`.
- `POST /api/notes/:noteId` is used by the browser edit form.
- `PATCH /api/notes/:noteId` is still available for API clients.
