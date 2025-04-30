import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // Fetch all transactions from the backend
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/transaction`);
        
        if (response.data.success) {
          // Filter transactions for current user
          const userOrders = response.data.payload.filter(order => order.user_id === currentUser.id);
          
          // Fetch item details for each order
          const ordersWithDetails = await Promise.all(userOrders.map(async order => {
            try {
              // Get item details
              const itemResponse = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/item/${order.item_id}`);
              
              if (itemResponse.data.success) {
                const item = itemResponse.data.payload;
                return {
                  ...order,
                  itemDetails: item,
                  items: [{
                    id: item.id,
                    name: item.name.toUpperCase().replace(/_/g, ' '),
                    quantity: order.quantity,
                    price: parseFloat(item.price)
                  }]
                };
              }
              return order;
            } catch (err) {
              console.error(`Error fetching details for item ${order.item_id}:`, err);
              return order;
            }
          }));
          
          setOrders(ordersWithDetails);
        } else {
          throw new Error(response.data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        alert('Gagal memuat pesanan: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePayOrder = async (orderId) => {
    if (!currentUser) return;
    
    try {
      setProcessingOrder(orderId);
      
      // Call the payTransaction endpoint from transactionController
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/transaction/pay/${orderId}`);
      
      if (response.data.success) {
        alert('Pembayaran berhasil!');
        
        // Refresh orders list
        window.location.reload();
      } else {
        throw new Error(response.data.message || 'Gagal melakukan pembayaran');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Gagal melakukan pembayaran: ' + (err.response?.data?.message || err.message));
    } finally {
      setProcessingOrder(null);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Orders Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-800">Pesanan Saya</h1>
            <p className="text-lg text-amber-900 mb-6">
              Riwayat dan status pesanan Mie Babi Rodotua Anda
            </p>
            <div className="bg-red-700 h-1 w-24 mx-auto mb-8"></div>
          </div>
          
          {/* Orders List */}
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
              <p className="mt-2 text-red-800">Memuat pesanan...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-red-800 text-white px-6 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">Pesanan #{order.id}</h3>
                      <p className="text-sm text-gray-200">{order.created_at ? formatDate(order.created_at) : 'Tanggal tidak tersedia'}</p>
                    </div>
                    <div className={`${
                      order.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white px-4 py-1 rounded-full font-bold`}>
                      {order.status === 'paid' ? 'Selesai' : 'Menunggu Pembayaran'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-3 text-gray-800 font-bold">Menu</th>
                          <th className="text-center py-3 text-gray-800 font-bold">Jumlah</th>
                          <th className="text-right py-3 text-gray-800 font-bold">Harga</th>
                          <th className="text-right py-3 text-gray-800 font-bold">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {order.items && order.items.map((item) => (
                          <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-4 font-medium">{item.name}</td>
                            <td className="text-center py-4">{item.quantity}</td>
                            <td className="text-right py-4">{formatPrice(item.price)}</td>
                            <td className="text-right py-4 font-semibold">{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="text-right font-bold py-4 text-gray-800">Total</td>
                          <td className="text-right font-bold py-4 text-red-800 text-xl">{formatPrice(order.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                    
                    <div className="mt-6 flex justify-end">
                      {order.status !== 'paid' && (
                        <button 
                          className="bg-red-800 text-white px-6 py-3 rounded-full hover:bg-red-900 transition-colors text-base font-semibold"
                          onClick={() => handlePayOrder(order.id)}
                          disabled={processingOrder === order.id}
                        >
                          {processingOrder === order.id ? 'Memproses...' : 'Bayar Sekarang'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Belum Ada Pesanan</h3>
              <p className="mt-1 text-sm text-gray-500">
                Anda belum memiliki pesanan. Yuk, pesan Mie Babi favorit kamu sekarang!
              </p>
              <div className="mt-6">
                <a href="/menu" className="bg-red-800 text-white px-4 py-2 rounded-full hover:bg-red-900 transition-colors">
                  Lihat Menu
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
