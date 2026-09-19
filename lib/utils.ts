export { cn } from "cn"

export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

export function getInitialsProfileAvatar(name: string): string {
    const names = name.split(" ")
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
    return initials
}

export function capitalize(value: string) {
  if (!value) return "";

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function* generateId() {
  let id = 0
  while(true){
    yield id++
  }
}