import { Heart, ShoppingCart } from 'lucide-react';
import React from 'react'

function SelectedProduct(props) {
    const { selectedProduct, setSelectedProduct, renderStars, addToCart, toggleFavorite, favorites } = props
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-96 object-contain bg-gray-50 rounded-lg"
                            />
                            <div className="flex gap-2 mt-4">
                                {selectedProduct.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${selectedProduct.title} ${idx + 1}`}
                                        className="w-20 h-20 object-contain bg-gray-50 rounded border cursor-pointer hover:border-blue-500"
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">{renderStars(selectedProduct.rating.rate)}</div>
                                <span className="text-sm text-gray-600">
                                    ({selectedProduct.rating.count} reviews)
                                </span>
                            </div>

                            <div className="mb-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    ${selectedProduct.discount > 0
                                        ? (selectedProduct.price * (1 - selectedProduct.discount / 100)).toFixed(2)
                                        : selectedProduct.price.toFixed(2)
                                    }
                                </span>
                                {selectedProduct.discount > 0 && (
                                    <span className="text-lg text-gray-500 line-through ml-2">
                                        ${selectedProduct.price.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">Stock: {selectedProduct.stock} items</p>
                                <p className="text-sm text-gray-600">Category: {selectedProduct.category}</p>
                            </div>

                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => addToCart(selectedProduct)}
                                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => toggleFavorite(selectedProduct.id)}
                                    className={`px-4 py-3 rounded-lg border transition-colors ${favorites.includes(selectedProduct.id)
                                            ? 'bg-red-50 border-red-200 text-red-600'
                                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Reviews Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                                {selectedProduct.reviews.map(review => (
                                    <div key={review.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-gray-900">{review.user}</span>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectedProduct