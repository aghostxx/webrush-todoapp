'use client'

import Image from "next/image";
import {Button, buttonVariants} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TodoProps } from "./types/todoProps";

export default function Home() {

  const router = useRouter()
  const [todos, setTodos] = useState<TodoProps[]>([])

  const handleViewTodos = () => {
    router.push("/viewTodo")
  }

  const handleAddTodo = () => {
    router.push("/addTodo")
  }

  return (
    <div className="flex items-center min-h-max justify-center bg-background font-sans">
      <main className="container mx-auto flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-8 mt-20 space-y-8">
          <h1 className="text-3xl font-bold text-center">Welcome to To-Do App</h1>
          <div className="optionsDiv flex items-center justify-center gap-10 w-full mt-10">
            <Button variant="default" className="p-5 cursor-pointer" onClick={handleViewTodos}>View To-Do(s)</Button>
            <Button variant="default" className="p-5 cursor-pointer" onClick={handleAddTodo}>Add To-Do</Button>
          </div>
      </main>
    </div>
  );
}
