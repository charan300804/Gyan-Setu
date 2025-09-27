import { LoginForm } from '@/components/auth/login-form';

export default function TeacherLoginPage() {
  return (
    <LoginForm
      role="School Administrator"
      redirectUrl="/teacher"
    />
  );
}
