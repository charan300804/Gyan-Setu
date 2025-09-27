'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import * as icons from 'lucide-react';

type AppSidebarProps = {
  navItems: NavItem[];
  className?: string;
};

const Logo = () => (
    <Link href="/" className="text-2xl font-bold font-headline text-primary tracking-tighter">
      Gyan<span className="text-accent">Setu</span>
    </Link>
);


export function AppSidebar({ navItems, className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full", className)}>
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
        <Separator className='mx-4 w-auto bg-border' />
        <SidebarContent className="p-4">
            <SidebarMenu>
            {navItems.map((item) => {
              const Icon = icons[item.icon] as icons.LucideIcon;
              return (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                >
                    <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            </SidebarMenu>
        </SidebarContent>
    </div>
  );
}
