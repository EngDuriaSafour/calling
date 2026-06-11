import axios from "axios";
import Home from "./home";

export default async function Index() {
  let categoryList = [];
  let productList = [];

  const currentOrigin = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  try {
    const res = await axios.get(`${currentOrigin}/categories`);
    categoryList = res.data ? res.data : [];
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await axios.get(`${currentOrigin}/products`);
    productList = res.data ? res.data : [];
  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}