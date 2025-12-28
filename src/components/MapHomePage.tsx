import { Info } from "lucide-react";

export default function MapHomePage() {
    return (
        <div className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore All 63 National Parks</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Click on any park to learn more. Sign up to start tracking your visits and earning badges.
                    </p>
                </div>
                
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl relative">
                    <div id="map"></div>
                    <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
                        <div className="flex items-start space-x-3">
                            <div className="bg-green-100 rounded-lg p-2">
                                <Info className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Start Your Journey</h4>
                                <p className="text-sm text-gray-600 mb-3">Create a free account to track your visits, share photos, and connect with other explorers.</p>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition">
                                    Sign Up Now →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}