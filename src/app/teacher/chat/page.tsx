'use client';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ChatLayout } from '@/components/chat/chat-layout';
import { chatContacts, conversations } from '@/lib/data';
import type { NavItem } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const teacherNavItems: NavItem[] = [
  { title: 'Home', href: '/', icon: 'Home' },
  { title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
  { title: 'Students', href: '/teacher/students', icon: 'Users' },
  { title: 'Assignments', href: '/teacher/assignments', icon: 'BookUser' },
  { title: 'Messages', href: '/teacher/chat', icon: 'MessageSquare' },
];

export default function TeacherChatPage() {
    const searchParams = useSearchParams();
    const defaultContactId = searchParams.get('contactId') || chatContacts[0].id;
    const defaultConversation = conversations.find(c => c.contactId === defaultContactId);

    return (
        <DashboardLayout navItems={teacherNavItems}>
            <ChatLayout 
                contacts={chatContacts}
                conversations={conversations}
                defaultContactId={defaultContactId}
            />
        </DashboardLayout>
    )
}
