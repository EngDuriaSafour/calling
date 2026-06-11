"use client";

import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setDiscount } from "../../../redux/cartSlice";
import { toast } from "react-toastify";

const Campaigns = () => {
  const dispatch = useDispatch();

  const handleCampaignClick = (rate, label) => {
    dispatch(setDiscount(rate));
    toast.success(`${label} kampanyası uygulandı!`);
  };

  return (
    <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
      <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
        <div className="relative md:w-44 md:h-44 w-36 h-36 border-[5px] border-primary rounded-full overflow-hidden">
          <Image
            src="/images/o1.jpg"
            alt="Lezzetli Perşembe"
            fill
            className="hover:scale-105 transition-all object-cover"
          />
        </div>
        <div className="text-white">
          <Title addClass="text-2xl">Lezzetli Perşembe</Title>
          <div className="font-dancing my-1">
            <span className="text-[40px]">%20</span>
            <span className="text-sm inline-block ml-1">İndirim</span>
          </div>
          <button 
            className="btn-primary flex items-center gap-x-2"
            onClick={() => handleCampaignClick(20, "Lezzetli Perşembe")}
          >
            Sipariş Ver <MdShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
        <div className="relative md:w-44 md:h-44 w-36 h-36 border-[5px] border-primary rounded-full overflow-hidden">
          <Image
            src="/images/f19.png"
            alt="Pizza Günleri"
            fill
            className="hover:scale-105 transition-all object-cover"
            priority
          />
        </div>
        <div className="text-white">
          <Title addClass="text-2xl">Pizza Günleri</Title>
          <div className="font-dancing my-1">
            <span className="text-[40px]">%30</span>
            <span className="text-sm inline-block ml-1">İndirim</span>
          </div>
          <button 
            className="btn-primary flex items-center gap-x-2"
            onClick={() => handleCampaignClick(30, "Pizza Günleri")}
          >
            Sipariş Ver <MdShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;