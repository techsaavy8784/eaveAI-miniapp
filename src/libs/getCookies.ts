'user server'

import { cookies } from "next/headers";

export function getCookies() {
  const cookieStore = cookies();
  const telegramEntityId = cookieStore.get("telegram_entity_id")?.value || "";
  const telegramUsername = cookieStore.get("telegram_username")?.value || "";

  return {
    telegramEntityId,
    telegramUsername,
  };
}
