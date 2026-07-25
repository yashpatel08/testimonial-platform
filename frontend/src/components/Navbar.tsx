import { MessageSquareQuote } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const links = [
    { name: "Submit", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Wall", path: "/wall" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-indigo-100 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                        <MessageSquareQuote size={22} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            Testify
                        </h1>

                        <p className="text-xs text-slate-500">
                            Customer Testimonials
                        </p>
                    </div>
                </Link>

                <nav className="flex items-center gap-2 rounded-md bg-slate-100 p-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `rounded px-5 py-2 text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow"
                                        : "text-slate-600 hover:bg-white hover:text-indigo-600"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}