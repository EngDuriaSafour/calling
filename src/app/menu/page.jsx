import React from "react";
import MenuWrapper from "@/components/product/MenuWrapper";

// 1. Veriyi çekmek için bu async fonksiyonu kullanıyoruz (Server Component)
async function getMenuData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://duria-menu.vercel.app";

 
  const [resCat, resProd] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
  ]);

  const categoryList = await resCat.json();
  const productList = await resProd.json();

  return { categoryList, productList };
}


const Index = async () => {
  const { categoryList, productList } = await getMenuData();

  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export default Index;