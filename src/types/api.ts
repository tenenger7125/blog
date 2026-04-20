export type ApiResponse<T = null> = {
  ok: boolean;
  statusCode: number;
  message: string | object | null;
  data: T | null;
  detail: string | object | null;
};
