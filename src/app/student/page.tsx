import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { NavItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/components/dashboard/course-card';
import { courses } from '@/lib/data';
import { AdaptiveLearningTool } from '@/components/dashboard/adaptive-learning-tool';
import { QrCodeGenerator } from '@/components/dashboard/qr-code-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const studentNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
  { title: 'Courses', href: '/student/courses', icon: 'BookOpen' },
  { title: 'Quizzes', href: '/student/quiz', icon: 'Trophy' },
];

export default function StudentDashboardPage() {
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  
  return (
    <DashboardLayout navItems={studentNavItems}>
        <div className="space-y-8">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome Back, Rohan!</CardTitle>
                    <CardDescription>Ready to continue your learning journey? Let's make today productive.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-headline">Continue Learning</h2>
                    {inProgressCourses.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
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
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-headline">Explore New Courses</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {courses.filter(c => c.progress === 0).slice(0, 2).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-8">
                <AdaptiveLearningTool />
                <QrCodeGenerator />
              </div>

            </div>
        </div>
    </DashboardLayout>
  );
}
