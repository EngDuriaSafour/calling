"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Title from "../../components/ui/Title";
import { addProduct } from "../../../../redux/cartSlice"; 
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const pizzaExtras = [
  { id: 1, name: "Ekstra Peynir", price: 35 },
  { id: 2, name: "Zeytin", price: 20 },
  { id: 3, name: "Mantar", price: 25 },
];

const burgerExtras = [
  { id: 4, name: "Turşu", price: 10 },
  { id: 5, name: "Domates", price: 10 },
  { id: 6, name: "Hardal", price: 15 },
];

const drinkExtras = [
  { id: 7, name: "Şekerli", price: 0 },
  { id: 8, name: "Ballı", price: 15 },
  { id: 9, name: "Stevia Şekeri", price: 10 },
];

const staticProductsFallback = [
  {
    title: "Akdeniz Pizzası",
    description: "Özel sos, taze fesleğen, siyah zeytin, mantar og ve eriyen nefis kaşar peyniriyle Akdeniz esintisi.",
    price: "280",
    imageSrc: "/images/f1.png",
    category: "pizza"
  },
  {
    title: "Classic Burger",
    description: "Özel burger köftesi, eriyen cheddar peyniri, taze marul, domates og ve nefis ev yapımı sos.",
    price: "240",
    imageSrc: "/images/f2.png",
    category: "burger"
  },
  {
    title: "Karışık Sebzeli Pizza",
    description: "Mısır, biber, zeytin og ve özel baharatlarla harmanlanmış, hafif ve lezzetli sebzeli alternatif.",
    price: "260",
    imageSrc: "/images/f3.png",
    category: "pizza"
  },
  {
    title: "Lezzetli İçecek",
    description: "Yemeklerinizin yanına ferahlık katacak soğuk ve buz gibi içecek seçeneği.",
    price: "45",
    imageSrc: "/images/f21.png",
    category: "icecek"
  },
  {
    title: "Dört Mevsim Pizza",
    description: "Her diliminde farklı bir lezzet; sucuk, mantar, mısır ve zeytinin mükemmel kombinasyonu.",
    price: "270",
    imageSrc: "/images/f19.png",
    category: "pizza"
  },
  {
    title: "Double Cheddar Burger",
    description: "Kat kat lezzet! Çift burger köftesi, bol cheddar peyniri og ve çıtır turşunun enfes uyumu.",
    price: "210",
    imageSrc: "/images/f20.png",
    category: "burger"
  },
  {
    title: "Margarita Pizza",
    description: "İtalyan klasiği; bolca eritilmiş mozzarella peyniri, dilimlenmiş taze domates og ve fesleğen.",
    price: "250",
    imageSrc: "/images/f6.png",
    category: "pizza"
  },
  {
    title: "Barbekü Soslu Burger",
    description: "Köz kokulu nefis barbekü sosu, çıtır soğan halkaları og ve sulu burger köftesiyle karamelize lezzet.",
    price: "230",
    imageSrc: "/images/f8.png",
    category: "burger"
  },
  {
    title: "Taze Sıkılmış Meyve Suyu",
    description: "Güne enerjik bir başlangıç için en taze meyvelerden hazırlanan doğal lezzet.",
    price: "75",
    imageSrc: "/images/f22.png",
    category: "icecek"
  }
];

export default function Page({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const dispatch = useDispatch();

  const [dbProduct, setDbProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [extraPrice, setExtraPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);

  const decodedId = params?.id ? decodeURIComponent(params.id).toLowerCase().trim() : "";
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${decodedId}`);
        if (res.ok) {
          const data = await res.json();
          setDbProduct(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [decodedId]);

  const product = dbProduct || staticProductsFallback.find((p) => {
    const staticSlug = p.title.toLowerCase().trim().replace(/ /g, "-");
    return staticSlug === decodedId || p._id === decodedId;
  });

  const basePrice = product ? Number(product.prices?.[0] || product.price || 0) : 0;
  const productPrices = product?.prices || [basePrice, basePrice * 1.3, basePrice * 1.6];
  const currentPrice = productPrices[size] + extraPrice;

  const handleSize = (sizeIndex) => {
    setSize(sizeIndex);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      setExtraPrice((prev) => prev + item.price);
      setExtras([...extras, item]);
    } else {
      setExtraPrice((prev) => prev - item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id && extra._id !== item._id));
    }
  };

  const handleClick = () => {
    if (!product) return;
    dispatch(
      addProduct({ 
        _id: product?._id || product?.id || "custom-id",
        name: product?.title || "Nefis Ürün",
        img: product?.imageSrc || product?.img || "/images/f1.png",
        extras, 
        price: currentPrice, 
        quantity: 1,
        category: product?.category
      })
    );
    toast.success("Ürün sepete eklendi!", { autoClose: 1000 });
  };

  const getActiveExtras = () => {
    if (product?.extraOptions && product.extraOptions.length > 0) {
      return product.extraOptions.map(opt => ({
        id: opt._id || opt.id,
        name: opt.text || opt.name,
        price: opt.price
      }));
    }

    const category = product?.category?.toLowerCase().trim();
    if (category === "pizza") return pizzaExtras;
    if (category === "burger") return burgerExtras;
    if (category === "icecek") return drinkExtras;
    return [];
  };

  if (loading) {
    return (
      <div className="text-center text-gray-800 py-32 text-xl font-medium">
        Ürün detayları yükleniyor...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-800 py-32 text-xl font-medium">
        Ürün bulunamadı.
      </div>
    );
  }

  const isPizza = product?.category?.toLowerCase().trim() === "pizza";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh_-_88px)] gap-12 py-12 flex-wrap container mx-auto px-6 bg-white">
      <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex-shrink-0 mx-auto">
        <Image 
          src={product?.imageSrc || product?.img || "/images/f1.png"} 
          alt={product?.title || "Ürün"} 
          fill 
          className="object-contain"
          priority
        />
      </div>

      <div className="flex-1 min-w-[320px] text-center md:text-start flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          {product?.title}
        </h1>
        
        <span className="text-primary text-3xl font-extrabold underline underline-offset-4 my-2 inline-block">
          {currentPrice} TL
        </span>
        
        <p className="text-base my-3 md:pr-12 text-gray-600 font-medium leading-relaxed">
          {product?.description || product?.desc}
        </p>

        {isPizza && (
          <div className="my-4">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Boyut Seçiniz</h4>
            <div className="flex items-center gap-x-16 md:justify-start justify-center">
              <div className="relative w-8 h-8 cursor-pointer" onClick={() => handleSize(0)}>
                <Image src="/images/size.png" alt="Küçük" fill className="object-contain" />
                <span className="absolute top-0 -right-12 text-xs bg-primary rounded-full px-[6px] py-[1px] font-semibold text-black">
                  Küçük
                </span>
              </div>
              <div className="relative w-12 h-12 cursor-pointer" onClick={() => handleSize(1)}>
                <Image src="/images/size.png" alt="Orta" fill className="object-contain" />
                <span className="absolute top-0 -right-10 text-xs bg-primary rounded-full px-[6px] py-[1px] font-semibold text-black">
                  Orta
                </span>
              </div>
              <div className="relative w-16 h-16 cursor-pointer" onClick={() => handleSize(2)}>
                <Image src="/images/size.png" alt="Büyük" fill className="object-contain" />
                <span className="absolute top-0 -right-10 text-xs bg-primary rounded-full px-[6px] py-[1px] font-semibold text-black">
                  Büyük
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Malzeme / Seçenek Ekleyin</h4>
          <div className="flex gap-x-6 md:justify-start justify-center flex-wrap gap-y-4">
            {getActiveExtras().map((item) => (
              <label 
                className="flex flex-col items-center justify-center min-w-[110px] bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm hover:border-primary transition-all cursor-pointer select-none" 
                key={item.id}
              >
                <span className="text-sm font-bold text-gray-800 mb-1 text-center block whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 font-semibold mb-2 block min-h-[16px]">
                  {item.price > 0 ? `+${item.price} TL` : "Ücretsiz"}
                </span>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary cursor-pointer block mt-auto"
                  onChange={(e) => handleChange(e, item)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 md:text-start text-center">
          <button className="btn-primary px-8 py-3 rounded-full text-base font-bold shadow-md transition-all transform hover:scale-105" onClick={handleClick}>
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}