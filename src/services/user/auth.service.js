import { apiRequest } from "@/lib/api/user.apiClient";
import { USER_ENDPOINTS, USER_SERVICES } from "@/lib/endpoints/users.endpoints";

export const getUserProfile = () => apiRequest('GET_USER_PROFILE', {}, USER_ENDPOINTS, USER_SERVICES);
export const login = (body) => apiRequest('LOGIN', { ...body }, USER_ENDPOINTS, USER_SERVICES);