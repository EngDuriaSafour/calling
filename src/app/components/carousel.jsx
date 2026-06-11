"use client";
import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full relative -mt-[88px]"> 
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/images/hero4.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto h-full flex flex-col justify-center px-4 sm:px-0">
        <Slider {...settings}>
          <div>
            <div className="text-white flex flex-col items-start gap-y-10 pt-20">
              <Title addClass="text-6xl font-dancing italic tracking-wide">Aşkla Pişen Lezzetler</Title>
              <p className="text-sm sm:w-2/5 w-full">
                En taze malzemelerin sevgiyle buluştuğu mutfağımızdan, kalbinizi ısıtacak 
                en sıcak lezzetleri kapınıza getiriyoruz. Her ısırıkta ayrı bir mutluluk!
              </p>
              <button className="btn-primary">Şimdi Keşfet</button>
            </div>
          </div>
          <div>
            <div className="text-white flex flex-col items-start gap-y-10 pt-20">
              <Title addClass="text-6xl font-dancing italic tracking-wide">Çıtır Çıtır Mutluluklar</Title>
              <p className="text-sm sm:w-2/5 w-full">
                Günün her anını tatlandırmak için fırından yeni çıkmış sıcacık pizzalar 
                ve efsanevi çıtır menüler sizi bekliyor. Kendinizi şımartmaya ne dersiniz?
              </p>
              <button className="btn-primary">Sipariş Ver</button>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;