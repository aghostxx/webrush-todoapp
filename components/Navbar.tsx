import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between w-full py-4 px-4 md:px-8 bg-card shadow-[0_2px_4px_rgba(0,0,0,0.5)] rounded-xl border mb-2">
            <div className="logo">
                <h1 className="text-xl font-bold">To-Do App</h1>
            </div>
            <ThemeToggle/>
        </nav>
    )
}