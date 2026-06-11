"use client";

import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        if (res.data && res.data.length > 0) {
          setFooterData(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6 px-4">
        <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-10">
          
          {/* İletişim Bölümü */}
          <div className="md:flex-1">
            <Title addClass="text-[30px] font-dancing">İletişim</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <a 
                  href={footerData?.location ? `https://maps.google.com/?q=${encodeURIComponent(footerData.location)}` : "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-primary transition-all"
                >
                  <i className="fa fa-map-marker"></i>
                  <span className="inline-block ml-2">{footerData?.location || "İstanbul, Türkiye"}</span>
                </a>
              </div>
              <div>
                <a href={footerData?.phoneNumber ? `tel:${footerData.phoneNumber}` : "#"} className="hover:text-primary transition-all">
                  <i className="fa fa-phone"></i>
                  <span className="inline-block ml-2">
                    {footerData?.phoneNumber ? `Telefon: ${footerData.phoneNumber}` : "Telefon: +90 555 123 45 67"}
                  </span>
                </a>
              </div>
              <div>
                <a href={footerData?.email ? `mailto:${footerData.email}` : "#"} className="hover:text-primary transition-all">
                  <i className="fa fa-envelope"></i>
                  <span className="inline-block ml-2">{footerData?.email || "destek@myfood.com"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Orta Logo ve Tanım Bölümü */}
          <div className="md:flex-1">
            <Title addClass="text-[38px] font-dancing">MyFood</Title>
            <p className="mt-3 px-4">
              {footerData?.desc || "En taze malzemelerle hazırlanan eşsiz lezzetleri, en hızlı şekilde kapınıza getiriyoruz. Güvenilir ve kaliteli hizmetin adresi."}
            </p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
              {footerData?.socialMedia && footerData.socialMedia.length > 0 ? (
                footerData.socialMedia.map((item) => (
                  <a
                    href={item?.link || "#"}
                    key={item._id}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    <i className={`fa ${item.icon}`}></i>
                  </a>
                ))
              ) : (
                <>
                  <a href="#" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"><i className="fa fa-facebook"></i></a>
                  <a href="#" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"><i className="fa fa-twitter"></i></a>
                  <a href="#" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"><i className="fa fa-linkedin"></i></a>
                  <a href="#" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"><i className="fa fa-instagram"></i></a>
                  <a href="#" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all"><i className="fa fa-pinterest"></i></a>
                </>
              )}
            </div>
          </div>

          {/* Çalışma Saatleri Bölümü */}
          <div className="md:flex-1">
            <Title addClass="text-[30px] font-dancing">Çalışma Saatleri</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">
                  {footerData?.openingHours?.day || "Her Gün"}
                </span>
              </div>
              <div>
                <span className="inline-block ml-2">
                  {footerData?.openingHours?.hour || "10.00 - 22.00"}
                </span>
              </div>
            </div>
          </div>

        </div>
        <p className="text-center mt-10 opacity-70">
          © {new Date().getFullYear()} Duria safour mezuniyet.Projesidir
        </p>
      </div>
    </div>
  );
};

export default Footer;