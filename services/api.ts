export const adminApi = async (
  url: string,
  method = "GET",
  data: Record<string, any> = {}
): Promise<any> => {
  const config = useRuntimeConfig();

  const init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  if (Object.keys(data).length > 0) {
    init.body = JSON.stringify(data);
  }

  try {
    const fetchData = await fetch(
      new URL(url, config.public.adminApiUrl),
      init
    );

    if (fetchData.status !== 204) {
      return await fetchData.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const lmsApi = async (
  url: string,
  method = "GET",
  data: Record<string, any> = {}
): Promise<any> => {
  const config = useRuntimeConfig(); // Assuming useRuntimeConfig is imported and available
  const init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };

  if (Object.keys(data).length > 0) {
    init.body = JSON.stringify(data);
  }

  try {
    const fetchData = await fetch(
      new URL(url, config.public.lmsBackendUrl),
      init
    );

    if (fetchData.status !== 204) {
      return await fetchData.json();
    }
  } catch (error) {
    console.log(error);
  }
};
