"use client";

import { useState } from "react";
import { Pen, Trash2, Check } from "lucide-react";
import { TodoProps } from "@/app/types/todoProps";
import { useTodos } from "@/app/context/TodoContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const priorityClasses = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-500 text-gray-900",
  low: "bg-green-500 text-white",
};

const TodoCard = ({ todo }: { todo: TodoProps }) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodos();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);

  // Opens the edit modal and loads the current todo data
  const openEditModal = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);

    setIsEditOpen(true);
  };

  // Saves the edited todo
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = editTitle.trim();
    const description = editDescription.trim();

    if (!title) return;

    updateTodo(todo.id, {
      title,
      description,
      priority: editPriority,
    });

    setIsEditOpen(false);
  };

  return (
    <>
      {/* TODO CARD */}
      <article className="flex h-full flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3
              className={`break-words text-lg font-semibold ${
                todo.status === "completed"
                  ? "text-muted-foreground line-through"
                  : ""
              }`}
            >
              {todo.title}
            </h3>

            <div className="flex shrink-0 gap-2">
              {/* Priority */}
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                  priorityClasses[todo.priority]
                }`}
              >
                {todo.priority}
              </span>

              {/* Status */}
              <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold capitalize text-white">
                {todo.status}
              </span>
            </div>
          </div>

          <p className="mt-2 break-words text-sm text-muted-foreground">
            {todo.description || "No description"}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto flex flex-wrap gap-2 border-t pt-3">
          {/* Complete / Mark Active */}
          <Button
            type="button"
            size="sm"
            variant={todo.status === "completed" ? "secondary" : "default"}
            onClick={() => toggleTodo(todo.id)}
          >
            <Check className="mr-1 h-4 w-4" />

            {todo.status === "completed" ? "Mark active" : "Complete"}
          </Button>

          {/* EDIT */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={openEditModal}
          >
            <Pen className="mr-1 h-4 w-4" />
            Edit
          </Button>

          {/* DELETE */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button type="button" size="sm" variant="destructive">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              }
            />

            <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this task?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. The task will be permanently
                  removed from your list.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction onClick={() => deleteTodo(todo.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </article>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit To-Do</DialogTitle>

            <DialogDescription>
              Update the task details and save your changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            {/* TITLE */}
            <div className="space-y-2">
              <label
                htmlFor={`edit-title-${todo.id}`}
                className="text-sm font-medium"
              >
                Title
              </label>

              <input
                id={`edit-title-${todo.id}`}
                value={editTitle}
                maxLength={30}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label
                htmlFor={`edit-description-${todo.id}`}
                className="text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id={`edit-description-${todo.id}`}
                value={editDescription}
                maxLength={100}
                rows={4}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* PRIORITY */}
            <div className="space-y-2">
              <label
                htmlFor={`edit-priority-${todo.id}`}
                className="text-sm font-medium"
              >
                Priority
              </label>

              <select
                id={`edit-priority-${todo.id}`}
                value={editPriority}
                onChange={(e) =>
                  setEditPriority(e.target.value as TodoProps["priority"])
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* MODAL BUTTONS */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoCard;
