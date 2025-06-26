
import { apiRequest } from "@/lib/api/user.apiClient";
import { CLASSES_ENDPOINTS, CLASSES_SERVICES } from "@/lib/endpoints/clases.endpoints";

export const createClass = (formData) =>
  apiRequest("REGISTER_CLASS", { body: formData }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const getClasses = ({ page = 1, limit = 5, publico, profesorId } = {}) => {
  const params = {
    page,
    limit,
    ...(publico !== undefined && { publico }),
    ...(profesorId !== undefined && { profesorId }),
  };

  console.log("es publico: ", publico);

  return apiRequest("GET_CLASSES", { params }, CLASSES_ENDPOINTS, CLASSES_SERVICES);
};


export const getClassById = (id) =>
  apiRequest("GET_CLASS_BY_ID", { pathParams: { id } }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const updateClass = (id, formData) =>
  apiRequest("UPDATE_CLASS", { pathParams: { id }, body: formData }, CLASSES_ENDPOINTS, CLASSES_SERVICES);

export const deleteClass = (id) =>
  apiRequest("DELETE_CLASS", { pathParams: { id } }, CLASSES_ENDPOINTS, CLASSES_SERVICES);
