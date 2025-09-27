import { LoginForm } from '@/components/auth/login-form';

export default function ParentLoginPage() {
  return (
    <LoginForm
      role="Parent"
      redirectUrl="/parent"
    />
  );
}
