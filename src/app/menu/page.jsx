import React from "react";

import MenuWrapper from "../components/product/MenuWrapper";

export const dynamic = "force-dynamic";

async function getMenuData() {
 
  const baseUrl = "https://duria-menu.vercel.app";

  try {
   
    const [resCat, resProd] = await Promise.all([
      fetch(`${baseUrl}/api/categories`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/products`, { cache: 'no-store' })
    ]);

    if (!resCat.ok || !resProd.ok) throw new Error("API yanıt vermedi");

    return { 
      categoryList: await resCat.json(), 
      productList: await resProd.json() 
    };
  } catch (err) {
    console.error("HATA:", err);
    return { categoryList: [], productList: [] };
  }
}

export default async function Index() {
  const { categoryList, productList } = await getMenuData();

  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
}