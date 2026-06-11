import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px] flex justify-center w-[300px] h-[450px]">
            <Image 
              src="/images/about-img.png" 
              alt="" 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <Title addClass="text-[40px]">Biz kimiz?</Title>
          <p className="my-5 flex flex-col items-center">
            Restoranımız, en taze malzemeleri uzman şeflerin dokunuşlarıyla buluşturarak 
            sizlere unutulmaz bir lezzet deneyimi sunuyor. Kurulduğumuz günden bu yana, 
            kaliteden ödün vermeden, her damak tadına hitap eden geniş menümüzle lezzet 
            tutkunlarının vazgeçilmez adresi olmaya devam ediyoruz. Hijyenik mutfağımız ve 
            güler yüzlü hizmet anlayışımızla, her siparişte aynı özeni teslim ediyoruz.
          </p>
          <button className="btn-primary">Daha Fazlası</button>
        </div>
      </div>
    </div>
  );
};

export default About;