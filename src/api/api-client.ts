type Options = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  search?: Record<string, string>;
};

export async function tmdb_fetch<TResponse>(path: string, options?: Options) {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
    ...options?.search,
  });

  const url = `${import.meta.env.VITE_TMDB_BASE_URL}/${path}?${params}`;
  const response = await fetch(url, { method: options?.method ?? 'GET' });

  if (!response.ok) {
    console.error(url);
    throw new Error(response.statusText);
  }

  return response.json() as TResponse;
}
