import { Outlet } from "react-router-dom";

import { MainFooter } from "./MainFooter";

export function MainLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>

      <MainFooter />
    </>
  );
}
