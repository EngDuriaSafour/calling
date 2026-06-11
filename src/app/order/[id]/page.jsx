"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState, use } from "react";

export default function OrderDetail({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
        );
        setOrder(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) {
      fetchOrder();
    }
  }, [params?.id]);

  if (loading) {
    return <div className="text-center text-white py-20 text-xl font-medium">Sipariş detayları yükleniyor...</div>;
  }

  if (!order) {
    return <div className="text-center text-white py-20 text-xl font-medium">Sipariş bulunamadı.</div>;
  }

  const status = order.status ?? 0;

  const statusClass = (index) => {
    if (index === status) return "animate-pulse";
    if (index < status) return "";
    return "opacity-30 filter grayscale";
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-[1000px]">
        <div className="flex items-center flex-1 w-full max-h-28">
          <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">SIPARIŞ ID</th>
                <th scope="col" className="py-3 px-6">MÜŞTERI / MASA</th>
                <th scope="col" className="py-3 px-6">NOT / DETAY</th>
                <th scope="col" className="py-3 px-6">TOPLAM</th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  {order._id ? `${order._id.substring(0, 8)}...` : "N/A"}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.customer}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.address}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.total?.toFixed(2)} TL
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full p-10 bg-primary mt-6 rounded-xl">
          <div className={`relative flex flex-col items-center gap-y-2 ${statusClass(0)}`}>
            <Image
              src="/images/paid.png"
              alt="Sipariş Alındı"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-black">Sipariş Alındı</span>
          </div>
          <div className={`relative flex flex-col items-center gap-y-2 ${statusClass(1)}`}>
            <Image
              src="/images/bake.png"
              alt="Hazırlanıyor"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-black">Hazırlanıyor</span>
          </div>
          <div className={`relative flex flex-col items-center gap-y-2 ${statusClass(2)}`}>
            <Image
              src="/images/hazır.png"
              alt="Hazır"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-black">Hazır (Servis Bekliyor)</span>
          </div>
          <div className={`relative flex flex-col items-center gap-y-2 ${statusClass(3)}`}>
            <Image
              src="/images/delivered.png"
              alt="Servis Edildi"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-black">Servis Edildi</span>
          </div>
        </div>
      </div>
    </div>
  );
}