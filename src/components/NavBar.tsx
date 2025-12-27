export default function NavBar() {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Left Side */}
                    <div className="flex items-center space-x-8">
                        
                        {/* Branding */}
                        <div className="flex items-center space-x-2">
                            {/* Logo */}
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            {/* Title */}
                            <span className="text-xl font-bold text-gray-900">ParkQuest</span>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex space-x-1">
                            <a href="/map" className="px-4 py-2 text-green-600 bg-green-50 rounded-lg font-medium">Map</a>
                            <a href="/visits" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">My Visits</a>
                            <a href="/badges" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Badges</a>
                            <a href="/community" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Community</a>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="flex items-center space-x-4">

                        {/* Notification Bell */}
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </button>

                        {/* User */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                                <div className="text-xs text-gray-500">12/63 Parks</div>
                            </div>
                            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-10 h-10 rounded-full border-2 border-green-500" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
}