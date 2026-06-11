"use client";

import React, { useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";

const Account = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values, actions) => {
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Profil bilgileriniz başarıyla güncellendi!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Profil güncellenirken bir hata oluştu!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        address: user?.address || "",
        job: user?.job || "",
        bio: user?.bio || "",
      },
      onSubmit,
      validationSchema: profileSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Adınız ve Soyadınız",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Telefon Numaranız",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "E-posta Adresiniz",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Adresiniz",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Mesleğiniz",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Hakkınızda kısa bir bilgi (Bio)",
      value: values.bio,
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[45px] font-dancing italic tracking-wide">Hesap Ayarları</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button 
        type="submit" 
        className="btn-primary mt-4" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Güncelleniyor..." : "Güncelle"}
      </button>
    </form>
  );
};

export default Account;