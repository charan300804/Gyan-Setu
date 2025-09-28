'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { students } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Users, BarChart2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { QrCodeScanner } from '@/components/dashboard/qr-code-scanner';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
  { title: 'Messages', href: '/teacher/chat', icon: 'MessageSquare' },
];

export default function TeacherDashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedClass = searchParams.get('class');
    const role = searchParams.get('role') || 'Principal';

    const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : students;
    const availableClasses = ['All Classes', ...Array.from(new Set(students.map(s => s.class)))];

    const chartData = filteredStudents.map(s => ({ name: s.name, "Average Score": s.overallScore, "Attendance": s.attendance }));
    const classAverageScore = Math.round(filteredStudents.reduce((acc, s) => acc + s.overallScore, 0) / (filteredStudents.length || 1));
    const classAverageAttendance = Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / (filteredStudents.length || 1));

    const handleClassChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === 'All Classes') {
            params.delete('class');
        } else {
            params.set('class', value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

  return (
    <DashboardLayout navItems={teacherNavItems}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{role.replace(/([A-Z])/g, ' $1')} Dashboard</h1>
            <p className="text-muted-foreground">{selectedClass ? `Viewing Class ${selectedClass}` : 'Viewing All Students'}</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {role === 'Principal' && (
                <Select onValueChange={handleClassChange} value={selectedClass || 'All Classes'}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
            )}
            <QrCodeScanner />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={<Users />} title="Total Students" value={filteredStudents.length.toString()} />
            <StatCard icon={<BarChart2 />} title="Class Average Score" value={`${classAverageScore}%`} />
            <StatCard icon={<Activity />} title="Class Average Attendance" value={`${classAverageAttendance}%`} />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <ProgressChart 
                data={chartData} 
                title={`Overall Performance${selectedClass ? `: Class ${selectedClass}` : ''}`}
                description="Average scores and attendance for each student."
                dataKey="Average Score"
                xAxisKey="name"
            />
          </div>

          <div className="xl:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Student Overview</CardTitle>
                    <CardDescription>A quick look at student performance in {selectedClass ? `Class ${selectedClass}` : 'all classes'}.</CardDescription>
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
                            {filteredStudents.slice(0, 5).map(student => {
                                const avatar = PlaceHolderImages.find(img => img.id === student.avatarId);
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-9 h-9">
                                                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium'>{student.name}</span>
                                                    <span className='text-xs text-muted-foreground'>{student.class}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline">{student.overallScore}%</Badge>
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
                                                <DropdownMenuItem asChild>
                                                  <Link href={`/teacher/chat?contactId=contact-2`}>Send Message</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                     {filteredStudents.length > 5 && (
                        <div className='text-center mt-4'>
                            <Button variant="ghost" asChild>
                                <Link href={`/teacher/students${selectedClass ? `?class=${selectedClass}` : ''}`}>View All Students &rarr;</Link>
                            </Button>
                        </div>
                    )}
                     {filteredStudents.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No students found for this class.</p>
                     )}
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
