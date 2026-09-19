# 📝 To-Do App

A responsive task management application built with **Next.js, TypeScript, React, and Tailwind CSS**.

Create, manage, search, filter, edit, and complete your tasks from a clean and responsive interface. Tasks are persisted using **Local Storage**, so your data remains available even after refreshing the page.

---

## ✨ Features

### 📋 Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed
* Move completed tasks back to active

### 🎯 Task Priority

Every task has a priority level:

* 🔴 **High**
* 🟡 **Medium**
* 🟢 **Low**

Priority is clearly displayed on every task card.

### 🔎 Search & Filtering

Find tasks instantly using:

* Search by task title
* Filter by **All**
* Filter by **Active**
* Filter by **Completed**
* Filter by priority

Search and filters update the displayed tasks immediately without requiring a submit button.

### 📊 Task Statistics

The application displays real-time statistics for:

* **Total Tasks**
* **Completed Tasks**
* **Pending Tasks**

Statistics automatically update whenever the underlying task data changes.

### 💾 Data Persistence

Tasks are stored in the browser's **Local Storage**.

This means your tasks remain available after:

* Page refreshes
* Navigating between pages
* Closing and reopening the browser

### 📱 Responsive Design

The interface is designed to work across:

* 📱 Mobile
* 💻 Tablet
* 🖥️ Desktop

---

## 🛠️ Tech Stack

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| **Next.js**           | React framework and routing  |
| **React**             | UI development               |
| **TypeScript**        | Type-safe development        |
| **Tailwind CSS**      | Responsive styling           |
| **shadcn/ui**         | Reusable UI components       |
| **Lucide React**      | Icons                        |
| **React Context API** | Global Todo state            |
| **Local Storage**     | Client-side data persistence |

---

## 🧠 State Management

The application uses the **React Context API** to maintain a single global Todo state.

The Todo context exposes operations such as:

```ts
addTodo()
updateTodo()
deleteTodo()
toggleTodo()
```

Components can access the shared Todo state through:

```tsx
const {
  todos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = useTodos();
```

This prevents individual components from maintaining separate Todo lists and ensures that changes made in one part of the application are reflected everywhere.

---

## 📂 Project Structure

```text
.
├── app/
│   ├── addTodo/
│   │   └── page.tsx
│   │
│   ├── context/
│   │   └── TodoContext.tsx
│   │
│   ├── types/
│   │   └── todoProps.ts
│   │
│   ├── viewTodo/
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── TodoCard.tsx
│   ├── Navbar.tsx
│   └── ui/
│
├── lib/
│   └── utils.ts
│
├── public/
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd webrush-todoapp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📌 Usage

### Add a Task

Navigate to **Add To-Do**, then provide:

* Task title
* Description
* Priority

Click **Add To-Do** to create the task.

### Manage Tasks

From **View To-Do(s)** you can:

* Complete a task
* Edit task details
* Delete a task

### Search Tasks

Enter a title in the search field. The task list updates automatically as you type.

### Filter Tasks

Use the status and priority dropdowns to narrow down the task list.

Filters can also be combined.

For example:

```text
Search: "project"
Status: Active
Priority: High
```

will display only active high-priority tasks whose title contains `"project"`.

---

## 💾 Data Persistence

Todo data is stored under:

```text
todo-app-todos
```

in the browser's Local Storage.

The application loads saved tasks when it initializes and automatically updates Local Storage whenever the global Todo state changes.

> **Note:** Local Storage is browser-specific. Clearing your browser's site data will remove the saved tasks.

---

## 🎨 UI & UX

The application focuses on a simple task-management workflow with:

* Clear priority indicators
* Status indicators
* Confirmation before deletion
* Modal-based editing
* Responsive layouts
* Immediate search and filtering
* Real-time task statistics
* Light/dark theme support

---

## 🔮 Possible Future Improvements

Some features that could be added in the future:

* [ ] Drag-and-drop task ordering
* [ ] Due dates and reminders
* [ ] Task categories/tags
* [ ] Sorting by priority or date
* [ ] Pagination for large task lists
* [ ] Backend/database persistence
* [ ] User authentication
* [ ] Cloud synchronization
* [ ] Keyboard shortcuts
* [ ] Task creation timestamps

---

## 📄 License

This project is available for educational and personal use.

---

### Built with ❤️ using Next.js & TypeScript
