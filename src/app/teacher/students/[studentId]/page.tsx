'use client';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { students, courses } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { StudentSummary } from '@/components/dashboard/student-summary';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, CheckCircle2, Percent, MessageSquare } from 'lucide-react';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
  { title: 'Messages', href: '/teacher/chat', icon: 'MessageSquare' },
];

export default function StudentProfilePage({ params: { studentId } }: { params: { studentId: string } }) {
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return (
            <DashboardLayout navItems={teacherNavItems}>
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl font-bold">Student not found.</p>
                </div>
            </DashboardLayout>
        );
    }
    
    const avatar = PlaceHolderImages.find(img => img.id === student.avatarId);

    const studentPerformanceData = {
        name: student.name,
        class: student.class,
        overallScore: student.overallScore,
        attendance: student.attendance,
        completedCourses: student.completedCourses,
        courses: courses.map(c => ({ title: c.title, progress: c.progress })),
      };

  return (
    <DashboardLayout navItems={teacherNavItems}>
      <div className="flex flex-col gap-4">
        <div className='flex justify-between items-center'>
            <Button variant="ghost" asChild>
                <Link href="/teacher/dashboard"><ArrowLeft className='mr-2 h-4 w-4' /> Back to Dashboard</Link>
            </Button>
            <Button asChild>
                <Link href={`/teacher/chat?contactId=contact-2`}>
                    <MessageSquare className='mr-2 h-4 w-4' />
                    Send Message to Parent
                </Link>
            </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center p-6 gap-6 shadow-sm rounded-lg border bg-card">
            <Avatar className='w-24 h-24 border-4 border-background'>
                <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                <AvatarFallback className="text-3xl">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold">{student.name}</h1>
                <p className="text-muted-foreground text-lg">Class: {student.class}</p>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={<Percent />} title="Overall Score" value={`${student.overallScore}%`} />
            <StatCard icon={<CheckCircle2 />} title="Attendance" value={`${student.attendance}%`} />
            <StatCard icon={<BookOpen />} title="Courses Completed" value={student.completedCourses.toString()} />
            <div className="md:col-span-2 xl:col-span-1">
                    <StudentSummary studentData={studentPerformanceData} />
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Detailed progress for each course the student is enrolled in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {courses.map(course => (
                    <div key={course.id}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{course.title}</h3>
                            <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>{course.progress}%</Badge>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>

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
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
