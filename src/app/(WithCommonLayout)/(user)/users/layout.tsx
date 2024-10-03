"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../../../../components/UI/Sidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex w-full">
      <button
        onClick={toggleSidebar}
        className={`px-2 rounded-sm text-xl md:hidden fixed top-14 border bg-black text-white left-4 z-30`}
      >
        &#9776;
      </button>
      <div
        className={`fixed inset-0 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />
      <div
        className={`w-3/10 md:block ${isSidebarOpen ? "block" : "hidden"} z-20`}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>
      <div className={`flex-1 transition-all duration-300`}>{children}</div>
    </div>
  );
};

export default UserLayout;
