'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { delay } from '@/utils/delay';
import { userLocalStorage } from '@/utils/local-storage';

import { loginSchema, type LoginSchema } from './_schema/login.schema';

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await delay(1000);

    userLocalStorage.set({
      email: data.email,
      profileImageUrl: null,
      name: 'name',
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    router.push(PATH.HOME);
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
