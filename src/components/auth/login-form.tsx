'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

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
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      class: '',
    },
  });

  const availableClasses = ["6th A", "6th B", "7th A", "7th B", "8th A", "8th B"];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    let finalRedirectUrl = redirectUrl;
    const queryParams = new URLSearchParams(searchParams);

    if (values.class) {
      queryParams.append('class', values.class);
    }
    
    if (role === 'Class Teacher' || role === 'Subject Teacher' || role === 'Principal') {
      queryParams.append('role', role);
    }
    
    try {
        if (role === 'Student' && !values.class) {
            form.setError('class', { type: 'manual', message: 'Please select your class.'});
            return;
        }

        await signInWithEmailAndPassword(auth, values.email, values.password);

        if (queryParams.toString()) {
            finalRedirectUrl = `${redirectUrl}?${queryParams.toString()}`;
        }
        
        router.push(finalRedirectUrl);
        
    } catch (error: any) {
        console.error("Login error:", error);
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid credentials. Please try again.",
        });
        form.setError('email', { type: 'manual', message: 'Invalid credentials.' });
        form.setError('password', { type: 'manual', message: ' ' });
    }
  }
  
  const backLink = role === "Student" || role === "Parent" ? "/" : "/teacher";
  
  const getLabel = () => {
    if (role === 'Student') return 'Student Email';
    if (role === 'Parent') return "Child's Email";
    return 'Email / Staff ID';
  }

  const getPlaceholder = () => {
    if (role === 'Student') return 'Your registered email';
    if (role === 'Parent') return "Your child's registered email";
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
              {(role === 'Student') && (
                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} required={role === 'Student'}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
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
               {role !== 'Student' && role !== 'Parent' && (
                 <Button variant="link" size="sm" asChild className="w-full mt-4">
                    <Link href={'/teacher'}>&larr; Back to Role Selection</Link>
                </Button>
               )}
               {(role === 'Student' || role === 'Parent') && (
                <Button variant="link" size="sm" asChild className="w-full mt-4">
                    <Link href={'/'}>&larr; Back to Home</Link>
                </Button>
               )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
