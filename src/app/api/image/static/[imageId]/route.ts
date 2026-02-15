export const GET = async (_request: Request, { params }: { params: { imageId: string } }) => {
  const { imageId } = params;

  if (!process.env.BLOG_SERVER) {
    return new Response('Blog server not configured', { status: 500 });
  }

  const upstream = await fetch(`${process.env.BLOG_SERVER}/image/static/${imageId}`);

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
