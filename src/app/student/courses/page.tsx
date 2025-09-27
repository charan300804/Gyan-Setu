import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { courses } from '@/lib/data';
import { CourseCard } from '@/components/dashboard/course-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const studentNavItems: NavItem[] = [
    { title: 'Home', href: '/', icon: 'Home' },
    { title: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
    { title: 'Courses', href: '/student/courses', icon: 'BookOpen' },
    { title: 'Quizzes', href: '/student/quiz', icon: 'Trophy' },
];

export default function CoursesPage() {
    const allLanguages = ['All', ...Array.from(new Set(courses.map(c => c.language)))];

  return (
    <DashboardLayout navItems={studentNavItems}>
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Course Catalog</h1>
                <p className="text-muted-foreground">Explore all available courses and start your learning journey.</p>
            </div>

            <Tabs defaultValue="All" className="w-full">
                <TabsList>
                    {allLanguages.map(lang => (
                         <TabsTrigger key={lang} value={lang}>{lang}</TabsTrigger>
                    ))}
                </TabsList>
                {allLanguages.map(lang => (
                    <TabsContent key={lang} value={lang}>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {courses
                                .filter(course => lang === 'All' || course.language === lang)
                                .map(course => (
                                    <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    </DashboardLayout>
  );
}
