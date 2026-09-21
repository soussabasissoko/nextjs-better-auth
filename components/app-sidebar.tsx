"use client";

import * as React from "react";
import {
  IconDashboard,
  IconUserCircle,
  IconSettings,
  IconHome,
  IconFlame,
  IconBook,
  IconBookmark,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Mon Profil",
      url: "/dashboard/account",
      icon: IconUserCircle,
    },
    {
      title: "Mes Carnets",
      url: "/dashboard",
      icon: IconBook,
    },
    {
      title: "Mes Favoris",
      url: "/dashboard",
      icon: IconBookmark,
    },
    {
      title: "Paramètres",
      url: "/dashboard/setting",
      icon: IconSettings,
    },
  ],
  navSecondary: [
    {
      title: "Accueil Dumuni",
      url: "/",
      icon: IconHome,
    },
  ],
};

interface AppSidebarUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: AppSidebarUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  if (!user) {
    throw new Error("AppSidebar requires a user but received undefined.");
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="flex items-center gap-2">
                <IconFlame className="!size-5 text-orange-600" />
                <span className="text-base font-extrabold tracking-tight text-orange-950 dark:text-orange-500">
                  Dumuni.
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
