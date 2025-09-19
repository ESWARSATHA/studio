
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  PlusCircle,
  BarChart2,
  Settings,
  User,
  LogOut,
  Globe,
  LifeBuoy,
  Megaphone,
  ShieldCheck,
  Users,
  Radio,
  Bell,
  Lightbulb,
  GraduationCap,
  ShoppingCart,
  MoreVertical,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { languages, useLanguage } from "@/lib/locales/language-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import placeholderImages from '@/lib/placeholder-images.json';
import { BottomNavBar } from "@/components/BottomNavBar";
import type { DashboardHeaderProps } from "@/components/DashboardHeader";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";

const { userAvatar } = placeholderImages.misc;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'artisan';
  const { language, setLanguage, translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');


  const artisanMenuItems = [
    { href: "/dashboard", label: translations.dashboard_layout.menu_dashboard, icon: LayoutGrid },
    { href: "/dashboard/products/new", label: translations.dashboard_layout.menu_add_product, icon: PlusCircle },
    { href: "/dashboard/analytics", label: translations.dashboard_layout.menu_analytics, icon: BarChart2 },
    { href: "/dashboard/marketing", label: translations.dashboard_layout.menu_marketing, icon: Megaphone },
    { href: "/dashboard/community", label: translations.dashboard_layout.menu_community, icon: Users },
    { href: "/dashboard/requests", label: translations.dashboard_layout.menu_requests, icon: Bell },
    { href: "/dashboard/academy", label: translations.dashboard_layout.menu_academy, icon: GraduationCap },
    { href: "/dashboard/livestudio", label: translations.dashboard_layout.menu_live_studio, icon: Radio },
    { href: "/dashboard/suggestions", label: translations.dashboard_layout.menu_suggestions, icon: Lightbulb },
    { href: "/dashboard/support", label: translations.dashboard_layout.menu_support, icon: LifeBuoy },
  ];

  const buyerMenuItems = [
     { href: "/dashboard?userType=buyer", label: "Explore", icon: LayoutGrid },
     { href: "/dashboard/cart?userType=buyer", label: "Cart", icon: ShoppingCart },
     { href: "/dashboard/support?userType=buyer", label: "Support", icon: LifeBuoy },
  ];
  
  const menuItems = userType === 'buyer' ? buyerMenuItems : artisanMenuItems;
  
  const getPageTitle = () => {
    if (userType === 'buyer') {
      if (pathname.includes('/dashboard/cart')) return 'Shopping Cart';
      if (pathname.includes('/dashboard/support')) return 'Support';
      return 'Explore Art';
    }
    // Match dynamic routes like /dashboard/products/[id] to a menu item label
    const activeItem = menuItems.find(item => pathname.startsWith(item.href) && item.href !== '/dashboard');
    if (activeItem) return activeItem.label;
    if (pathname.startsWith('/dashboard/products/')) return translations.dashboard_layout.menu_add_product;
    if (pathname.startsWith('/dashboard/settings')) return translations.dashboard_layout.account_menu_settings;
    return translations.dashboard_layout.menu_dashboard;
  }
  
  const pageTitle = getPageTitle();
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { searchQuery, setSearchQuery });
    }
    return child;
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">Artisan</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <DashboardHeader 
            pageTitle={pageTitle} 
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            userType={userType}
          />
          <main className="flex-1 overflow-hidden pb-16 md:pb-0">
            <ScrollArea className="h-full">
              <div className="p-4 md:p-6 lg:p-8">
                {childrenWithProps}
              </div>
            </ScrollArea>
          </main>
        </div>
        <BottomNavBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
