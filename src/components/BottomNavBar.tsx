
"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, LayoutGrid, PlusCircle, ShoppingCart, LifeBuoy, Users, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/locales/language-context';

export function BottomNavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') || 'artisan';

  const artisanNavItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/products/new', label: 'Create', icon: PlusCircle },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/dashboard/community', label: 'Community', icon: Users },
  ];

  const buyerNavItems = [
    { href: '/dashboard?userType=buyer', label: 'Explore', icon: LayoutGrid },
    { href: '/dashboard/cart?userType=buyer', label: 'Cart', icon: ShoppingCart },
    { href: '/dashboard/support?userType=buyer', label: 'Support', icon: LifeBuoy },
  ];
  
  const navItems = userType === 'buyer' ? buyerNavItems : artisanNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href.split('?')[0];
          
          return (
            <Link key={item.label} href={item.href} className={cn(
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
