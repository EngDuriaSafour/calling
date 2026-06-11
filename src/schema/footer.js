import * as Yup from "yup";

export const footerSchema = Yup.object({
  location: Yup.string().required("Konum alanı zorunludur."),
  phoneNumber: Yup.string()
    .required("Telefon numarası zorunludur.")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: Yup.string().required("E-posta alanı zorunludur.").email("Geçersiz e-posta adresi."),
  desc: Yup.string().required("Açıklama alanı zorunludur."),
  day: Yup.string().required("Gün alanı zorunludur."),
  time: Yup.string().required("Saat alanı zorunludur."),
});