import React from 'react'

function Sidebar(props) {
    const { showFilters, setShowFilters, filterCategory, setFilterCategory, categories, setPriceRange, priceRange } = props
    return (
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block fixed lg:relative inset-0 lg:inset-auto bg-black bg-opacity-50 lg:bg-transparent z-20 lg:z-auto`}>
            <div className="w-80 lg:w-64 bg-white h-full lg:h-auto p-6 overflow-y-auto">
                <div className="flex justify-between items-center lg:hidden mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                        <div className="space-y-2">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar