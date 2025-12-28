import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <Link href="#features" className="text-gray-600 hover:text-gray-900 hidden sm:block">Features</Link>
                        <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 hidden sm:block">How It Works</Link>
                        <button className="text-green-600 hover:text-green-700 font-medium">Sign In</button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}