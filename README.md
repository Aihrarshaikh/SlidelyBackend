﻿# SlidelyBackend

## Project Structure

slidely_backend/

├── logs/

├── node_modules/

├── src/

│ ├── controllers/

│ │ └── submissionController.ts

│ ├── middleware/

│ │ └── errorMiddleware.ts

│ ├── models/

│ │ └── submissionModels.ts

│ ├── routes/

│ │ └── submissionRoutes.ts

│ ├── services/

│ │ └── submissionService.ts

│ ├── app.ts

│ └── server.ts

├── db.json

├── .gitignore

├── package-lock.json

├── package.json

├── README.md

└── tsconfig.json


## Installation


### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/Aihrarshaikh/SlidelyBackend
    cd SlidelyBackend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Running the Application

To run the application, use the following command:
```sh
npm run dev
```

## Endpoints
- GET /api/ping: Check server status.
- POST /api/submit: Submit a new form.
- GET /api/read?index=:index: Read a form submission by index.
- DELETE /api/delete?index=:index: Delete a form submission by index.
- PUT /api/edit?email=: email: Edit a form submission by email.
- GET /api/search?email=: email: Search form submissions by email.

## The server will start on http://localhost:3000.
