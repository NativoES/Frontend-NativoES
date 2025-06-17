
import { apiRequest } from "@/lib/api/user.apiClient";
import { CLASSES_ENDPOINTS, CLASSES_SERVICES } from "@/lib/endpoints/clases.endpoints";

export const createClass = (body) =>
  apiRequest("REGISTER_CLASS", { body }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const getClasses = ({ page = 1, limit = 10 } = {}) =>
  apiRequest("GET_CLASSES", { params: { page, limit } }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const getClassById = (id) =>
  apiRequest("GET_CLASS_BY_ID", { pathParams: { id } }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const updateClass = (id, body) =>
  apiRequest("UPDATE_CLASS", { pathParams: { id }, body }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const deleteClass = (id) =>
  apiRequest("DELETE_CLASS", { pathParams: { id } }, CLASSES_ENDPOINTS, CLASSES_SERVICES);
