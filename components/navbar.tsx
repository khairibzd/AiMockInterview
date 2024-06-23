"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import Image from "next/image";

export const Navbar = () => {
  const path = usePathname();
  const { isSignedIn } = useAuth(); // or useUser if you need user details
  const config = siteConfig(isSignedIn);


  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      style={{
        background: "transparent", // Set background to transparent
        color: "white",
        // boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: "blur(5px)",
        // WebkitBackdropFilter: 'blur(5px)',
        // borderRadius: '10px',
        // border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src={"/totaltech.png"}
              width={40}
              height={20}
              alt="totaltech"
            />

            <p className="font-bold text-inherit ">MOCKINTERVIEW</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* <ul className="hidden lg:flex gap-4 justify-center items-center ml-2"> */}
        <NavbarContent
          className="hidden lg:flex gap-4 ml-2 basis-1/5 sm:basis-full"
          justify="center"
        >
          {config.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={`hover:text-[#088395] hover:font-bold transition-all
                    cursor-pointer
                    ${path == item.href && "text-[#37B7C3] font-bold"}
                    `}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          {/* </ul> */}
        </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={config.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={config.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <UserButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <UserButton />

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* <div className="mx-4 mt-2 flex flex-col gap-2 items-center"> */}
          {config.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === config.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        {/* </div> */}
      </NavbarMenu>
    </NextUINavbar>
  );
};
