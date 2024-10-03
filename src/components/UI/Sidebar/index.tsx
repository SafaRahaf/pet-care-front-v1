"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading....</div>;
  }

  return (
    <div className="shadow-lg h-screen relative">
      <button
        className="absolute top-2 right-4 text-4xl md:hidden"
        onClick={closeSidebar}
      >
        &times;
      </button>
      <div className="rounded-xl p-2 border-red-100 pt-5">
        <div className="flex items-center">
          <div className="h-[65px] w-[65px] p-2">
            <Image
              alt="profile"
              className="w-full h-full object-cover rounded-full"
              height={65}
              src={
                user?.profilePhoto
                  ? user?.profilePhoto
                  : "https://res.cloudinary.com/dvz9ssr9t/image/upload/v1726381843/Screenshot_2024-09-15_122918_xw0smh.png"
              }
              width={65}
            />
          </div>
          <div className="p-1">
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p className="break-words text-sm">{user?.email}</p>
          </div>
        </div>
        <Button
          as={Link}
          className="w-full rounded-md border-2 py-2 "
          href={"/users/create-post"}
        >
          Create a post
        </Button>
      </div>
      <div className="mt-2 space-y-1 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={user?.role === "admin" ? adminLinks : userLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
