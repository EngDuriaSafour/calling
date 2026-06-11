import React from "react";
import MenuWrapper from "../components/product/MenuWrapper";


async function getMenuData() {

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://calling.vercel.app/api";

  try {
    const [resCat, resProd] = await Promise.all([
      fetch(`${baseUrl}/categories`, { cache: 'no-store' }),
      fetch(`${baseUrl}/Products`, { cache: 'no-store' })
    ]);

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