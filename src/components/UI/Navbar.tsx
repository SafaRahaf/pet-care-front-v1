"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "../../config/site";
import { ThemeSwitch } from "./theme-switch";
import Logo from "../logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //@ts-ignore
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    setMounted(true);

    const getUserRole = () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        try {
          const user = JSON.parse(atob(token.split(".")[1]));
          return user.role;
        } catch (error) {
          console.error("Failed to decode token", error);
        }
      }
      return null;
    };

    const userRole = getUserRole();
    const items = siteConfig.navItems(userRole);
    setNavItems(items);
  }, [token]);

  if (!mounted) return null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setNavItems([]);
    router.push("/");
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="py-5 z-50 w-full">
      <NavbarContent className="sm:basis-full">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-between items-center gap-3"
            href="/"
          >
            <Image
              src={Logo}
              alt="Logo"
              width={26}
              height={26}
              className="rounded-full"
            />
            <p className="font-bold text-inherit">Pet Care</p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden md:flex gap-4 ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium flex"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full justify-end">
        {token ? (
          <>
            {user?.role === "admin" ? (
              <Link href="/admin">Admin</Link>
            ) : (
              <Link href="/users">User</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1" justify="end">
        <ThemeSwitch />
        <button onClick={toggleMenu}>
          <FaBars className="text-lg" />
        </button>
      </NavbarContent>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-40 backdrop-blur-sm bg-black bg-opacity-60">
          <div className="mx-4 mt-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  className="text-md border px-3 text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            {token ? (
              <>
                <div>
                  {user?.role === "admin" ? (
                    <Link
                      className="text-md border px-3 text-white"
                      href="/admin"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      className="text-md border px-3 text-white"
                      href="/users"
                    >
                      User
                    </Link>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-md border px-3 text-white"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link className="text-md border px-3 text-white" href="/login">
                  Login
                </Link>
                <Link
                  className="text-md border px-3 text-white"
                  href="/register"
                >
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="self-start px-3 bg-red-600 text-white border"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </NextUINavbar>
  );
};
