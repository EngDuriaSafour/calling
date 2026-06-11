"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import store from "../../../redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";

function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <ToastContainer />
        {children}
      </Provider>
    </SessionProvider>
  );
}