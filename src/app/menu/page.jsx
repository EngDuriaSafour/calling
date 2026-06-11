import axios from "axios";
import React from "react";
import MenuWrapper from "../components/product/MenuWrapper";

const Index = async () => {
  let categoryList = [];
  let productList = []; 

  const currentOrigin = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  try {
    const res = await axios.get(`${currentOrigin}/categories`);
    categoryList = res.data ? res.data : [];
  } catch (err) {
    console.log("Kategoriler çekilirken hata:", err);
  }
  try {
    const res = await axios.get(`${currentOrigin}/Products`);
    productList = res.data ? res.data : [];
  } catch (err) {
    console.log("Ürünler çekilirken hata:", err);
  }

  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export default Index;