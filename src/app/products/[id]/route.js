import Product from "../../../models/Product";
import dbConnect from "../../../../util/dbConnect";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const product = await Product.findById(id);
    return Response.json(product, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Hata" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    await Product.findByIdAndDelete(id);
    return Response.json({ message: "Silindi" }, { status: 200 });
  } catch (err) {
    
    return Response.json({ message: "Hata" }, { status: 500 });
  }
}