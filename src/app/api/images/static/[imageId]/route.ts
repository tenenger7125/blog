import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';

export const GET = async (_request: Request, ctx: { params: { imageId: string } }) => {
  const { imageId } = ctx.params;

  const upstream = await fetch(`${EXTERNAL_URL_IN_NODE.STATIC_IMAGE}/${imageId}`);

  if (!upstream.ok) {
    const contentType = upstream.headers.get('content-type') || 'text/plain';
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { 'Content-Type': contentType },
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
};
