export async function fetchUserData(telegramEntityId: number | undefined) {
  const url = `https://api-eave-dev.azurewebsites.net/api/accounts/get_by_telegram_entity_id/?telegram_entity_id=${telegramEntityId}`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }

  const result = await apiResponse.json();

  return result;
}

export async function fetchTrackingData(telegramEntityId: number | undefined) {
  const url = `https://api-eave-dev.azurewebsites.net/api/accounts/${telegramEntityId}/follows/`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }

  const result = await apiResponse.json();

  return result;
}

export async function fetchHostsData(
  offset: number,
  limit: number,
  twitter_username: string | null
) {
  const url =
    `https://api-eave-dev.azurewebsites.net/api/creators/?offset=${offset}&limit=${limit}` +
    (twitter_username ? `&search=${twitter_username}` : "");

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }

  const result = await apiResponse.json();
  return result;
}

export async function fetchLiveSpaces() {
  const url = `https://api-eave-dev.azurewebsites.net/api/spaces/?state=live`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }

  const result = await apiResponse.json();
  return result.results;
}

export async function fetchCreatorSpaces(
  creatorUsername: string
): Promise<any> {
  const url = `https://api-eave-dev.azurewebsites.net/api/spaces/?creator_username=${creatorUsername}&limit=5`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "O4g7hFBP.Wa2y8ftUqjjk0BAaPPFwxCqCPVGcK7ls",
    },
  });

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data from external API");
  }

  const result = await apiResponse.json();
  return result.results;
}
