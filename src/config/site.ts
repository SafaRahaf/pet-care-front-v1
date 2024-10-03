import { useSelector } from "react-redux";

// const user = useSelector((state) => state?.auth?.user);

export const siteConfig = {
  name: "Pet Care",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: (userRole) => {
    const items = [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Posts",
        href: "/posts",
      },
    ];

    // if (userRole === "admin") {
    //   items.push(
    //     {
    //       label: "Admin Dashboard",
    //       href: "/admin",
    //     },
    //     {
    //       label: "User Management",
    //       href: "/admin/users",
    //     }
    //   );
    // } else if (userRole === "user") {
    //   items.push(
    //     {
    //       label: "Follow",
    //       href: "/users/follow-posts",
    //     },
    //     {
    //       label: "Add Post",
    //       href: "/users/create-post",
    //     }
    //   );
    // }

    return items;
  },
};
