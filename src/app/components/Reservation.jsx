"use client";

import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import * as Yup from "yup";

const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Lütfen adınızı ve soyadınızı giriniz.")
    .min(3, "Ad soyad en az 3 karakter olmalıdır."),
  phoneNumber: Yup.string()
    .required("Lütfen telefon numaranızı giriniz.")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: Yup.string().required("Lütfen e-posta adresinizi giriniz.").email("Geçerli bir e-posta adresi yazınız."),
  persons: Yup.string().required("Lütfen kişi sayısını seçiniz."),
  date: Yup.string().required("Lütfen bir rezervasyon tarihi ve saati seçiniz."),
});

const Reservation = () => {
  // API ile haberleşen yeni onSubmit fonksiyonu
  const onSubmit = async (values, actions) => {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        alert("Rezervasyonunuz başarıyla alındı! Sizi bekliyor olacağız.");
        actions.resetForm();
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (err) {
      alert("Sunucuya ulaşılamadı.");
    }
  };

  // isSubmitting özelliğini de ekledik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        persons: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationSchema,
    });

  const inputs = [
    { id: 1, name: "fullName", type: "text", placeholder: "Adınız ve Soyadınız", value: values.fullName, errorMessage: errors.fullName, touched: touched.fullName },
    { id: 2, name: "phoneNumber", type: "text", placeholder: "Telefon Numaranız", value: values.phoneNumber, errorMessage: errors.phoneNumber, touched: touched.phoneNumber },
    { id: 3, name: "email", type: "email", placeholder: "E-posta Adresiniz", value: values.email, errorMessage: errors.email, touched: touched.email },
    { id: 4, name: "persons", type: "number", placeholder: "Kaç Kişilik?", value: values.persons, errorMessage: errors.persons, touched: touched.persons },
    { id: 5, name: "date", type: "datetime-local", value: values.date, errorMessage: errors.date, touched: touched.date },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <Title addClass="text-[45px] mb-10 text-center md:text-start font-dancing italic tracking-wide">
        Masa Rezervasyonu
      </Title>
      <div className="flex justify-between flex-wrap-reverse gap-10">
        <form className="lg:flex-1 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          {/* Butona basıldığında isSubmitting ile durumu yönettik */}
          <button 
            className="btn-primary mt-4 w-full md:w-auto" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : "ŞİMDİ REZERVE ET"}
          </button>
        </form>
        <div className="lg:flex-1 w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385397.58570954844!2d28.732013145458994!3d41.00532151608935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2s%C4%B0stanbul!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
            className="h-full w-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;