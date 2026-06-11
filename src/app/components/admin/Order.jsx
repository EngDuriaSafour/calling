"use client";

import { useEffect, useState } from "react";
import Title from "../ui/Title";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const statusLabels = ["Sipariş Alındı", "Hazırlanıyor", "Hazır", "Servis Edildi"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status || 0;

    if (currentStatus >= 3) return;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: currentStatus + 1,
        }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders([
          updatedOrder,
          ...orders.filter((order) => order._id !== id),
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Siparişler</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">SİPARİŞ ID</th>
              <th scope="col" className="py-3 px-6">MÜŞTERİ</th>
              <th scope="col" className="py-3 px-6">TOPLAM</th>
              <th scope="col" className="py-3 px-6">ÖDEME</th>
              <th scope="col" className="py-3 px-6">DURUM</th>
              <th scope="col" className="py-3 px-6">İŞLEM</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => {
                  const currentStatus = order?.status ?? 0;
                  
                  return (
                    <tr
                      className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                      key={order?._id}
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1">
                        {order?._id ? `${order._id.substring(0, 6)}...` : "N/A"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.customer}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.total?.toFixed(2)} TL
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order?.method === 0 ? "Nakit" : "Kart"}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {statusLabels[currentStatus]}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <button 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-3xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
                          onClick={() => handleStatus(order?._id)}
                          disabled={currentStatus >= 3}
                        >
                          {currentStatus >= 3 ? "Tamamlandı" : "Sonraki Aşama"}
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr className="transition-all bg-secondary border-gray-700">
                <td colSpan="6" className="py-8 font-medium text-gray-400 text-center">
                  Aktif sipariş bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;