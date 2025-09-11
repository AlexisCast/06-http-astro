import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {

  const clientId = params.clientId;
  const body = {
    method: 'GET',
    clientId: clientId
  }

  return new Response(
    JSON.stringify(body),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export const PATCH: APIRoute = async ({ params, request }) => {

  const clientId = params.clientId ?? '';

  try {
    const { id, ...body } = await request.json();

    const results = await db.update(Clients).set(body)
      .where(eq(Clients.id, +clientId))
      .returning();

    const updatedClient = await db.select()
      .from(Clients)
      .where(eq(Clients.id, +clientId))

    const responseBody = {
      updatedClient: updatedClient.at(0),
      results: results[0]
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

export const DELETE: APIRoute = async ({ params, request }) => {

  const clientId = params.clientId ?? '';

  const { rowsAffected } = await db.delete(Clients)
    .where(eq(Clients.id, +clientId));


  if (rowsAffected > 0) {
    return new Response(
      JSON.stringify({ msg: 'Deleted' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  const body = {
    msg: `Client with ${clientId} not found`,
  }

  return new Response(
    JSON.stringify(body),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}