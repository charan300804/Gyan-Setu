import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { LayoutDashboard, BookUser, Users, Home } from 'lucide-react';
import { students } from '@/lib/data';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
  { title: 'Students', href: '/teacher', icon: Users },
  { title: 'Assignments', href: '/teacher', icon: BookUser },
];

export default function TeacherDashboardPage() {
    const chartData = students.map(s => ({ name: s.name, "Average Score": s.overallScore }));
  return (
    <DashboardLayout navItems={teacherNavItems}>
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Teacher Dashboard</h1>
            <ProgressChart 
                data={chartData} 
                title="Class 6 Overall Performance"
                description="Average scores across all subjects."
                dataKey="Average Score"
                xAxisKey="name"
            />
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>Student Overview</CardTitle>
                    <CardDescription>Detailed progress for each student in your class.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead className="hidden sm:table-cell">Class</TableHead>
                                <TableHead className="text-center">Overall Score</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Attendance</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => {
                                const avatar = PlaceHolderImages.find(img => img.id === student.avatarId);
                                const scoreColor = student.overallScore > 80 ? 'bg-green-500' : student.overallScore > 60 ? 'bg-yellow-500' : 'bg-red-500';
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className='font-medium'>{student.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{student.class}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`${scoreColor} text-white`}>{student.overallScore}%</Badge>
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">{student.attendance}%</TableCell>
                                        <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className='h-4 w-4'/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Report</DropdownMenuItem>
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
    </DashboardLayout>
  );
}
