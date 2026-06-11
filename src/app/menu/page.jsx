import React from "react";
import MenuWrapper from "../components/product/MenuWrapper";


export const dynamic = "force-dynamic";

async function getMenuData() {
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://duria-menu.vercel.app";

  try {
    
    const [resCat, resProd] = await Promise.all([
      fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/products`, { cache: 'no-store' }) 
    ]);

    if (!resCat.ok || !resProd.ok) {
      throw new Error("API yanıt vermedi");
    }

    const categoryList = await resCat.json();
    const productList = await resProd.json();

    return { categoryList, productList };
  } catch (err) {
    console.error("Veri çekme hatası:", err);
    return { categoryList: [], productList: [] };
  }
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