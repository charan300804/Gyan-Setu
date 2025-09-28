'use client';

import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { students } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Users, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChartContainer } from '@/components/ui/chart';
import { QrCodeScanner } from '@/components/dashboard/qr-code-scanner';
import Link from 'next/link';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
];

export default function TeacherDashboardPage() {
    const searchParams = useSearchParams();
    const selectedClass = searchParams.get('class');
    const role = searchParams.get('role') || 'Subject Teacher'; // Default to Subject Teacher if no role

    const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : students;

    const chartData = filteredStudents.map(s => ({ name: s.name, "Average Score": s.overallScore, "Attendance": s.attendance }));

  return (
    <DashboardLayout navItems={teacherNavItems}>
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold font-headline">{role.replace(/([A-Z])/g, ' $1')} Dashboard</h1>
                <p className="text-muted-foreground">{selectedClass ? `Viewing Class ${selectedClass}` : 'Viewing All Students'}</p>
              </div>
              <QrCodeScanner />
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard icon={<Users />} title="Total Students" value={filteredStudents.length.toString()} />
                <StatCard icon={<BarChart2 />} title="Class Average Score" value={`${Math.round(filteredStudents.reduce((acc, s) => acc + s.overallScore, 0) / filteredStudents.length)}%`} />
                <StatCard icon={<BarChart2 />} title="Class Average Attendance" value={`${Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length)}%`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <ProgressChart 
                    data={chartData} 
                    title={`Overall Performance${selectedClass ? `: Class ${selectedClass}` : ''}`}
                    description="Average scores and attendance across all subjects."
                    dataKey="Average Score"
                    xAxisKey="name"
                />
              </div>

              <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className='font-headline'>Student Overview</CardTitle>
                        <CardDescription>Detailed progress for each student.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead className="text-center">Score</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map(student => {
                                    const avatar = PlaceHolderImages.find(img => img.id === student.avatarId);
                                    const scoreColor = student.overallScore > 80 ? 'text-green-500' : student.overallScore > 60 ? 'text-yellow-500' : 'text-red-500';
                                    return (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className='font-medium'>{student.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={`${scoreColor} border-current`}>{student.overallScore}%</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className='h-4 w-4'/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/teacher/students/${student.id}`}>View Full Report</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
              </div>
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
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}