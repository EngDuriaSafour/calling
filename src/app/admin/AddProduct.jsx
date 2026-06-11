"use client";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../components/ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("pizza");
  const [prices, setPrices] = useState([0, 0, 0]);

  const handleOnChange = (e) => setFile(e.target.files[0]);

  const handleCreate = async () => {
    if (!file) return toast.error("Lütfen bir resim seçin!");
    if (!title || !desc) return toast.error("Tüm alanları doldurun!");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      // 1. Cloudinary'ye resmi yükle
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/bilgisayar-genetigi/image/upload",
        data
      );

      // 2. Ürün nesnesini hazırla
      const newProduct = {
        img: uploadRes.data.url,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions: [],
      };

      // 3. Veritabanına kaydet (Doğrudan /api/products kullanıyoruz)
      await axios.post("/api/products", newProduct);
      
      toast.success("Ürün başarıyla eklendi!");
      setIsProductModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Ürün eklenirken bir hata oluştu!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-black/60">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="relative w-[400px] bg-white border p-10 rounded-3xl">
          <Title addClass="text-center text-2xl">Yeni Ürün Ekle</Title>
          
          <div className="flex flex-col gap-y-3 mt-4">
            <input type="file" onChange={handleOnChange} />
            <input 
              type="text" 
              placeholder="Ürün Başlığı" 
              className="border p-2 w-full" 
              onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
              placeholder="Ürün Açıklaması" 
              className="border p-2 w-full" 
              onChange={(e) => setDesc(e.target.value)} 
            />
          </div>

          <button 
            className="bg-green-600 text-white w-full mt-6 p-2 rounded-lg font-bold" 
            onClick={handleCreate}
          >
            Kaydet
          </button>

          <button 
            className="absolute top-4 right-4 text-red-500" 
            onClick={() => setIsProductModal(false)}
          >
            <GiCancel size={25} />
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;