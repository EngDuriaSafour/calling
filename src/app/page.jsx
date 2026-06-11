import axios from "axios";
import Home from "./home";

export default async function Index() {
  let categoryList = [];
  let productList = [];

  // Vercel'deki Environment Variable en öncelikli olmalı
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://duria-menu.vercel.app/api";

  try {
    // API çağrılarını tek seferde ve hızlı yapmak için Promise.all kullanıyoruz
    const [catRes, prodRes] = await Promise.all([
      axios.get(`${baseUrl}/categories`),
      axios.get(`${baseUrl}/products`)
    ]);
    
    categoryList = catRes.data || [];
    productList = prodRes.data || [];
  } catch (err) {
    console.error("Veri çekme hatası:", err.message);
  }

  return (
    <div>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}