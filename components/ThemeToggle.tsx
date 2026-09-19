'use client'
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Show a placeholder during SSR and initial hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='bg-foreground text-background cursor-pointer'>
            {theme === 'dark' ? <Moon /> : <Sun />}
        </Button>
    )
}