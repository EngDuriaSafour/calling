import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "../../../../../util/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      return NextResponse.json(
        { message: "Bu e-posta adresiyle zaten bir kullanıcı mevcut." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      ...body,
      password: hashedPassword,
    });

    if (newUser.confirmPassword) {
      newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);
    }

    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}