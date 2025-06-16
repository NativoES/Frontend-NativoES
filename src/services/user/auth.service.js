import { apiRequest } from "@/lib/api/user.apiClient";

export const getUserProfile = () => apiRequest('GET_USER_PROFILE');
export const login = (body) => apiRequest('LOGIN', { ...body });