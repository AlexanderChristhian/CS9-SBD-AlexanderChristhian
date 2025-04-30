import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import axios from 'axios';

const ProfilePage = () => {
  const { currentUser, login } = useAuth();
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleTopUp = async () => {
    if (!topUpAmount || isNaN(topUpAmount) || parseInt(topUpAmount) <= 0) {
      setError('Silakan masukkan jumlah saldo yang valid');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/user/topUp`, null, {
        params: {
          id: currentUser.id,
          amount: parseInt(topUpAmount)
        }
      });

      if (response.data.success) {
        // Update the user data in context with new balance
        login(response.data.payload);
        setIsTopUpModalOpen(false);
        setTopUpAmount('');
        alert('Top up berhasil!');
      } else {
        setError(response.data.message || 'Top up gagal');
      }
    } catch (err) {
      console.error('Top up error:', err);
      setError(err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-red-800">Profil Saya</h1>
            <div className="bg-red-700 h-1 w-24 mx-auto mt-4"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-800 text-white p-6 flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-amber-300">
                <img 
                  src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=FB7185&color=ffffff&size=200`}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-gray-200">{currentUser.email}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-4 border-b border-gray-200 pb-2">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                    <p className="font-medium text-gray-800">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Pelanggan</p>
                    <p className="font-medium text-gray-800">#{currentUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Bergabung</p>
                    <p className="font-medium text-gray-800">
                      {currentUser.created_at 
                        ? new Date(currentUser.created_at).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })
                        : 'Tidak tersedia'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-4 border-b border-gray-200 pb-2">Informasi Saldo</h3>
                <div className="flex justify-between items-center bg-amber-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Saldo Tersedia</p>
                    <p className="text-2xl font-bold text-amber-900">{formatPrice(currentUser.balance || 0)}</p>
                  </div>
                  <button 
                    onClick={() => setIsTopUpModalOpen(true)}
                    className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Top Up Saldo
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-4 border-b border-gray-200 pb-2">Aksi</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigate('/orders')}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Lihat Pesanan Saya
                  </button>
                  <button 
                    onClick={() => navigate('/menu')}
                    className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Pesan Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-red-800 mb-6">Top Up Saldo</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
                Jumlah (Rp)
              </label>
              <input
                type="number"
                id="amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                min="10000"
                step="10000"
                placeholder="Masukkan jumlah top up"
                className="border border-gray-300 rounded py-3 px-4 w-full focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-gray-800 text-lg font-medium"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTopUpAmount("10000")}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    topUpAmount === "10000" 
                      ? "bg-red-800 text-white border-transparent" 
                      : "bg-red-50 text-red-800 border-red-300"
                  }`}
                >
                  Rp 10.000
                </button>
                <button
                  type="button"
                  onClick={() => setTopUpAmount("20000")}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    topUpAmount === "20000" 
                      ? "bg-red-800 text-white border-transparent" 
                      : "bg-red-50 text-red-800 border-red-300"
                  }`}
                >
                  Rp 20.000
                </button>
                <button
                  type="button"
                  onClick={() => setTopUpAmount("50000")}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    topUpAmount === "50000" 
                      ? "bg-red-800 text-white border-transparent" 
                      : "bg-red-50 text-red-800 border-red-300"
                  }`}
                >
                  Rp 50.000
                </button>
                <button
                  type="button"
                  onClick={() => setTopUpAmount("100000")}
                  className={`px-4 py-2 rounded-full text-sm border ${
                    topUpAmount === "100000" 
                      ? "bg-red-800 text-white border-transparent" 
                      : "bg-red-50 text-red-800 border-red-300"
                  }`}
                >
                  Rp 100.000
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button 
                className="px-6 py-2 border border-red-300 text-red-800 font-medium rounded-md hover:bg-red-50 transition-colors w-1/3"
                onClick={() => {
                  setIsTopUpModalOpen(false);
                  setTopUpAmount('');
                  setError('');
                }}
              >
                Batal
              </button>
              <button 
                className={`px-6 py-2 bg-red-800 text-white font-medium rounded-md hover:bg-red-700 transition-colors w-2/3 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={handleTopUp}
                disabled={isLoading}
              >
                {isLoading ? 'Memproses...' : 'Top Up Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
