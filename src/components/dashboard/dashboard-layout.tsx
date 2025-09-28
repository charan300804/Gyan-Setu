import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
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
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] group-data-[state=collapsed]/sidebar-wrapper:md:grid-cols-[4rem_1fr]">
        <Sidebar collapsible='icon'>
          <AppSidebar navItems={navItems} />
        </Sidebar>
        <div className='flex flex-col'>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
