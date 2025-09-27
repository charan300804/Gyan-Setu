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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormProps = {
  role: string;
  redirectUrl: string;
};

export function LoginForm({ role, redirectUrl }: LoginFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // NOTE: This is a mock login.
    // In a real application, you would handle authentication here.
    console.log(values);
    router.push(redirectUrl);
  }
  
  const backLink = role === "Student" ? "/" : "/teacher";

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
                    <FormLabel>Email / Staff ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              {role === 'Student' && (
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
