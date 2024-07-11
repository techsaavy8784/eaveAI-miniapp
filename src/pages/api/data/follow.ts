import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function follow(req: Request) {
  const { method } = req;

  switch (method!.toLowerCase()) {
    case "get":
      return new Response("Hello World");

    case "post":
      try {
        const { creator } = await req.json();
        
        // Accessing cookies from the request headers
        const cookieHeader = req.headers.get('cookie');
        const cookies = cookieHeader ? Object.fromEntries(cookieHeader.split('; ').map(c => c.split('='))) : {};
        const telegramEntityId = cookies['telegram_entity_id'];

        console.log(telegramEntityId);

        if (!telegramEntityId) {
          return NextResponse.json(
            { error: "Telegram entity ID not found in cookies" },
            { status: 400 }
          );
        }

        const url = `https://api-eave-dev.azurewebsites.net/api/accounts/${telegramEntityId}/follow/`;
        const apiResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
          },
          body: JSON.stringify({ creator }),
        });
        console.log(apiResponse);


        if (apiResponse.status === 403) {
          return NextResponse.json(
            { error: "You have reached your follow limit" },
            { status: 403 }
          );
        }

        if (!apiResponse.ok) {
          throw new Error("Failed to follow the creator");
        }

        const result = await apiResponse.json();
        return NextResponse.json(result);
      } catch (error) {
        console.error("Error in follow route:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }

    default:
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
  }
}
