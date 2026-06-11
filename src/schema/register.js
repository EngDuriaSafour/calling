import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .required("Lütfen adınızı ve soyadınızı giriniz.")
    .min(3, "Ad soyad en az 3 karakter olmalıdır."),
  email: Yup.string()
    .required("Lütfen e-posta adresinizi giriniz.")
    .email("Geçerli bir e-posta adresi yazınız."),
  password: Yup.string()
    .required("Şifre alanı zorunludur.")
    .min(8, "Şifre en az 8 karakterden oluşmalıdır.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifreniz en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ),
  confirmPassword: Yup.string()
    .required("Şifre tekrarı alanı zorunludur.")
    .oneOf([Yup.ref("password"), null], "Şifreler birbiriyle eşleşmiyor."),
});