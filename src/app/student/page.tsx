'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { NavItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/components/dashboard/course-card';
import { courses, students } from '@/lib/data';
import { AdaptiveLearningTool } from '@/components/dashboard/adaptive-learning-tool';
import { QrCodeGenerator } from '@/components/dashboard/qr-code-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const studentNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
  { title: 'Courses', href: '/student/courses', icon: 'BookOpen' },
  { title: 'Quizzes', href: '/student/quiz', icon: 'Trophy' },
];

export default function StudentDashboardPage() {
  const searchParams = useSearchParams();
  const studentClass = searchParams.get('class');
  const [studentName, setStudentName] = useState('Back');

  useEffect(() => {
    const storedStudentData = localStorage.getItem('studentCredentials');
    if (storedStudentData) {
        const student = JSON.parse(storedStudentData);
        setStudentName(student.fullName.split(' ')[0] || 'Back');
    }
  }, []);
  
  // Filter courses relevant to the student's class or language
  const relevantCourses = courses.filter(c => {
    // A simple logic: show English/Typing/Internet courses to all, and others based on class language.
    // This can be made more sophisticated. For now, we'll just show all.
    return true; 
  });

  const inProgressCourses = relevantCourses.filter(c => c.progress > 0 && c.progress < 100);
  const newCourses = relevantCourses.filter(c => c.progress === 0).slice(0, 2);
  
  return (
    <DashboardLayout navItems={studentNavItems}>
        <div className="space-y-8">
            <Card className="bg-primary/5 border-primary/20 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl md:text-3xl">Welcome {studentName}, to Class {studentClass}!</CardTitle>
                    <CardDescription>Ready to continue your learning journey? Let's make today productive.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4 font-headline tracking-tight">Continue Learning</h2>
                    {inProgressCourses.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                            {inProgressCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center p-8 flex flex-col items-center justify-center min-h-[200px]">
                            <CardContent className='p-0'>
                                <p className="text-muted-foreground mb-4">You have no courses in progress. Visit the courses page to start a new one!</p>
                                <Button asChild>
                                    <Link href="/student/courses">Explore Courses</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4 font-headline tracking-tight">Explore New Courses</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        {newCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
              </div>

              <aside className="xl:col-span-1 space-y-8">
                <AdaptiveLearningTool />
                <QrCodeGenerator />
              </aside>

            </div>
        </div>
    </DashboardLayout>
  );
}
