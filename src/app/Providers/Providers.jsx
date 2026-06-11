"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import store from "../../../redux/store";

export default function Providers({ children, session }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // App Router için NProgress (Sayfa yükleme çubuğu)
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastContainer />
        {children}
      </Provider>
    </SessionProvider>
  );
}