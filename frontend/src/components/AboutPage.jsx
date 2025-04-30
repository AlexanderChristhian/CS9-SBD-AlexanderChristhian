import React from 'react';
import Navbar from './Navbar';

const AboutPage = () => {
  return (
    <div className="bg-amber-50 min-h-screen w-full">
      <Navbar />
      
      <div className="w-full px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* About Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-800">Tentang Kami</h1>
            <p className="text-xl text-amber-900 mb-6">
              Mengenal lebih dekat dengan Mie Babi Rodotua
            </p>
            <div className="bg-red-700 h-1 w-24 mx-auto mb-8"></div>
          </div>
          
          {/* About Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                <img 
                  src="/toko_mie_babi_rodotua_klasik.png" 
                  alt="Toko Mie Babi Rodotua" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x500?text=Mie+Babi+Rodotua";
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Cerita Kami</h2>
              
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  <span className="font-semibold text-amber-900">Mie Babi Rodotua</span> didirikan pada tahun 2020 oleh 
                  Rowen Rodotua Harahap, seorang penggemar kuliner yang memiliki impian membawa cita rasa 
                  mie babi autentik ke kota Depok.
                </p>
                
                <p className="mb-4">
                  Berawal dari sebuah kios sederhana di kawasan Margonda, Depok, Mie Babi Rodotua 
                  terus berkembang berkat resep istimewa dan inovasi kreatif dari pendirinya. Nama Rodotua 
                  diambil dari nama keluarga sang pendiri yang menjadi simbol keotentikan dan kualitas.
                </p>
                
                <p className="mb-4">
                  Filosofi kami adalah menyajikan hidangan yang tak hanya lezat, namun juga otentik dan 
                  berkualitas tinggi. Setiap mangkuk mie yang kami sajikan merupakan hasil dari proses 
                  pemilihan bahan yang ketat dan teknik memasak yang teliti.
                </p>
                
                <p>
                  Dalam perkembangannya, kami juga menambahkan menu nasi campur untuk memperkaya 
                  pilihan kuliner bagi pelanggan kami, dengan tetap mempertahankan identitas cita rasa 
                  khas yang menjadi kebanggaan Mie Babi Rodotua.
                </p>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">Nilai-Nilai Kami</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Kualitas</h3>
                <p className="text-gray-700">
                  Kami berkomitmen untuk selalu menggunakan bahan-bahan berkualitas terbaik demi menjaga konsistensi rasa.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-2.6 1L3 5m9 3h9m-9 3h9m-9 3h9m-3-3v4m0 0v3m0-3h3m-3 0h-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Autentisitas</h3>
                <p className="text-gray-700">
                  Tetap mempertahankan cita rasa autentik dan resep tradisional yang menjadi warisan keluarga.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Kepuasan Pelanggan</h3>
                <p className="text-gray-700">
                  Memprioritaskan kepuasan pelanggan dengan pelayanan ramah dan pengalaman kuliner yang menyenangkan.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">Tim Kami</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-800">
                  <img 
                    src="/rowen.jpg" 
                    alt="Pendiri & CEO" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Rowen+Harahap&background=FB7185&color=ffffff&size=200";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Rowen Rodotua Harahap</h3>
                <p className="text-amber-900 font-medium mb-2">Pendiri & CEO</p>
                <p className="text-sm text-gray-700">
                  Pencetus resep mie babi khas Rodotua dengan pengalaman kuliner yang luas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-800">
                  <img 
                    src="/fathan.jpg" 
                    alt="Kepala Chef" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Fathan+Yazid&background=FB7185&color=ffffff&size=200";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Fathan Yazid</h3>
                <p className="text-amber-900 font-medium mb-2">Kepala Chef</p>
                <p className="text-sm text-gray-700">
                  Ahli dalam pembuatan kuah kaldu khas Mie Babi Rodotua.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-800">
                  <img 
                    src="/ryan.jpg" 
                    alt="Manajer Operasional" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Ryan+Barnabi&background=FB7185&color=ffffff&size=200";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Ryan Barnabi</h3>
                <p className="text-amber-900 font-medium mb-2">Manajer Operasional</p>
                <p className="text-sm text-gray-700">
                  Bertanggung jawab atas kelancaran operasional restoran setiap hari.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-800">
                  <img 
                    src="/daffa.jpg" 
                    alt="Kepala Marketing" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Daffa+Sayra&background=FB7185&color=ffffff&size=200";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-1">Daffa Sayra</h3>
                <p className="text-amber-900 font-medium mb-2">Kepala Marketing</p>
                <p className="text-sm text-gray-700">
                  Mengembangkan strategi pemasaran dan media sosial untuk meningkatkan brand awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
