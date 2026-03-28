# Installation

1. Clone and install dependencies:

git clone <https://github.com/ahmedelmessery/TODO_KANBAN.git>
cd todo-kanban
npm install

2. Start the API server (first terminal):

npm run server

3. Start the app (second terminal):

npm run dev

4. Open http://localhost:3000

# Features

- 4 columns: Backlog, In Progress, Review, Done
- Create, update, and delete tasks
- Drag and drop between columns
- Search tasks
- Pagination (5 tasks per page)

# Tech Stack

- Next.js 16
- TypeScript
- Material-UI
- React Query
- Zustand
- @dnd-kit
- json-server

# API Endpoints

- GET /tasks
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

* Make sure json-server is running on port 4000
