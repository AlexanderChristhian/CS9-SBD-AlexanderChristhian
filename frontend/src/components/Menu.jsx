import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderModal, setOrderModal] = useState({ isOpen: false, item: null, quantity: 1 });
  const [isOrdering, setIsOrdering] = useState(false);
  const [activeTab, setActiveTab] = useState('mie_babi'); // Default active tab
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for tab parameter in URL
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get('tab');
    
    // If tab parameter exists and is valid, set it as active tab
    if (tabParam && (tabParam === 'mie_babi' || tabParam === 'nasi_campur')) {
      setActiveTab(tabParam);
    }
    
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        console.log("Fetching menu items from:", `${baseUrl}/item`);
        
        // Fetch items from the backend using the getItems function from itemController
        const response = await axios.get(`${baseUrl}/item`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        
        console.log("API Response:", response);
        
        if (response.data.success) {
          // Transform the data to match our component's expected structure and categorize by store
          const items = response.data.payload.map(item => ({
            id: item.id,
            name: item.name.toUpperCase().replace(/_/g, ' '), // Convert underscores to spaces
            description: item.description || `Menu dengan cita rasa spesial`, // Fallback description
            price: parseFloat(item.price),
            image: item.image_url || `menu_${item.name.toLowerCase().replace(/\s+/g, '_')}.png`,
            stock: item.stock,
            store: item.store_id === 1 ? 'mie_babi' : 'nasi_campur' // Categorize by store_id
          }));
          
          setMenuItems(items);
        } else {
          throw new Error(response.data.message || 'Failed to fetch menu items');
        }
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Gagal memuat menu. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Separate items by store
  const mieBabiItems = menuItems.filter(item => item.store === 'mie_babi');
  const nasiCampurItems = menuItems.filter(item => item.store === 'nasi_campur');

  const handleOrderClick = (item) => {
    if (!currentUser) {
      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }
    
    // Open order modal with selected item
    setOrderModal({
      isOpen: true,
      item: item,
      quantity: 1
    });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= orderModal.item.stock) {
      setOrderModal({ ...orderModal, quantity: value });
    }
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setIsOrdering(true);
      
      // Call the createTransaction endpoint from transactionController
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/transaction/create`,
        {
          item_id: orderModal.item.id,
          quantity: orderModal.quantity,
          user_id: currentUser.id
        }
      );
      
      if (response.data.success) {
        alert(`Pesanan berhasil dibuat! Total: ${formatPrice(response.data.payload.total)}`);
        setOrderModal({ isOpen: false, item: null, quantity: 1 });
        
        // Redirect to orders page after successful order
        navigate('/orders');
      } else {
        throw new Error(response.data.message || 'Gagal membuat pesanan');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Gagal membuat pesanan: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsOrdering(false);
    }
  };

  const closeModal = () => {
    setOrderModal({ isOpen: false, item: null, quantity: 1 });
  };

  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Menu Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-800">Menu Kami</h1>
            <p className="text-xl text-amber-900 mb-6">
              Nikmati berbagai pilihan menu lezat dari dapur kami
            </p>
            <div className="bg-red-700 h-1 w-24 mx-auto mb-8"></div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full shadow-md inline-flex">
              <button
                className={`px-6 py-3 text-lg rounded-full font-medium ${
                  activeTab === 'mie_babi' 
                    ? 'bg-red-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('mie_babi')}
              >
                Mie Babi Rodotua
              </button>
              <button
                className={`px-6 py-3 text-lg rounded-full font-medium ${
                  activeTab === 'nasi_campur' 
                    ? 'bg-red-800 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('nasi_campur')}
              >
                Nasi Campur
              </button>
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
              <p className="ml-3 text-red-800">Memuat menu...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-auto max-w-lg" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
              >
                Coba Lagi
              </button>
            </div>
          )}
          
          {/* Menu Items - Mie Babi Tab */}
          {!loading && !error && activeTab === 'mie_babi' && (
            <>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Menu Mie Babi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {mieBabiItems.length > 0 ? (
                  mieBabiItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=Mie+Babi";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-red-800 mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xl font-bold text-amber-900">{formatPrice(item.price)}</span>
                            {item.stock > 0 ? (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Stok: {item.stock}
                              </span>
                            ) : (
                              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                Habis
                              </span>
                            )}
                          </div>
                          <button 
                            className={`${
                              item.stock > 0 
                                ? 'bg-red-800 hover:bg-red-900' 
                                : 'bg-gray-400 cursor-not-allowed'
                            } text-white px-4 py-2 rounded transition-colors text-sm`}
                            disabled={item.stock <= 0}
                            onClick={() => handleOrderClick(item)}
                          >
                            {item.stock > 0 ? 'Pesan Sekarang' : 'Stok Habis'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">Tidak ada menu mie babi yang tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Menu Items - Nasi Campur Tab */}
          {!loading && !error && activeTab === 'nasi_campur' && (
            <>
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Menu Nasi Campur</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nasiCampurItems.length > 0 ? (
                  nasiCampurItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      {/* Same structure as mie babi items */}
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=Nasi+Campur";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-red-800 mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xl font-bold text-amber-900">{formatPrice(item.price)}</span>
                            {item.stock > 0 ? (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Stok: {item.stock}
                              </span>
                            ) : (
                              <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                Habis
                              </span>
                            )}
                          </div>
                          <button 
                            className={`${
                              item.stock > 0 
                                ? 'bg-red-800 hover:bg-red-900' 
                                : 'bg-gray-400 cursor-not-allowed'
                            } text-white px-4 py-2 rounded transition-colors text-sm`}
                            disabled={item.stock <= 0}
                            onClick={() => handleOrderClick(item)}
                          >
                            {item.stock > 0 ? 'Pesan Sekarang' : 'Stok Habis'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">Tidak ada menu nasi campur yang tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {orderModal.isOpen && orderModal.item && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Pesan Menu</h2>
            
            <div className="flex items-start mb-4">
              <img 
                src={orderModal.item.image} 
                alt={orderModal.item.name} 
                className="h-20 w-20 object-cover rounded mr-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80?text=Mie+Babi";
                }}
              />
              <div>
                <h3 className="font-bold text-lg">{orderModal.item.name}</h3>
                <p className="text-gray-600 text-sm">{orderModal.item.description}</p>
                <p className="font-semibold text-amber-900 mt-1">{formatPrice(orderModal.item.price)}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 font-bold text-lg mb-2">
                Jumlah Pesanan
              </label>
              <div className="flex items-center">
                <button 
                  className="bg-red-100 hover:bg-red-200 text-red-800 font-bold px-4 py-2 rounded-l border border-red-300"
                  onClick={() => orderModal.quantity > 1 && setOrderModal({
                    ...orderModal, 
                    quantity: orderModal.quantity - 1
                  })}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={orderModal.item.stock}
                  value={orderModal.quantity}
                  onChange={handleQuantityChange}
                  className="text-center w-16 py-2 text-lg font-semibold text-red-800 border-y border-red-300"
                />
                <button 
                  className="bg-red-100 hover:bg-red-200 text-red-800 font-bold px-4 py-2 rounded-r border border-red-300"
                  onClick={() => orderModal.quantity < orderModal.item.stock && setOrderModal({
                    ...orderModal, 
                    quantity: orderModal.quantity + 1
                  })}
                >
                  +
                </button>
                <span className="ml-3 text-sm font-medium text-red-700 bg-red-50 px-2 py-1 rounded">
                  Tersedia: {orderModal.item.stock}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-red-800">
                  {formatPrice(orderModal.item.price * orderModal.quantity)}
                </span>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-red-300 text-red-800 font-medium rounded hover:bg-red-50 transition-colors"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button 
                  className={`px-4 py-2 bg-red-800 text-white font-medium rounded hover:bg-red-700 transition-colors ${isOrdering ? 'opacity-75 cursor-not-allowed' : ''}`}
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                >
                  {isOrdering ? 'Memproses...' : 'Pesan Sekarang'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
