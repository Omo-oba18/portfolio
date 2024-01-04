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
  description: Yup.string().max(2000),
  proficiency: Yup.string(),
});

export const EducationSchema = Yup.object().shape({
  degree: Yup.string(),
  institution: Yup.string(),
  graduationYear: Yup.date()
    .min(
      new Date().getFullYear() - 20,
      "Year must be within the past twenty years"
    )
    .max(
      new Date().getFullYear() + 3,
      "Year must be within the next three years"
    )
    .required("Date is required"),
});

export const ProjectSchema = Yup.object().shape({
  title: Yup.string().required("Project Name is required"),
  description: Yup.string().max(2000),
  githubLink: Yup.string(),
});
