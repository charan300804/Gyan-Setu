'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students } from '@/lib/data';

const formSchema = z.object({
  email: z.string().min(1, { message: 'ID is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  class: z.string().optional(),
});

type LoginFormProps = {
  role: string;
  redirectUrl: string;
  showRegistration?: boolean;
};

export function LoginForm({ role, redirectUrl, showRegistration = true }: LoginFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      class: '',
    },
  });

  const availableClasses = Array.from(new Set(students.map(s => s.class)));

  function onSubmit(values: z.infer<typeof formSchema>) {
    // NOTE: This is a mock login.
    // In a real application, you would handle authentication here.
    console.log(values);
    
    let finalRedirectUrl = redirectUrl;
    if ((role === 'Student' || role === 'Class Teacher' || role === 'Subject Teacher') && values.class) {
      finalRedirectUrl = `${redirectUrl}?class=${encodeURIComponent(values.class)}`;
    }
    
    router.push(finalRedirectUrl);
  }
  
  const backLink = role === "Student" || role === "Parent" ? "/" : "/teacher";
  
  const getLabel = () => {
    if (role === 'Student') return 'Student ID';
    if (role === 'Parent') return "Child's ID";
    return 'Email / Staff ID';
  }

  const getPlaceholder = () => {
    if (role === 'Student') return 'Your student ID';
    if (role === 'Parent') return "Your child's student ID";
    return 'you@example.com or staff ID';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">
            Gyan<span className="text-accent">Setu</span>
          </CardTitle>
          <CardDescription>{role} Login</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{getLabel()}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={getPlaceholder()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(role === 'Student' || role === 'Class Teacher' || role === 'Subject Teacher') && (
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full">
                <LogIn className="mr-2" /> Login
              </Button>
              {role === 'Student' && showRegistration && (
                <>
                  <div className="flex items-center w-full my-2">
                    <Separator className="flex-1" />
                    <span className="px-4 text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1" />
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/student/register">
                      <UserPlus className="mr-2" />
                      Create Student Account
                    </Link>
                  </Button>
                </>
              )}
              <Button variant="link" size="sm" asChild className="w-full mt-4">
                <Link href={backLink}>&larr; Back</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
