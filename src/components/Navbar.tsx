"use client"

import React, { useCallback, useEffect, useState } from "react";
import { Icons } from "./Icons";
import { useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Route {
  path: string;
  title?: string;
  icon?: any;
}

export const route: Route[] = [
  {
    path: "/",
    title: "Home",
    icon: (color: string) => <Icons.navigator.feed color={color} />,
  },
  {
    path: "/tasks",
    title: "Tracking",
    icon: (color: string) => <Icons.navigator.tasks color={color} />,
  },
  {
    path: "/friends",
    title: "Signals",
    icon: (color: string) => <Icons.navigator.friends color={color} />,
  },
  {
    path: "/profile",
    title: "Profile",
    icon: (color: string) => <Icons.navigator.profile color={color} />,
  },
  {
    path: "/guilds",
    title: "Dashboard",
    icon: (color: string) => (
      <div className="flex flex-col items-center mt-3">
        <Icons.navigator.guilds color={color} />
        <Badge
          variant="secondary"
          className="h-4 bg-[#78797E] text-[10px] text-white -mt-1"
        >
          Soon
        </Badge>
      </div>
    ),
  },
];

export const Navbar = () => {
  const [active, setActive] = useState(-1);

  const router = useRouter();
  const pathname = usePathname();

  const updateActiveState = useCallback(() => {
    switch (pathname) {
      case "/":
        setActive(0);
        break;
      case "/tasks":
        setActive(1);
        break;
      case "/friends":
        setActive(2);
        break;
      case "/profile":
        setActive(3);
        break;
      case "/guilds":
        setActive(4);
        break;
      default:
        setActive(-1);
    }
  }, [pathname]);

  useEffect(() => {
    updateActiveState();
  }, [pathname, updateActiveState]);

  return (
    <div className="fixed bottom-0 w-full mx-auto h-[80px] flex justify-between px-2 gap-2 z-10 bg-[#181818]">
      {route.map((item, index) => {
        const isDisabled = index === route.length - 1;

        return (
          <div
            key={index}
            onClick={() => {
              if (!isDisabled) {
                router.push(item.path);
              }
            }}
            className={`flex flex-col flex-1 justify-center items-center p-2 gap-2 rounded-xl cursor-pointer transition-all duration-200 ease-linear ${
              active === index ? "text-[#6174EC]" : "bg-transparent text-white"
            } `}
          >
            <div
              className={`w-full rounded-full h-[30px] flex justify-center items-center ${
                active === index ? "bg-[#2990FF26]" : "bg-transparent"
              } ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
            >
              {item.icon(active === index ? "#6174EC" : "#78797E")}
            </div>
            <span className="text-xs">{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};
