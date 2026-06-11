import * as Yup from "yup";

export const profileSchema = Yup.object({
  fullName: Yup.string()
    .required("Lütfen adınızı ve soyadınızı giriniz.")
    .min(3, "Ad soyad en az 3 karakter olmalıdır."),
  phoneNumber: Yup.string()
    .required("Lütfen telefon numaranızı giriniz.")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: Yup.string()
    .required("Lütfen e-posta adresinizi giriniz.")
    .email("Geçerli bir e-posta adresi yazınız."),
  address: Yup.string()
    .required("Lütfen adresinizi giriniz."),
  job: Yup.string()
    .required("Lütfen mesleğinizi giriniz."),
  bio: Yup.string()
    .required("Lütfen hakkınızda kısa bir bilgi (Bio) giriniz."),
});