
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, useLanguage } from "@/lib/locales/language-context";
import {
  Globe,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import placeholderImages from '@/lib/placeholder-images.json';
import Link from "next/link";

const { userAvatar } = placeholderImages.misc;

export type DashboardHeaderProps = {
    pageTitle: string;
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    userType: string;
}

export function DashboardHeader({ pageTitle, searchQuery, onSearchChange, userType}: DashboardHeaderProps) {
  const { language, setLanguage, translations } = useLanguage();
  return (
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
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {translations.dashboard_layout.account_menu_label}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard/settings"} className="flex items-center">
              <User className="mr-2" />
              {translations.dashboard_layout.account_menu_profile}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2" />
              <span>{languages.find((lang) => lang.code === language)?.name}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                    role="button"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/login" className="flex items-center">
              <LogOut className="mr-2" />
              {translations.dashboard_layout.account_menu_logout}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={userAvatar.image} alt="User" data-ai-hint={userAvatar.imageHint} />
              <AvatarFallback>{userType === 'buyer' ? 'B' : 'A'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {translations.dashboard_layout.account_menu_label}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard/settings"} className="flex items-center">
              <Settings className="mr-2" />
              {translations.dashboard_layout.account_menu_settings}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/dashboard/settings"} className="flex items-center">
              <User className="mr-2" />
              {translations.dashboard_layout.account_menu_profile}
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
  );
}
