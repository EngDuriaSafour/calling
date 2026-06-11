import * as Yup from "yup";

export const newPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Şifre alanı zorunludur.")
    .min(8, "Şifreniz en az 8 karakterden oluşmalıdır.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifreniz en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ),
  confirmPassword: Yup.string()
    .required("Şifre tekrarı alanı zorunludur.")
    .oneOf([Yup.ref("password"), null], "Şifreler birbiriyle eşleşmiyor."),
});