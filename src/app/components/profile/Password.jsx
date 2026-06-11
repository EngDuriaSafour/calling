"use client";

import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { registerSchema } from "../../../schema/register";
import { newPasswordSchema } from "../../../schema/newpassword";
import axios from "axios";
import { toast } from "react-toastify";

const Password = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        actions.resetForm();
        toast.success("Şifreniz başarıyla güncellendi!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Şifre güncellenirken bir hata oluştu!");
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Yeni Şifreniz",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Yeni Şifre Tekrarı",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[45px] font-dancing italic tracking-wide">Şifre Değiştir</Title>
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
      <button className="btn-primary mt-4" type="submit">
        Güncelle
      </button>
    </form>
  );
};

export default Password;