
import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {

  const users = await db.select().from(Clients).all();

  return new Response(
    JSON.stringify(users),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    const responseBody = {
      id: +lastInsertRowid!.toString(),
      ...body
    }

    return new Response(
      JSON.stringify(responseBody),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: 'No body found',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  }
}
