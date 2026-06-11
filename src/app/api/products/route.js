import Product from "../../../models/Product";
import dbConnect from "../../../../util/dbConnect";

export async function GET() {
  await dbConnect();
  const products = await Product.find();
  return Response.json(products, { status: 200 });
}

export async function POST(req) {
  console.log("API rotasına istek ulaştı!");
  await dbConnect();
  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return Response.json(newProduct, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Hata" }, { status: 500 });
  }
}