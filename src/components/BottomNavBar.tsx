
"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, Search, MessageSquare, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/locales/language-context';

export function BottomNavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'artisan';

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '#', label: 'Search', icon: Search },
    { href: '/dashboard/support', label: 'Chat', icon: MessageSquare },
    { href: '/dashboard/cart', label: 'Cart', icon: ShoppingCart },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const hrefWithParams = userType === 'buyer' ? `${item.href}?userType=buyer` : item.href;
          
          return (
            <Link key={item.label} href={hrefWithParams} className={cn(
              "flex flex-col items-center justify-center text-muted-foreground w-full h-full",
              isActive && "text-primary"
            )}>
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
