"use client";

import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { loginSchema } from "../../../schema/login";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!res.error) {
        actions.resetForm();
        toast.success("Giriş başarılı!");
        
        // Giriş yapıldığı an veritabanından güncel ID'yi çekip yönlendiriyoruz
        try {
          const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const loggedInUser = userRes.data?.find((user) => user.email === values.email);
          if (loggedInUser) {
            router.push("/profile/" + loggedInUser._id);
            return;
          }
        } catch (apiErr) {
          console.log(apiErr);
        }

        router.refresh(); 
      } else {
        toast.error("E-posta veya şifre hatalı!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const currentUser = res.data?.find((user) => user.email === session.user.email);
          if (currentUser) {
            router.push("/profile/" + currentUser._id);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    handleRedirect();
  }, [session, status, router]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "E-posta Adresiniz",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Şifreniz",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6">Giriş Yap</Title>
        <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button className="btn-primary" type="submit">
            GİRİŞ YAP
          </button>
          
          {/* Hocanın kodundaki GitHub butonu senin tasarımına uyarlandı */}
          <button
            className="btn-primary !bg-secondary"
            type="button"
            onClick={() => signIn("github")}
          >
            <i className="fa fa-github mr-2 text-lg"></i>
            GITHUB
          </button>

          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Hesabınız yok mu?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;