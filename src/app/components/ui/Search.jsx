import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useRouter } from "next/navigation";
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();

  const menuStaticProducts = [
    {
      _id: "static-akdeniz",
      title: "Akdeniz Pizzası",
      img: "/images/f1.png",
      prices: [280],
      category: "pizza"
    },
    {
      _id: "static-classic",
      title: "Classic Burger",
      img: "/images/f2.png",
      prices: [240],
      category: "burger"
    },
    {
      _id: "static-karisik",
      title: "Karışık Sebzeli Pizza",
      img: "/images/f3.png",
      prices: [260],
      category: "pizza"
    },
    {
      _id: "static-icecek",
      title: "Lezzetli İçecek",
      img: "/images/f21.png",
      prices: [45],
      category: "icecek"
    },
    {
      _id: "static-dortmevsim",
      title: "Dört Mevsim Pizza",
      img: "/images/f19.png",
      prices: [270],
      category: "pizza"
    },
    {
      _id: "static-double",
      title: "Double Cheddar Burger",
      img: "/images/f20.png",
      prices: [210],
      category: "burger"
    },
    {
      _id: "static-margarita",
      title: "Margarita Pizza",
      img: "/images/f6.png",
      prices: [250],
      category: "pizza"
    },
    {
      _id: "static-barbeku",
      title: "Barbekü Soslu Burger",
      img: "/images/f8.png",
      prices: [230],
      category: "burger"
    },
    {
      _id: "static-meyvesuyu",
      title: "Taze Sıkılmış Meyve Suyu",
      img: "/images/f22.png",
      prices: [75],
      category: "icecek"
    }
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        
        const dbProducts = res.data || [];
        const combinedProducts = [...dbProducts];
        
        menuStaticProducts.forEach(staticProd => {
          const isAlreadyInDb = dbProducts.some(
            dbProd => dbProd.title.toLowerCase().trim() === staticProd.title.toLowerCase().trim()
          );
          if (!isAlreadyInDb) {
            combinedProducts.push(staticProd);
          }
        });

        setProducts(combinedProducts);
        setFiltered(combinedProducts.slice(0, 5));
      } catch (err) {
        console.log(err);
        setProducts(menuStaticProducts);
        setFiltered(menuStaticProducts.slice(0, 5));
      } finally {
        setIsDataLoaded(true);
      }
    };

    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Ara</Title>
            
            <input 
              type="text"
              placeholder="Ara..." 
              onChange={handleSearch} 
              className="w-full px-5 py-3 border border-gray-300 rounded-full my-5 outline-none focus:border-primary transition-all text-black"
            />

            {isDataLoaded ? (
              <ul className="mt-4">
                {filtered.length > 0 ? (
                  filtered.map((product) => (
                    <li
                      className="flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer"
                      key={product._id}
                      onClick={() => {
                        if (product._id.toString().startsWith("static-")) {
                          const staticSlug = product.title.toLowerCase().trim().replace(/ /g, "-");
                          router.push(`/product/${encodeURIComponent(staticSlug)}`);
                        } else {
                          router.push(`/product/${product?._id}`);
                        }
                        setIsSearchModal(false);
                      }}
                    >
                      <div className="relative flex">
                        <Image
                          src={product?.img}
                          alt={product?.title}
                          width={48}
                          height={48}
                        />
                      </div>
                      <span className="font-bold text-black">{product?.title}</span>
                      <span className="font-bold text-black">{product?.prices?.[0]} TL</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center font-semibold text-gray-500">Sonuç bulunamadı!</p>
                )}
              </ul>
            ) : (
              <div className="flex justify-center items-center mt-3">
                <PacmanLoader color="#fca311" />
              </div>
            )}
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsSearchModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;