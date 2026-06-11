"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Account from "../components/profile/Account";
import Order from "../components/profile/Order";
import Password from "../components/profile/Password";

const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      signOut({ redirect: false });
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">{session?.user?.name || "Kullanıcı"}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1">Hesap Ayarları</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Şifre Değiştir</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Siparişlerim</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Çıkış Yap</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account />}
      {tabs === 1 && <Password />}
      {tabs === 2 && <Order />}
    </div>
  );
};

export default Profile;