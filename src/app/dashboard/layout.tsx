
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { languages, useLanguage } from "@/lib/locales/language-context";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'artisan';
  const { language, setLanguage, translations } = useLanguage();

  const artisanMenuItems = [
    { href: "/dashboard", label: translations.dashboard_layout.menu_dashboard, icon: LayoutGrid },
    { href: "/dashboard/products/new", label: translations.dashboard_layout.menu_add_product, icon: PlusCircle },
    { href: "/dashboard/analytics", label: translations.dashboard_layout.menu_analytics, icon: BarChart2 },
    { href: "/dashboard/marketing", label: translations.dashboard_layout.menu_marketing, icon: Megaphone },
    { href: "/dashboard/community", label: translations.dashboard_layout.menu_community, icon: Users },
    { href: "/dashboard/requests", label: translations.dashboard_layout.menu_requests, icon: Bell },
    { href: "/dashboard/academy", label: translations.dashboard_layout.menu_academy, icon: GraduationCap },
    { href: "/dashboard/livestudio", label: translations.dashboard_layout.menu_live_studio, icon: Radio },
    { href: "/dashboard/suggestions", label: "Suggestions", icon: Lightbulb },
    { href: "/dashboard/support", label: translations.dashboard_layout.menu_support, icon: LifeBuoy },
  ];

  const buyerMenuItems = [
     { href: "/dashboard?userType=buyer", label: "Explore", icon: LayoutGrid },
     { href: "/dashboard/cart", label: "Cart", icon: ShoppingCart },
     { href: "/dashboard/support?userType=buyer", label: "Support", icon: LifeBuoy },
  ];
  
  const menuItems = userType === 'buyer' ? buyerMenuItems : artisanMenuItems;
  
  const getPageTitle = () => {
    if (userType === 'buyer') {
      if (pathname.includes('/dashboard/cart')) return 'Shopping Cart';
      if (pathname.includes('/dashboard/support')) return 'Support';
      return 'Explore Art';
    }
    return menuItems.find(item => pathname.startsWith(item.href))?.label || "Dashboard";
  }
  
  const pageTitle = getPageTitle();

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
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
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
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1 flex gap-4 items-center">
              <h1 className="text-lg font-semibold md:text-2xl hidden sm:block">
                {pageTitle}
              </h1>
               <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-full"
                />
              </div>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Globe className="h-4 w-4"/>
                    <span>{languages.find(lang => lang.code === language)?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map(lang => (
                    <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code)} role="button">
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/40/40" alt="User" data-ai-hint="person portrait" />
                    <AvatarFallback>{userType === 'buyer' ? 'B' : 'A'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{translations.dashboard_layout.account_menu_label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userType === 'artisan' && (
                    <>
                        <DropdownMenuItem>
                        <Link href="/dashboard/verification" className="flex items-center">
                            <ShieldCheck className="mr-2" />
                            {translations.dashboard_layout.account_menu_verify}
                        </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <User className="mr-2" />
                        {translations.dashboard_layout.account_menu_profile}
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem>
                   <Link href={userType === 'buyer' ? "/dashboard/settings/payment?userType=buyer" : "/dashboard/settings/payment"} className="flex items-center">
                    <Settings className="mr-2" />
                    {translations.dashboard_layout.account_menu_settings}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/login" className="flex items-center">
                    <LogOut className="mr-2" />
                    {translations.dashboard_layout.account_menu_logout}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
