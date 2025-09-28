import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { students, courses } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, BookOpen, Percent } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">Parent Dashboard</h1>
                    <p className="text-muted-foreground">Welcome! Here's a summary of {child.name}'s progress.</p>
                </div>
                <Card className="flex items-center p-4 gap-4 shadow-sm">
                    <Avatar className='w-12 h-12 border-2 border-primary'>
                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                        <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-bold font-headline">{child.name}</h2>
                        <p className="text-muted-foreground text-sm">Class: {child.class}</p>
                    </div>
                </Card>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard icon={<Percent className="w-5 h-5"/>} title="Overall Score" value={`${child.overallScore}%`} />
                <StatCard icon={<CheckCircle2 className="w-5 h-5"/>} title="Attendance" value={`${child.attendance}%`} />
                <StatCard icon={<BookOpen className="w-5 h-5"/>} title="Courses Completed" value={child.completedCourses.toString()} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ProgressChart 
                    data={chartData} 
                    title="Course Performance"
                    description="Scores in recently attempted courses."
                    dataKey="Score"
                    xAxisKey="name"
                />
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight">Current Course Progress</CardTitle>
                        <CardDescription>An overview of courses your child is currently working on.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {courses.filter(c => c.progress > 0 && c.progress < 100).map(course => (
                            <div key={course.id}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">{course.title}</h3>
                                    <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>{course.progress}%</Badge>
                                </div>
                                <Progress value={course.progress} className="h-2"/>
                            </div>
                        ))}
                         {courses.filter(c => c.progress > 0 && c.progress < 100).length === 0 && (
                            <p className="text-muted-foreground text-center py-4">No courses are currently in progress.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
