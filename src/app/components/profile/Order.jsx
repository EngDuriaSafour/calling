"use client";

import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import { useSession } from "next-auth/react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const statusLabels = ["Sipariş Alındı", "Hazırlanıyor", "Hazır", "Servis Edildi"];

  const { data: session } = useSession();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(
          res.data.filter((order) => order.customer === currentUser?.fullName)
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser?.fullName) {
      getOrders();
    }
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        setCurrentUser(
          res.data.filter((user) => user.email === session?.user?.email)[0]
        );
      } catch (err) {
        console.log(err);
      }
    };
    if (session?.user?.email) {
      getUsers();
    }
  }, [session]);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[45px] font-dancing italic tracking-wide">Siparişler</Title>
      
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                SİPARİŞ ID
              </th>
              <th scope="col" className="py-3 px-6">
                ADRES
              </th>
              <th scope="col" className="py-3 px-6">
                TARİH
              </th>
              <th scope="col" className="py-3 px-6">
                TOPLAM TUTAR
              </th>
              <th scope="col" className="py-3 px-6">
                DURUM
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr 
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  key={order?._id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <span>{order?._id ? `${order._id.substring(0, 8)}...` : "N/A"}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order?.address}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order?.createdAt ? new Date(order.createdAt).toLocaleDateString("tr-TR") : "N/A"}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {order?.total?.toFixed(2)} TL
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {statusLabels[order?.status ?? 0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="transition-all bg-secondary border-gray-700">
                <td colSpan="5" className="py-8 font-medium text-gray-400 text-center">
                  Henüz bir siparişiniz bulunmuyor.
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