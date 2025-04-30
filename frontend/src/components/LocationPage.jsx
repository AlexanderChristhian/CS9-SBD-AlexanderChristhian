import React from 'react';
import Navbar from './Navbar';

const LocationPage = () => {
  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Location Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-800">Lokasi Kami</h1>
            <p className="text-xl text-amber-900 mb-6">
              Kunjungi kami dan nikmati hidangan lezat Mie Babi Rodotua
            </p>
            <div className="bg-red-700 h-1 w-24 mx-auto mb-8"></div>
          </div>
          
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
            <div className="w-full h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.09163165307!2d104.75035151475844!3d-3.0364095977661663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9e4d3aa4c599%3A0x1f1523b401b2964a!2sMie%20Babi%20Rodotua!5e0!3m2!1sen!2sid!4v1654163070843!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Mie Babi Rodotua"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Detail Alamat</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Alamat:</span> Jl. Demang Lebar Daun No.89, Ilir Barat I, Palembang, Sumatera Selatan 30137
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Telepon:</span> (0711) 12345678
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Email:</span> info@miebabirodotua.com
              </p>
              
              <h3 className="text-xl font-semibold text-red-800 mb-2">Jam Operasional</h3>
              <ul className="text-gray-700 mb-4">
                <li className="mb-1">Senin - Jumat: 10:00 - 22:00</li>
                <li className="mb-1">Sabtu: 09:00 - 23:00</li>
                <li>Minggu: 09:00 - 22:00</li>
              </ul>
              
              <div className="mt-4">
                <a 
                  href="https://maps.app.goo.gl/GNeShYFnCqDe1dFt5" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-red-800 text-white px-4 py-2 rounded-full hover:bg-red-900 transition-colors inline-block"
                >
                  Petunjuk Arah
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Fasilitas</h2>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Area parkir yang luas
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ruangan ber-AC
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Wi-Fi gratis
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ruang VIP untuk acara khusus
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Toilet bersih
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tersedia layanan pesan antar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
