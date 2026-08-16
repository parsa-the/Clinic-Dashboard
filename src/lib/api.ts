type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : "خطا در ارتباط با سرور";
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
