import Home from "./home";
import dbConnect from "../../util/dbConnectt"; 
import Category from "../models/Category"; // Modelin
import Product from "../models/Product";
export default async function Index() {
  let categoryList = [];
  let productList = [];

  try {
    
    await dbConnect();
    
    const categories = await Category.find({});
    const products = await Product.find({});
    
    categoryList = categories || [];
    productList = products || [];
  } catch (err) {
    console.error("Veri çekme hatası:", err.message);
  }

  return (
    <div>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}