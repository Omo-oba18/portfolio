import { Outlet } from "react-router-dom";

import { DashboardNavbar } from "./DashboardNavbar";
// import { DashboardFooter } from './DashboardFooter';

export function DashboardLayout() {
  return (
    <>
      <DashboardNavbar />

      <Outlet />

      {/* <DashboardFooter /> */}
    </>
  );
}
