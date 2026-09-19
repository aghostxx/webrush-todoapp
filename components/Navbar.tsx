import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between w-full py-4 px-8 bg-card">
            <div className="logo">
                <h1 className="text-xl font-bold">To-Do App</h1>
            </div>
            <ThemeToggle/>
        </nav>
    )
}