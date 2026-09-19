"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes";
import { useState } from "react"

export default function Providers({
  children,
  themes = ['light', 'dark'],
  ...props

}: React.ComponentProps<typeof ThemeProvider>) {
  const [queryClient] = useState(
    () => new QueryClient()
  );

  return (
    <ThemeProvider {...props} themes={themes} attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}