import Product from "../../../models/Product";
import dbConnect from "../../../../util/dbConnect";

// Tüm ürünleri getir
export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find();
    return Response.json(products, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Ürünler getirilemedi" }, { status: 500 });
  }
}

// Yeni ürün ekle
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return Response.json(newProduct, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Ürün eklenemedi" }, { status: 500 });
  }
}