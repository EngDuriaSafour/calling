import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const cookieStore = await cookies();
      
      cookieStore.set("token", process.env.ADMIN_TOKEN, {
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      });

      return NextResponse.json({ message: "Başarılı" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Hatalı kullanıcı adı veya şifre!" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const cookieStore = await cookies();
    
    cookieStore.set("token", "", {
      maxAge: -1,
      path: "/",
    });

    return NextResponse.json({ message: "Başarılı" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}