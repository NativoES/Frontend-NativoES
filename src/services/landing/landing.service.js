import { apiRequest } from "@/lib/api/user.apiClient";
import { LANDING_ENDPOINTS, LANDING_SERVICES } from "@/lib/endpoints/landing.endpoints";

export const getHero = (locale) =>
    apiRequest('GET_HERO', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createHero = (formData) =>
    apiRequest('REGISTER_HERO', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateHero = (id, formData) =>
    apiRequest('UPDATE_HERO', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

// form study
export const getFormStudy = (locale) =>
    apiRequest('GET_FORM_STUDY', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createFormStudy = (formData) =>
    apiRequest('REGISTER_FORM_STUDY', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateFormStudy = (id, formData) =>
    apiRequest('UPDATE_FORM_STUDY', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteFormStudy = (id) =>
  apiRequest("DELETE_FORM_STUDY", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);

// teacher
export const getTeacher = (locale) =>
    apiRequest('GET_TEACHER', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createTeacher = (formData) =>
    apiRequest('REGISTER_TEACHER', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateTeacher = (id, formData) =>
    apiRequest('UPDATE_TEACHER', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteTeacher = (id) =>
  apiRequest("DELETE_TEACHER", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);
