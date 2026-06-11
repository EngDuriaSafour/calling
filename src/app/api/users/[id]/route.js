import { NextResponse } from "next/server";
import User from "../../../../models/User";
import dbConnect from "../../../../../util/dbConnect";
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const user = await User.findById(id);
    
    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
      if (body.confirmPassword) {
        body.confirmPassword = await bcrypt.hash(body.confirmPassword, 10);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Güncelleme sırasında bir hata oluştu." }, { status: 500 });
  }
}