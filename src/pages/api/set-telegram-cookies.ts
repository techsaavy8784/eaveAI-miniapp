import { NextResponse } from "next/server";

// Specify the Edge runtime
export const config = {
  runtime: "edge",
};

export default async function setTelegramCookiesHandler(req: Request) {
  const { method } = req;

  switch (method!.toLowerCase()) {
    case "get":
      return new Response("Hello World");

    case "post":
      try {
        const body = await req.json();

        const { telegram_entity_id, telegram_username } = body;

        if (!telegram_entity_id || !telegram_username) {
          console.error("Telegram data is missing");
          return new Response(
            JSON.stringify({ error: "Telegram data is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const response = NextResponse.json(
          { message: "Telegram data stored in cookies" },
          { status: 200 }
        );

        response.cookies.set("telegram_entity_id", telegram_entity_id);
        response.cookies.set("telegram_username", telegram_username);

        return response;
      } catch (error) {
        console.error("Error processing request:", error);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

    default:
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
  }
}
