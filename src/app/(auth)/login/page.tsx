'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { LoginRequestData, LoginResponseData } from '@/types/auth';
import { requestHttp } from '@/utils/http/request';

import { loginSchema, type LoginSchema } from './_schema/login.schema';

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await requestHttp.post<LoginResponseData, LoginRequestData>('/api/auth/login', data);
    if (res.ok) {
      toast.success('Login successful!');
      router.push(PATH.HOME);
      router.refresh();
    } else {
      toast.error('Failed to login. Please try again.');
    }
  };

  return (
    <div className={cn('m-auto flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력하고 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  required
                  {...form.register('email')}
                  autoFocus
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" placeholder="••••••••" type="password" required {...form.register('password')} />
              </Field>
              <Field>
                <Button type="submit" variant="black">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href={PATH.SIGNUP}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
