import { apiRequest } from "@/lib/api/user.apiClient";
import { USER_ENDPOINTS, USER_SERVICES } from "@/lib/endpoints/users.endpoints";

export const getAllUsers = ({ page = 1, limit = 10, rol = 'PROFESOR' }) =>
    apiRequest('GET_ALL_USERS', {
        params: { page, limit, rol }
    }, USER_ENDPOINTS, USER_SERVICES);


export const getAllStudents = (rol = "ESTUDIANTE") =>
    apiRequest("GET_ALL_STUDENTS", {
        params: { rol },
    }, USER_ENDPOINTS, USER_SERVICES);

export const getEnrolledStudents = (claseId, limit, page) =>
    apiRequest("GET_ENROLLED_STUDENTS", {
        params: { claseId, limit, page },
    }, USER_ENDPOINTS, USER_SERVICES);

export const enrollStudent = ({ estudianteId, claseId }) =>
    apiRequest("CREATE_ENROLLMENT", {
        body: { estudianteId, claseId },
    }, USER_ENDPOINTS, USER_SERVICES);

export const getClasesByStudent = (estudianteId) => {
    return apiRequest("GET_CLASES_BY_ESTUDENT", {
        pathParams: { estudianteId },
    }, USER_ENDPOINTS, USER_SERVICES);
};


