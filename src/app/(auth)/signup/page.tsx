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
import { SignupRequestData, SignupResponseData } from '@/types/auth';
import { httpClient } from '@/utils/http/client';

import { SignupSchema, signupSchema } from './_schema/signup.schema';

const SignupForm = () => {
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    const res = await httpClient.post<SignupResponseData, SignupRequestData>('/api/auth/signup', data);
    if (res.ok) {
      toast.success('Account created successfully!');
      router.push(PATH.LOGIN);
    } else {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <Card className="m-auto">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>아래 정보를 입력하여 계정을 생성하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                placeholder="이동규"
                type="text"
                {...register('name')}
                variant={formState.errors.name ? 'error' : 'default'}
              />
              <FieldDescription className={formState.errors.name ? 'text-red-500' : ''}>
                {formState.errors.name ? formState.errors.name.message : ''}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                {...register('email')}
                variant={formState.errors.email ? 'error' : 'default'}
              />
              <FieldDescription className={formState.errors.email ? 'text-red-500' : ''}>
                {formState.errors.email ? formState.errors.email.message : ''}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register('password')}
                variant={formState.errors.password ? 'error' : 'default'}
              />
              <FieldDescription className={formState.errors.password ? 'text-red-500' : ''}>
                {formState.errors.password ? formState.errors.password.message : 'Must be at least 8 characters long.'}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input
                id="confirm-password"
                placeholder="••••••••"
                type="password"
                {...register('confirmPassword')}
                variant={formState.errors.confirmPassword ? 'error' : 'default'}
              />
              <FieldDescription className={formState.errors.confirmPassword ? 'text-red-500' : ''}>
                {formState.errors.confirmPassword
                  ? formState.errors.confirmPassword.message
                  : 'Please confirm your password.'}
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href={PATH.LOGIN}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
