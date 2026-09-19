"use client";

import { useMemo, useState } from "react";
import TodoCard from "@/components/TodoCard";
import { useTodos } from "@/app/context/TodoContext";
import { TodoProps } from "../types/todoProps";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type StatusFilter = "all" | "active" | "completed";
type PriorityFilter = "all" | TodoProps["priority"];

export default function ViewTodoPage() {
  const router = useRouter()
  const isMobile = useIsMobile();

  const { todos } = useTodos();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("all");

  const filteredTodos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && todo.status === "pending") ||
        (statusFilter === "completed" && todo.status === "completed");

      const matchesPriority =
        priorityFilter === "all" ||
        todo.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [todos, search, statusFilter, priorityFilter]);

  const stats = useMemo(() => {
    const completed = todos.filter(
      (todo) => todo.status === "completed"
    ).length;

    return {
      total: todos.length,
      completed,
      pending: todos.length - completed,
    };
  }, [todos]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="leftDiv">
            <h1 className="text-2xl font-bold sm:text-3xl">Your To-Do List</h1>
            <p className="mt-1 text-sm text-muted-foreground">
            Manage, search, and filter your tasks.
            </p>
        </div>
        <div className="rightDiv">
            <Button variant="default" onClick={() => router.push("/addTodo")} className='py-1.5 px-2.5 md:py-3 md:px-5 cursor-pointer'>
              {isMobile ? '+' : "+ Add To-Do"}
            </Button>
        </div>
        
      </div>

      <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Completed Tasks" value={stats.completed} />
        <StatCard label="Pending Tasks" value={stats.pending} />
      </section>

      <section className="mb-6 rounded-xl border bg-card p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="md:col-span-1">
            <label htmlFor="search" className="mb-2 block text-sm font-medium">
              Search
            </label>
            <input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority-filter"
              className="mb-2 block text-sm font-medium"
            >
              Priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(
                  e.target.value as PriorityFilter
                )
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </section>

      {filteredTodos.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </section>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="font-semibold">No tasks found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
