'use client';

import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem } from '@/lib/types';
import { students } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
  { title: 'Messages', href: '/teacher/chat', icon: 'MessageSquare' },
];

export default function TeacherStudentsPage() {
    const searchParams = useSearchParams();
    const selectedClass = searchParams.get('class');

    const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : students;

  return (
    <DashboardLayout navItems={teacherNavItems}>
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                    {selectedClass ? `Showing students for class ${selectedClass}` : 'Showing all students.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Courses Completed</TableHead>
                            <TableHead className="text-center">Overall Score</TableHead>
                            <TableHead className="text-center hidden md:table-cell">Attendance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map(student => {
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

                                    <TableCell className="text-center hidden sm:table-cell">
                                        <Badge variant="secondary">{student.completedCourses}</Badge>
                                    </TableCell>

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
                                                <DropdownMenuItem asChild>
                                                <Link href={`/teacher/students/${student.id}`}>View Report</Link>
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
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
