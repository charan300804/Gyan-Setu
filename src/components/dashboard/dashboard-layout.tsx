import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { AppHeader } from '@/components/dashboard/app-header';
import type { NavItem } from '@/lib/types';

type DashboardLayoutProps = {
  navItems: NavItem[];
  children: ReactNode;
};

export function DashboardLayout({ navItems, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <AppSidebar navItems={navItems} />
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
