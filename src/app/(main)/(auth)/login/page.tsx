'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants';
import useLoginMutation from '@/hooks/mutations/auth/use-login.mutation';
import { cn } from '@/lib/utils';

import { loginSchema, type LoginSchema } from './_schema/login.schema';

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: loginMutate } = useLoginMutation();

  const onSubmit = (data: LoginSchema) => {
    loginMutate(data);
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
