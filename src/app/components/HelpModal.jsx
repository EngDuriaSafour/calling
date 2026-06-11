"use client";
import React, { useState } from "react";

const HelpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-black text-white px-5 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <span className="font-bold">Yardım</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Destek Merkezi</h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-bold text-black mb-1">Nasıl Kullanılır?</p>
                <p>Menüden seçiminizi yapın, sepete ekleyin ve siparişinizi onaylayın. Siparişiniz doğrudan mutfağa iletilecektir.</p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="font-bold text-black mb-1">Sipariş Durumu</p>
                <p>Siparişiniz sisteme girdiğinde anlık olarak şef ekranına düşer ve hazırlanmaya başlanır.</p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="font-bold text-black mb-1">Yardıma mı ihtiyacınız var?</p>
                <p>Uygulamada bir sorun yaşarsanız lütfen doğrudan garsonumuza bildiriniz.</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;