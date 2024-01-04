import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../core/layout/main-layout";
import { DashboardLayout } from "../core/layout/dashboard-layout";

import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";

import { PATH_DASHBOARD, PATH_PAGE } from "./paths";
import { LogoLayout } from "../core/layout/logo-layout";
import { LoadingPage } from "../pages/LoadingPage";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * PAGES
 */
const LoginPage = Loadable(lazy(() => import("../pages/LoginPage")));
const RegisterPage = Loadable(lazy(() => import("../pages/RegisterPage")));
const UnknownPage = Loadable(lazy(() => import("../pages/UnknownPage")));
const LandingPage = Loadable(lazy(() => import("../pages/LandingPage")));
const DashboardPage = Loadable(lazy(() => import("../pages/DashboardPage")));
const ProfilePage = Loadable(lazy(() => import("../pages/ProfilePage")));
// SKILL
const SkillPage = Loadable(
  lazy(() => import("../pages/components/dashboard/skill/SkillPage"))
);
const SkillDetailPage = Loadable(
  lazy(() => import("../pages/components/dashboard/skill/SkillDetailPage"))
);
const NewSkillPage = Loadable(
  lazy(() => import("../pages/components/dashboard/skill/NewSkillPage"))
);
// Education
const EducationPage = Loadable(
  lazy(() => import("../pages/components/dashboard/education/EducationPage"))
);
const EducationDetailPage = Loadable(
  lazy(() =>
    import("../pages/components/dashboard/education/EducationDetailPage")
  )
);
const NewEducationPage = Loadable(
  lazy(() => import("../pages/components/dashboard/education/NewEducationPage"))
);
// Project

const ProjectPage = Loadable(
  lazy(() => import("../pages/components/dashboard/project/ProjectPage"))
);
const ProjectDetailPage = Loadable(
  lazy(() => import("../pages/components/dashboard/project/ProjectDetailPage"))
);
const NewProjectPage = Loadable(
  lazy(() => import("../pages/components/dashboard/project/NewProjectPage"))
);

function Router() {
  return useRoutes([
    /**
     * AUTH
     */
    {
      path: "admin/auth",
      element: <LogoLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        // { path: "reset-password", element: <ResetPasswordPage /> },
        // { path: "verify", element: <VerifyPage /> },
      ],
    },

    /**
     * MAIN
     */
    {
      path: "*",
      element: <LogoLayout />,
      children: [
        { path: "404", element: <UnknownPage /> },
        { path: "*", element: <Navigate to={PATH_PAGE.page404} replace /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [{ path: "/", element: <LandingPage /> }],
    },
    { path: "*", element: <Navigate to={PATH_PAGE.page404} replace /> },

    /**
     * DASHBOARD
     */
    {
      path: "admin/dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: PATH_DASHBOARD.root, element: <DashboardPage /> },
        { path: PATH_DASHBOARD.profile, element: <ProfilePage /> },
        //Skill
        { path: PATH_DASHBOARD.skill, element: <SkillPage /> },
        {
          path: PATH_DASHBOARD.skillDetail(":skillId"), // Dynamic route with parameter
          element: <SkillDetailPage />,
        },
        { path: PATH_DASHBOARD.newSkill, element: <NewSkillPage /> },
        // Education
        { path: PATH_DASHBOARD.education, element: <EducationPage /> },
        {
          path: PATH_DASHBOARD.educationDetail(":educationId"), // Dynamic route with parameter
          element: <EducationDetailPage />,
        },
        { path: PATH_DASHBOARD.newEducation, element: <NewEducationPage /> },
        // project
        { path: PATH_DASHBOARD.project, element: <ProjectPage /> },
        {
          path: PATH_DASHBOARD.projectDetail(":projectId"), // Dynamic route with parameter
          element: <ProjectDetailPage />,
        },
        { path: PATH_DASHBOARD.newProject, element: <NewProjectPage /> },
      ],
    },
  ]);
}

export default Router;
