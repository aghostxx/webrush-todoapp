"use client";

import { ThemeProvider } from "next-themes"

export default function Providers({
  children,
  themes = ['light', 'dark'],
  ...props

}: React.ComponentProps<typeof ThemeProvider>) {

  return (
    <ThemeProvider {...props} themes={themes} attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}