import { ApiResponse } from '@/types/api';

type Result<ResponseData> = {
  ok: boolean;
  statusCode: number;
  message: string | object | null;
  data: ResponseData | null;
};

export const fetchServer = async <ResponseData>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Result<ResponseData>> => {
  try {
    const res = await fetch(input, init);
    const body = (await res.json()) as ApiResponse<ResponseData>;

    if (!res.ok) {
      return {
        ok: false,
        statusCode: body.statusCode,
        message: body.message,
        data: null,
      };
    }

    return { ok: true, statusCode: body.statusCode, message: body.message, data: body.data };
  } catch (err) {
    return {
      ok: false,
      statusCode: 500,
      message: 'External service unreachable',
      data: null,
    };
  }
};
