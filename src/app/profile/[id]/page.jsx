"use client";

import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // App Router için next/router yerine next/navigation kullanılır

import { useEffect, useState, use } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";

const Profile = ({ params }) => {
  const { id } = use(params); // URL'deki [id] parametresini güvenli şekilde alıyoruz
  const { data: session } = useSession();
  const [tabs, setTabs] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  // Hocanın getServerSideProps ile sunucuda yaptığını, App Router'da burada yapıyoruz
  useEffect(() => {
    const fetchUser = async () => {
      if (!id || id === "undefined" || id === "null") return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return null; // Veri yüklenirken boş sayfa göstererek çökmesini engelliyoruz
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_433px)] gap-4">
        <p className="text-xl font-semibold text-secondary">Kullanıcı profili bulunamadı.</p>
        <button onClick={() => router.push("/auth/login")} className="btn-primary">
          Giriş Sayfasına Dön
        </button>
      </div>
    );
  }

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src={user.image ? user.image : "/images/admin.png"}
            alt=""
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <b className="text-2xl mt-1">{user.fullName}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Heasp Bilgileri</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Şifre</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Siparişler</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Çıkış Yap</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account user={user} />}
      {tabs === 1 && <Password user={user} />}
      {tabs === 2 && <Order />}
    </div>
  );
};

export default Profile;