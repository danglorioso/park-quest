import { Trees } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2 hover:bg-gray-100 transition p-2 rounded-lg duration-300">
            <div className="flex items-center space-x-2">
                {/* Logo */}
                <Trees className="w-8 h-8 text-green-600" />
                {/* Title */}
                <span className="text-xl font-bold text-gray-900">ParkQuest</span>
            </div>
        </Link>
    );
}