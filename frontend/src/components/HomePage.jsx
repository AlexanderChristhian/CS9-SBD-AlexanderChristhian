import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      <div className="w-full px-4 py-12">
        <div className="flex flex-col items-center">
          {/* Hero Section */}
          <div className="w-full md:w-4/5 lg:w-3/4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-800">Mie Babi Rodotua</h1>
            <p className="text-xl text-amber-900 mb-6">
              Nikmati kelezatan mie babi terbaik di kota ini!
            </p>
            <div className="bg-red-700 h-1 w-24 mx-auto mb-8"></div>
          </div>
          
          {/* Mie Babi Promotion Image */}
          <div className="w-full md:w-4/5 lg:w-3/4 mb-12 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="promo_diskon_mie_babi_rodotua.jpg" 
              alt="Promosi Mie Babi Rodotua" 
              className="w-full h-auto object-cover"
            />
            <div className="bg-red-800 text-white py-3 px-4 text-center">
              <p className="text-lg font-semibold">Promo Spesial! Diskon 50% Untuk Pembelian Pertama</p>
              <p className="text-sm">*Syarat dan ketentuan berlaku</p>
            </div>
          </div>
          
          {/* Nasi Campur Promotion Image - New Addition */}
          <div className="w-full md:w-4/5 lg:w-3/4 mb-12 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <a href="/menu" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/menu?tab=nasi_campur';
            }}>
              <img 
                src="promo_nasi_campur.jpg" 
                alt="Promosi Nasi Campur Spesial" 
                className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
              />
              <div className="bg-amber-700 text-white py-3 px-4 text-center">
                <p className="text-lg font-semibold">Menu Baru! Nasi Campur Spesial dengan Berbagai Pilihan Lauk</p>
                <p className="text-sm">*Tersedia mulai 1 Juni 2024 - Klik untuk melihat menu</p>
              </div>
            </a>
          </div>
          
          {/* Description */}
          <div className="w-full md:w-3/4 lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-amber-900">Tentang Mie Babi Kami</h2>
            <p className="text-gray-700 mb-4">
              Mie Babi Rodotua adalah restoran yang menghadirkan cita rasa mie babi autentik 
              dengan resep rahasia yang telah diwariskan selama beberapa generasi. 
              Kami hanya menggunakan bahan-bahan berkualitas terbaik dan daging babi pilihan.
            </p>
            <p className="text-gray-700 mb-6">
              Setiap mangkuk mie kami disajikan dengan kuah kaldu yang kaya rasa, 
              topping daging babi yang lezat, dan bumbu rahasia yang membuat 
              pelanggan kami terus kembali untuk menikmati hidangan kami.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/menu"
                className="bg-red-800 text-white px-6 py-2 rounded-full hover:bg-red-900 transition-colors inline-block"
              >
                Lihat Menu Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
