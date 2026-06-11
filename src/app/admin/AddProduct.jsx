import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../components/ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([0, 0, 0]);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState([]);

  // Ortam değişkenini güvenli bir şekilde al
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Kategori yüklenemedi:", err);
      }
    };
    getCategories();
  }, [baseUrl]);

  const handleExtra = () => {
    if (extra.text && extra.price) {
      setExtraOptions((prev) => [...prev, extra]);
      setExtra({ text: "", price: "" });
    }
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (onLoadEvent) => {
        setImageSrc(onLoadEvent.target.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = Number(e.target.value);
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    if (!file) {
      toast.error("Lütfen bir resim seçin!");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "duria-menu");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dj0kuqx3b/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        desc,
        category: category.toLowerCase().trim(),
        prices,
        extraOptions,
      };

      await axios.post(`${baseUrl}/api/products`, newProduct);

      setIsProductModal(false);
      toast.success("Ürün başarıyla eklendi!");
    } catch (err) {
      console.error(err);
      toast.error("Ürün eklenirken bir hata oluştu!");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center cursor-pointer">
                <input type="file" onChange={handleOnChange} className="hidden" />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <img src={imageSrc} alt="preview" className="w-12 h-12 rounded-full object-cover" />
                )}
              </label>
            </div>
            
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Title</span>
              <input type="text" className="border-2 p-1 text-sm px-1 outline-none" onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Description</span>
              <textarea className="border-2 p-1 text-sm px-1 outline-none" onChange={(e) => setDesc(e.target.value)} />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Category</span>
              <select className="border-2 p-1 text-sm px-1 outline-none" onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option value={cat.title.toLowerCase().trim()} key={cat._id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Prices</span>
              <div className="flex justify-between gap-6 w-full flex-wrap">
                <input type="number" className="border-b-2 p-1 text-sm outline-none w-20" placeholder="Small" onChange={(e) => changePrice(e, 0)} />
                <input type="number" className="border-b-2 p-1 text-sm outline-none w-20" placeholder="Medium" onChange={(e) => changePrice(e, 1)} />
                <input type="number" className="border-b-2 p-1 text-sm outline-none w-20" placeholder="Large" onChange={(e) => changePrice(e, 2)} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="btn-primary !bg-success" onClick={handleCreate}>Create</button>
            </div>

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