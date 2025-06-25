import { Heart, ShoppingCart } from 'lucide-react'
import React from 'react'

function ProductList(props) {
    const { viewMode, currentProducts, setSelectedProduct, renderStars, toggleFavorite, favorites, addToCart } = props
    return (
        <div>
            <div className={`grid gap-6 mb-8 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                }`}>
                {currentProducts.map(product => (
                    <div
                        key={product.id}
                        className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'
                            }`}
                    >
                        <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'} mb-4`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain bg-gray-50 rounded"
                                onClick={() => setSelectedProduct(product)}
                            />
                        </div>

                        <div className="flex-1">
                            <h3
                                className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                                onClick={() => setSelectedProduct(product)}
                            >
                                {product.title}
                            </h3>

                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">{renderStars(product.rating.rate)}</div>
                                <span className="text-sm text-gray-600">({product.rating.count})</span>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <span className="text-lg font-bold text-gray-900">
                                        ${product.discount > 0
                                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                            : product.price.toFixed(2)
                                        }
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="text-sm text-gray-500 line-through ml-2">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className={`p-2 rounded-full ${favorites.includes(product.id)
                                        ? 'text-red-500 bg-red-50'
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList