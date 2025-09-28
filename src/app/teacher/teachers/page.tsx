
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import type { NavItem, Teacher } from '@/lib/types';
import { teachers, students } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { TeacherRole } from '@/lib/types';

const baseNavItems: NavItem[] = [
    { title: 'Home', href: '/', icon: 'Home' },
    { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
    { title: 'Students', href: '/teacher/students', icon: 'Users' },
    { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
    { title: 'Messages', href: '/teacher/chat', icon: 'MessageSquare' },
];

const principalNavItems: NavItem[] = [
    ...baseNavItems.slice(0, 3),
    { title: 'Teachers', href: '/teacher/teachers', icon: 'UserCog', role: 'Principal' },
    ...baseNavItems.slice(3)
];

export default function TeacherManagementPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'Principal';
    
    // This page is only for Principals
    if (role !== 'Principal') {
        return (
            <DashboardLayout navItems={baseNavItems}>
                <Card>
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>You do not have permission to view this page.</p>
                    </CardContent>
                </Card>
            </DashboardLayout>
        );
    }
  
    return (
        <DashboardLayout navItems={principalNavItems}>
            <TeacherManagementContent />
        </DashboardLayout>
    );
}


function TeacherManagementContent() {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<TeacherRole | ''>('');

    const availableClasses = Array.from(new Set(students.map(s => s.class)));
    const availableSubjects = ['Mathematics', 'Science', 'English', 'History'];

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const newPassword = Math.random().toString(36).slice(-8);

        toast({
            title: `Account Created for ${name}`,
            description: `An email has been sent with their credentials. Password: ${newPassword}`,
        });
        setOpen(false);
        setSelectedRole('');
        e.currentTarget.reset();
    }
    
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Manage Teachers</CardTitle>
                        <CardDescription>
                            View teacher assignments and create new accounts.
                        </CardDescription>
                    </div>
                    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setSelectedRole(''); }}>
                        <DialogTrigger asChild>
                            <Button><UserPlus className="mr-2"/> Add New Teacher</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Teacher Account</DialogTitle>
                                <DialogDescription>
                                    Fill out the form to generate login credentials for a new teacher.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" placeholder="e.g., Jane Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select name="role" required onValueChange={(value: TeacherRole) => setSelectedRole(value)}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                                            <SelectItem value="Subject Teacher">Subject Teacher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {selectedRole && (
                                    <div className="space-y-2">
                                        <Label htmlFor="assignment">Assignment</Label>
                                        <Select name="assignment" required>
                                            <SelectTrigger id="assignment">
                                                <SelectValue placeholder={`Select a ${selectedRole === 'Class Teacher' ? 'class' : 'subject'}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedRole === 'Class Teacher' && availableClasses.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
                                                {selectedRole === 'Subject Teacher' && availableSubjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button type="submit">Create Account</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Teacher</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Assignment</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map(teacher => {
                                const avatar = PlaceHolderImages.find(img => img.id === teacher.avatarId);
                                return (
                                    <TableRow key={teacher.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className='font-medium'>{teacher.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{teacher.role}</Badge>
                                        </TableCell>
                                        <TableCell>{teacher.assignment}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className='h-4 w-4'/></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Delete Account</DropdownMenuItem>
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
    )
}
