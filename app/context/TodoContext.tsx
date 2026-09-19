"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TodoProps } from "../types/todoProps";

type TodoContextValue = {
  todos: TodoProps[];
  addTodo: (todo: Omit<TodoProps, "id" | "status">) => void;
  updateTodo: (id: number, updates: Partial<Omit<TodoProps, "id">>) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

const STORAGE_KEY = "todo-app-todos";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);

      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hydrated]);

  const addTodo = useCallback(
    (todo: Omit<TodoProps, "id" | "status">) => {
      setTodos((prev) => [
        ...prev,
        {
          ...todo,
          id: Date.now() + Math.floor(Math.random() * 1000),
          status: "pending",
        },
      ]);
    },
    []
  );

  const updateTodo = useCallback(
    (id: number, updates: Partial<Omit<TodoProps, "id">>) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
    },
    []
  );

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === "completed" ? "pending" : "completed",
            }
          : todo
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
    }),
    [todos, addTodo, updateTodo, deleteTodo, toggleTodo]
  );

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos must be used inside TodoProvider");
  }

  return context;
}
