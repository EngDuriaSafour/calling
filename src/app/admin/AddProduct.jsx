import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../components/ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([]);

  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const handleExtra = (e) => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prev) => [...prev, extra]);
      }
    }
  };

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/bilgisayar-genetigi/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions,
      };

      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, newProduct);

      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Product created successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product creation failed!");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input type="file" onChange={handleOnChange} className="hidden" />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">Choose an Image</button>
                {imageSrc && (
                  <img src={imageSrc} alt="" className="w-12 h-12 rounded-full" />
                )}
              </label>
            </div>
            
           
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Title</span>
              <input type="text" className="border-2 p-1 text-sm px-1 outline-none" onChange={(e) => setTitle(e.target.value)} />
            </div>

          

            <button className="btn-primary !bg-success" onClick={handleCreate}>Create</button>
            <button className="absolute top-4 right-4" onClick={() => setIsProductModal(false)}>
              <GiCancel size={25} />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;