import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Star, Search, Filter, Grid, List, ChevronLeft, ChevronRight, Heart, Plus, Minus } from 'lucide-react';
import SelectedProduct from './components/SelectedProduct';
import ShowCart from './components/ShowCart';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Pagination from './components/Pagination';

const ProductShowcaseApp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 10;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // Enhance products with additional mock data
        const enhancedProducts = data.map(product => ({
          ...product,
          rating: {
            rate: Math.round((Math.random() * 2 + 3) * 10) / 10,
            count: Math.floor(Math.random() * 500 + 100)
          },
          reviews: generateMockReviews(),
          images: [product.image, product.image, product.image], // Mock multiple images
          stock: Math.floor(Math.random() * 50 + 10),
          discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30 + 10) : 0
        }));

        setProducts(enhancedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const generateMockReviews = () => {
    const reviews = [
      { id: 1, user: 'John D.', rating: 5, comment: 'Excellent quality and fast delivery!', date: '2024-01-15' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good product, matches description.', date: '2024-01-10' },
      { id: 3, user: 'Mike R.', rating: 5, comment: 'Highly recommend this product!', date: '2024-01-05' }
    ];
    return reviews.slice(0, Math.floor(Math.random() * 3 + 1));
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [products, filterCategory, priceRange, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, change) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  // Loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Product Detail Modal
  if (selectedProduct) {
    return (
      <SelectedProduct
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        renderStars={renderStars}
        addToCart={addToCart}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    )
  }

  if (showCart) {
    return (
      <ShowCart
        setShowCart={setShowCart}
        cart={cart}
        cartTotal={cartTotal}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="lg:hidden fixed bottom-4 right-4 z-30">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>

          <Sidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            categories={categories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>

                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600">
                Showing {currentProducts.length} of {filteredAndSortedProducts.length} products
              </p>
            </div>

            <ProductList
              viewMode={viewMode}
              currentProducts={currentProducts}
              setSelectedProduct={setSelectedProduct}
              renderStars={renderStars}
              toggleFavorite={toggleFavorite}
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseApp;