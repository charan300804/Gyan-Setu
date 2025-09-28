import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ProfileForm } from '@/components/profile/profile-form';
import type { NavItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// These nav items are placeholders and would dynamically change based on the user's role.
const genericNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/student', icon: 'LayoutDashboard' }, // Example link
  { title: 'Profile', href: '/profile', icon: 'User' },
];

export default function ProfilePage() {

  return (
    <DashboardLayout navItems={genericNavItems}>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Manage your account settings and personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
}
