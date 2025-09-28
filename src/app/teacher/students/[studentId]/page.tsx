'use client';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { students, courses } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { StudentSummary } from '@/components/dashboard/student-summary';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
];

export default function StudentProfilePage({ params }: { params: { studentId: string } }) {
    const student = students.find(s => s.id === params.studentId);

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
    const chartData = courses.filter(c => c.progress > 0).map(c => ({ name: c.title, "Score": c.progress }));


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
        <div className="space-y-8">
            <Button variant="outline" asChild>
                <Link href="/teacher/dashboard"><ArrowLeft className='mr-2' /> Back to Dashboard</Link>
            </Button>
            <Card className="flex items-center p-6 gap-6">
                <Avatar className='w-24 h-24'>
                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                    <AvatarFallback className="text-3xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-4xl font-bold font-headline">{student.name}</h1>
                    <p className="text-muted-foreground text-lg">Class: {student.class}</p>
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader><CardTitle>Overall Score</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{student.overallScore}%</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Attendance</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{student.attendance}%</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Courses Completed</CardTitle></CardHeader>
                    <CardContent><p className="text-4xl font-bold">{student.completedCourses}</p></CardContent>
                </Card>
                <div className="lg:col-span-2 lg:row-start-1 lg:col-start-3">
                    <StudentSummary studentData={studentPerformanceData} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Course Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {courses.map(course => (
                        <div key={course.id}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">{course.title}</h3>
                                <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>{course.progress}%</Badge>
                            </div>
                            <Progress value={course.progress} />
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    </DashboardLayout>
  );
}
