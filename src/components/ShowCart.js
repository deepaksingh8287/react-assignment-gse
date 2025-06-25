import { Minus, Plus, ShoppingCart } from 'lucide-react'
import React from 'react'

function ShowCart(props) {
    const { setShowCart, cart, cartTotal, updateCartQuantity, removeFromCart } = props
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                        <button
                            onClick={() => setShowCart(false)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain bg-gray-50 rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                                        <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateCartQuantity(item.id, -1)}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateCartQuantity(item.id, 1)}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowCart