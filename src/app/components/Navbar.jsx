"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = usePathname();
  const { user, logout } = useAuth();
  console.log(user);

  const navItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/rooms",
      title: "Rooms",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">
            Cozy<span className="text-green-500">Find</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              aria-current="page"
              className={`text-lg font-medium ${
                pathName === item.href ? "text-green-500" : "text-gray-900"
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {user?.id && (
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
            )}

            {user?.id && (
              <DropdownItem key="user">
                <Link href="/dashboard/user" className="text-gray-900">
                  User Dashboard
                </Link>
              </DropdownItem>
            )}

            {user?.role === "admin" && (
              <DropdownItem key="admin">
                <Link href="/dashboard/admin" className="text-gray-900">
                  Admin Dashboard
                </Link>
              </DropdownItem>
            )}
            {user?.id && (
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => logout()}
              >
                Log Out
              </DropdownItem>
            )}
            {!user && (
              <DropdownItem key="login" color="danger">
                <Link href="/login">Log in</Link>
              </DropdownItem>
            )}
            {!user && (
              <DropdownItem key="register" color="danger">
                <Link href="/register">Register</Link>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={`${item.title}`}>
            <Link
              color={pathName === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
