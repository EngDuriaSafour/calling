import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";

const MenuItem = ({ product }) => {
  const productIdentifier = product?._id || product?.title?.toLowerCase().trim().replace(/ /g, "-");

  return (
    <div className="bg-secondary rounded-3xl">
      <Link href={`/product/${productIdentifier}`}>
        <div className="w-full bg-[#f1f2f3] h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl cursor-pointer">
          <div className="relative w-44 h-44 hover:scale-110 transition-all">
            <Image 
              src={product?.img || product?.imageSrc || "/images/f1.png"} 
              alt={product?.title || "Product"} 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Link>
      <div className="p-[25px] text-white">
        <h4 className="text-2xl font-semibold font-dancing italic">{product?.title}</h4>
        <p className="text-[15px]">
          {product?.desc || product?.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span>{product?.prices?.[0] || product?.price || "0"} TL</span>
          <button className="btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center">
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;