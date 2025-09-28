'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { courses } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, BookOpen, Clock, FileText, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const studentNavItems: NavItem[] = [
    { title: 'Home', href: '/', icon: 'Home' },
    { title: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
    { title: 'Courses', href: '/student/courses', icon: 'BookOpen' },
    { title: 'Quizzes', href: '/student/quiz', icon: 'Trophy' },
];

export default function CourseDetailPage({ params: { courseId } }: { params: { courseId: string } }) {
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return (
            <DashboardLayout navItems={studentNavItems}>
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl font-bold">Course not found.</p>
                    <Button variant="link" asChild>
                        <Link href="/student/courses">Go back to courses</Link>
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    const image = PlaceHolderImages.find(img => img.id === course.imageId);

  return (
    <DashboardLayout navItems={studentNavItems}>
        <div className="space-y-6">
            <div>
                <Button variant="ghost" asChild className='mb-4'>
                    <Link href="/student/courses"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Link>
                </Button>
                <div className="relative h-64 w-full rounded-lg overflow-hidden border">
                    {image && <Image src={image.imageUrl} alt={course.title} fill className="object-cover" />}
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div>
                            <Badge variant="secondary" className='mb-2'>{course.language}</Badge>
                            <CardTitle className="text-3xl font-bold font-headline">{course.title}</CardTitle>
                            <CardDescription className="mt-2 text-base">{course.description}</CardDescription>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-64">
                             {course.progress > 0 && (
                                <div className='mb-4'>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
                                        <span className="text-sm font-bold text-primary">{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="h-2" />
                                </div>
                            )}
                            <Button asChild className="w-full">
                                <Link href="/student/quiz">
                                    <Trophy className="mr-2 h-4 w-4" />
                                    {course.progress > 0 ? 'Continue to Quiz' : 'Start Quiz'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-6 border-t pt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <InfoItem icon={<BookOpen />} label="Modules" value={`${course.modules} learning modules`} />
                        <InfoItem icon={<Clock />} label="Estimated Time" value="2-3 hours" />
                        <InfoItem icon={<FileText />} label="Resources" value="Videos & Notes" />
                    </div>
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-bold font-headline mb-4">Course Content</h3>
                        <p className="text-muted-foreground">
                            Course content and modules would be displayed here. For now, please proceed to the quiz.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="p-3 bg-muted rounded-md text-primary">
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    )
}
