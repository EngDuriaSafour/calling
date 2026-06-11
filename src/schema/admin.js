import * as Yup from "yup";

export const adminSchema = Yup.object({
  username: Yup.string()
    .required("Kullanıcı adı zorunludur.")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  password: Yup.string()
    .required("Şifre zorunludur.")
    .min(5, "Şifre en az 5 karakter olmalıdır."),
});