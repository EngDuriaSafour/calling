"use client";
import React, { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  // 1. Statik ürün listesi (Gelecekte veritabanından veri akarsa bu yapı korunabilir)
  const allProducts = [
    {
      title: "Akdeniz Pizzası",
      description: "Özel sos, taze fesleğen, siyah zeytin, mantar ve eriyen nefis kaşar peyniriyle Akdeniz esintisi.",
      price: "280",
      imageSrc: "/images/f1.png",
      category: "pizza"
    },
    {
      title: "Classic Burger",
      description: "Özel burger köftesi, eriyen cheddar peyniri, taze marul, domates ve nefis ev yapımı sos.",
      price: "240",
      imageSrc: "/images/f2.png",
      category: "burger"
    },
    {
      title: "Karışık Sebzeli Pizza",
      description: "Mısır, biber, zeytin ve özel baharatlarla harmanlanmış, hafif ve lezzetli sebzeli alternatif.",
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
      description: "Her diliminde farklı bir lezzet; sucuk, mantar, mısır og ve zeytinin mükemmel kombinasyonu.",
      price: "270",
      imageSrc: "/images/f19.png",
      category: "pizza"
    },
    {
      title: "Double Cheddar Burger",
      description: "Kat kat lezzet! Çift burger köftesi, bol cheddar peyniri ve çıtır turşunun enfes uyumu.",
      price: "210",
      imageSrc: "/images/f20.png",
      category: "burger"
    },
    {
      title: "Margarita Pizza",
      description: "İtalyan klasiği; bolca eritilmiş mozzarella peyniri, dilimlenmiş taze domates ve fesleğen.",
      price: "250",
      imageSrc: "/images/f6.png",
      category: "pizza"
    },
    {
      title: "Barbekü Soslu Burger",
      description: "Köz kokulu nefis barbekü sosu, çıtır soğan halkaları ve sulu burger köftesiyle karamelize lezzet.",
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

  // 2. Aktif kategoriye göre filtreleme alanı
  const filteredProducts = activeCategory
    ? allProducts.filter(product => {
        const prodCat = product?.category?.toLowerCase().trim() || "";
        if (activeCategory.includes("pizza")) return prodCat === "pizza";
        if (activeCategory.includes("burger") || activeCategory.includes("hamburger")) return prodCat === "burger";
        if (activeCategory.includes("i̇çecek") || activeCategory.includes("icecek")) return prodCat === "icecek";
        return false;
      })
    : allProducts;

  return (
    <div className="container mx-auto mb-16 px-4">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-[40px]">Menümüz</Title>
        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          {/* Tümü Butonu */}
          <button
            className={`px-6 py-2 rounded-3xl transition-all ${
              activeCategory === null ? "bg-secondary text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveCategory(null)}
          >
            Tümü
          </button>

          {/* Dinamik Kategoriler */}
          {categoryList &&
            categoryList.map((category) => {
              const cleanTitle = category.title?.toLowerCase().trim() || "";
              return (
                <button
                  className={`px-6 py-2 rounded-3xl transition-all ${
                    activeCategory === cleanTitle ? "bg-secondary text-white" : "bg-gray-100 text-gray-700"
                  }`}
                  key={category._id}
                  onClick={() => setActiveCategory(cleanTitle)}
                >
                  {category.title}
                </button>
              );
            })}
        </div>
      </div>
      
      {/* Ürün Listesi Yapısı */}
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {filteredProducts.map((product, index) => (
          <MenuItem 
            key={product._id || index} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default MenuWrapper;