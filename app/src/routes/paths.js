function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/admin/auth";
const ROOTS_DASHBOARD = "/admin/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_PAGE = {
  landing: "/",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  profile: path(ROOTS_DASHBOARD, "/profile"),
  // skill
  skill: path(ROOTS_DASHBOARD, "/skill"),
  newSkill: path(ROOTS_DASHBOARD, "/new-skill"),
  skillDetail: (skillId) => path(ROOTS_DASHBOARD, `/skill/${skillId}`),
  // education
  education: path(ROOTS_DASHBOARD, "/education"),
  newEducation: path(ROOTS_DASHBOARD, "/new-education"),
  educationDetail: (educationId) =>
    path(ROOTS_DASHBOARD, `/education/${educationId}`),
  // project
  project: path(ROOTS_DASHBOARD, "/project"),
  newProject: path(ROOTS_DASHBOARD, "/new-project"),
  projectDetail: (projectId) => path(ROOTS_DASHBOARD, `/project/${projectId}`),
};
