import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { students, courses } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const parentNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/parent', icon: 'LayoutDashboard' },
  { title: 'Reports', href: '/parent', icon: 'BarChart' },
  { title: 'Notifications', href: '/parent', icon: 'Bell' },
];

export default function ParentDashboardPage() {
    const child = students[0]; // Assuming the parent is viewing the first student
    const avatar = PlaceHolderImages.find(img => img.id === child.avatarId);
    const chartData = courses.filter(c => c.progress > 0).map(c => ({ name: c.title, "Score": c.progress }));
  return (
    <DashboardLayout navItems={parentNavItems}>
        <div className="space-y-8">
            <Card className="flex items-center p-6 gap-6">
                <Avatar className='w-20 h-20'>
                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold font-headline">Progress Report for {child.name}</h1>
                    <p className="text-muted-foreground">Class: {child.class}</p>
                </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle>Overall Score</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{child.overallScore}%</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Attendance</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{child.attendance}%</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Courses Completed</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{child.completedCourses}</p></CardContent>
                </Card>
            </div>

            <ProgressChart 
                data={chartData} 
                title="Course Performance"
                description="Scores in recently attempted courses."
                dataKey="Score"
                xAxisKey="name"
            />
        </div>
    </DashboardLayout>
  );
}
