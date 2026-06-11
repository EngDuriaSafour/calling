"use client";

import Image from "next/image";
import Title from "../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../../redux/cartSlice"; 
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);

  let calculatedDiscount = 0;

  if (cart?.products?.length > 0 && cart.discountRate > 0) {
    cart.products.forEach((product) => {
      const prodCategory = (product.category || "").toLowerCase().trim();
      const prodName = (product.name || "").toLowerCase().trim();
      
      const isPizza = prodCategory === "pizza" || prodName.includes("pizza");
      const isBurger = prodCategory === "burger" || prodName.includes("burger");

      if (cart.discountRate === 20 && isBurger) {
        calculatedDiscount += product.price * 0.20 * product.quantity;
      } 
      else if (cart.discountRate === 30 && isPizza) {
        calculatedDiscount += product.price * 0.30 * product.quantity;
      }
    });
  }

  const finalTotal = cart.total - calculatedDiscount;

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch("/api/users");
          if (res.ok) {
            const users = await res.json();
            const currentUser = users.find((u) => u.email === session.user.email);
            setUser(currentUser);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }, [session]);

  const createOrder = async () => {
    try {
      if (!session) {
        toast.error("Lütfen önce giriş yapınız.", { autoClose: 1000 });
        return;
      }

      if (cart?.products?.length === 0) {
        toast.error("Sepetinizde ürün bulunmamaktadır.", { autoClose: 1000 });
        return;
      }

      if (confirm("Siparişi onaylıyor musunuz?")) {
        const newOrder = {
          customer: user?.fullName || session?.user?.name || "Anonim Kullanıcı",
          address: user?.address ? user?.address : "Masa Bilgisi Girilmedi",
          total: finalTotal,
          method: 0,
          status: 0,
        };

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        });

        if (res.ok) {
          const data = await res.json();
          toast.success("Sipariş başarıyla oluşturuldu!", { autoClose: 1000 });
          dispatch(reset());
          router.push(`/order/${data._id}`);
        } else {
          toast.error("Sipariş oluşturulurken bir hata oluştu.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">ÜRÜN</th>
                <th scope="col" className="py-3 px-6">EKSTRALAR</th>
                <th scope="col" className="py-3 px-6">FİYAT</th>
                <th scope="col" className="py-3 px-6">ADET</th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.length > 0 ? (
                cart.products.map((product, index) => {
                  const itemImage = product.img || product.imageSrc || product.image || "/images/f1.png";
                  
                  return (
                    <tr
                      className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                      key={product._id || product.id || index} 
                    >
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-3 justify-center">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image 
                            src={itemImage} 
                            alt={product.name || "Ürün"} 
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                        <span className="font-semibold">{product.name}</span>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.extras?.length > 0 ? (
                          product.extras.map((item, i) => (
                            <span key={item.id || i}>
                              {item.name || item.text}{i < product.extras.length - 1 ? ", " : ""}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.price} TL
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {product.quantity}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="transition-all bg-secondary border-gray-700">
                  <td colSpan="4" className="py-8 font-medium text-gray-400 text-center">
                    Sepetinizde henüz ürün bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center">
          <Title addClass="text-[40px]">SEPET TOPLAMI</Title>

          <div className="mt-6">
            <b>Ara Toplam: </b>{cart.total || 0} TL <br />
            <b className="inline-block my-1">
              Kampanya İndirimi: {cart.discountRate > 0 ? `(%${cart.discountRate})` : ""}
            </b>{" "}
            {calculatedDiscount.toFixed(2)} TL <br />
            <b>Toplam: </b>{finalTotal.toFixed(2)} TL
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={createOrder}
            >
              SİPARİŞİ TAMAMLA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}