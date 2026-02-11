import z from 'zod';

export const loginSchema = z.object({
  email: z.email('유효한 이메일 주소를 입력하세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
