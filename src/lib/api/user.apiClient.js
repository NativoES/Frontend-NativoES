export async function apiRequest(endpointKey, options = {}, ENDPOINTS, SERVICES) {
  const endpoint = ENDPOINTS[endpointKey];
  if (!endpoint) throw new Error(`Endpoint '${endpointKey}' no está definido`);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const baseUrl = SERVICES[endpoint.service];

  let path = endpoint.path;
  if (options.pathParams) {
    for (const [key, value] of Object.entries(options.pathParams)) {
      path = path.replace(`:${key}`, value);
    }
  }

  let url = baseUrl + path;

  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    url += `?${query}`;
  }

  const isFormData = options.body instanceof FormData;

  const fetchOptions = {
    method: endpoint.method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!isFormData && { "Content-Type": "application/json" }),
    },
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  };

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}
