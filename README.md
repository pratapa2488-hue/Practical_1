# Course Enrollment API

A simple Express API backed by MongoDB for course enrollment.

## Endpoints

- POST `/courses`
- GET `/courses`
- GET `/courses/:id`
- PUT `/courses/:id`
- DELETE `/courses/:id`
- GET `/courses/cheap`

## Validation

- All fields are required: `courseName`, `trainer`, `duration`, `fees`
- `duration` and `fees` must be numbers greater than `0`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run MongoDB locally or set `MONGODB_URI` in `.env`.

3. Start the server:

```bash
npm start
```

The API is available at `http://localhost:3000`.
