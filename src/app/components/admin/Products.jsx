"use client";
import Title from "../../components/ui/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          toast.success("Ürün başarıyla silindi!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[45px] font-dancing italic tracking-wide">Ürünler</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">GÖRSEL</th>
              <th scope="col" className="py-3 px-6">ID</th>
              <th scope="col" className="py-3 px-6">BAŞLIK</th>
              <th scope="col" className="py-3 px-6">FİYAT</th>
              <th scope="col" className="py-3 px-6">İŞLEM</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((product) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  key={product._id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <Image
                      src={product.img || "/images/f1.png"}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product._id ? `${product._id.substring(0, 8)}...` : "N/A"}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.prices?.[0] || product.price || 0} TL
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-3xl font-semibold transition-all"
                      onClick={() => handleDelete(product._id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="transition-all bg-secondary border-gray-700">
                <td colSpan="5" className="py-8 font-medium text-gray-400 text-center">
                  Henüz yüklü ürün bulunamadı veya yükleniyor...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;