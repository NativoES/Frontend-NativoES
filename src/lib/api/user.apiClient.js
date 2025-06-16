import { ENDPOINTS, SERVICES } from "../endpoints/users.endpoints";

export async function apiRequest(endpointKey, options = {}) {
  const endpoint = ENDPOINTS[endpointKey];
  if (!endpoint) throw new Error(`Endpoint '${endpointKey}' no está definido`);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const baseUrl = SERVICES[endpoint.service];
  let url = baseUrl + endpoint.path;

  // Parámetros de búsqueda (ej: ?email=algo)
  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    url += `?${query}`;
  }

  const fetchOptions = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}
