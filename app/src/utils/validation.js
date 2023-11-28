import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone is required"),
  name: Yup.string().required("Name is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
});

export const SkillSchema = Yup.object().shape({
  name: Yup.string().required("Skill Name is required"),
  key: Yup.string()
    .min(3)
    .max(5)
    .required("Key should be between 3 to 5 chars"),
  // proficiency: Yup.array().of(Yup.string()).required("Skill proficiency is required"),
  description: Yup.string().max(2000),
  proficiency: Yup.string(),
});

export const EducationSchema = Yup.object().shape({
  degree: Yup.string(),
  institution: Yup.string(),
  graduationYear: Yup.date()
    .min(new Date().getFullYear(-1))
    .max(new Date().getFullYear() + 1)
    .required("Date is required"),
});
