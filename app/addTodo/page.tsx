"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/app/context/TodoContext";
import { TodoProps } from "../types/todoProps";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";

export default function AddTodoPage() {
  const router = useRouter();
  const { addTodo } = useTodos();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<TodoProps["priority"]>("low");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    addTodo({
      title: trimmedTitle,
      description: description.trim(),
      priority,
    });

    router.push("/viewTodo");
  };

  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-lg rounded-xl border bg-card p-4 sm:p-6 shadow-[0_6px_10px_rgba(0,0,0,0.5)]">
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
          Add a New To-Do
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">
                <Tooltip>
                  <TooltipTrigger>
                    <span>*</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Title is required</p>
                  </TooltipContent>
                </Tooltip>
              </span> <span className="text-xs text-muted-foreground ml-1">(Maximum 30 characters)</span>
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter To-Do title"
              maxLength={30}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-xs text-muted-foreground ml-1">Optional (Maximum 100 characters)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter To-Do description"
              maxLength={100}
              rows={4}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TodoProps["priority"])
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <Button type="submit" className="w-full">
            Add To-Do
          </Button>
        </form>
      </section>
    </main>
  );
}
