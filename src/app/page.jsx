import axios from "axios";
import Home from "./home";

export default async function Index() {
  let categoryList = [];
  let productList = [];

  const currentOrigin = process.env.NEXT_PUBLIC_API_URL;

  if (!currentOrigin) {
    console.error("HATA: NEXT_PUBLIC_API_URL değişkeni tanımlı değil!");
  } else {
    try {
      
      const res = await axios.get(`${currentOrigin}/api/categories`);
      categoryList = res.data ? res.data : [];
    } catch (err) {
      console.error("Kategori hatası:", err.message);
    }

    try {
     
      const res = await axios.get(`${currentOrigin}/api/products`);
      productList = res.data ? res.data : [];
    } catch (err) {
      console.error("Ürün hatası:", err.message);
    }
  }

  return (
    <div>
      
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}