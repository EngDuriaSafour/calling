import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("E-posta adresi alanı zorunludur.")
    .email("Geçerli bir e-posta adresi giriniz."),
  password: Yup.string()
    .required("Şifre alanı zorunludur.")
    .min(8, "Şifre en az 8 karakterden oluşmalıdır.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifreniz en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ),
});