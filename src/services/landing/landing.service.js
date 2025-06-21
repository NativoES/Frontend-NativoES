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

// characteristic
export const getCharacteristics = (locale) =>
    apiRequest('GET_CHARACTERISTIC', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createCharacteristic = (formData) =>
    apiRequest('REGISTER_CHARACTERISTIC', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateCharacteristic = (id, formData) =>
    apiRequest('UPDATE_CHARACTERISTIC', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteCharacteristic = (id) =>
  apiRequest("DELETE_CHARACTERISTIC", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);

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

// method course
export const getMethodCourse = (locale) =>
    apiRequest('GET_METHOD_COURSE', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createMethodCourse = (body) =>
    apiRequest('REGISTER_METHOD_COURSE', { body }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateMethodCourse = (id, body) =>
    apiRequest('UPDATE_METHOD_COURSE', { pathParams: { id }, body }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteMethodCourse = (id) =>
  apiRequest("REGISTER_PRICE", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);

// method course
export const createPrice = (formData) =>
    apiRequest('REGISTER_PRICE', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updatePrice = (id, formData) =>
    apiRequest('UPDATE_PRICE', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const getPrice = (locale) =>
    apiRequest('GET_PRICE', {   
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deletePrice = (id) =>
  apiRequest("DELETE_PRICE", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);

// CONTACT
export const getContact = (locale) =>
    apiRequest('GET_CONTACT', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createContact = (body) =>
    apiRequest('REGISTER_CONTACT', { body }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateContact = (id, body) =>
    apiRequest('UPDATE_CONTACT', { pathParams: { id }, body }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteContact = (id) =>
  apiRequest("DELETE_CONTACT", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);


// Review
export const getReview = (locale) =>
    apiRequest('GET_REVIEW', {
        params: { locale }
    }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const createReview = (formData) =>
    apiRequest('REGISTER_REVIEW', { body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const updateReview = (id, formData) =>
    apiRequest('UPDATE_REVIEW', { pathParams: { id }, body: formData }, LANDING_ENDPOINTS, LANDING_SERVICES);

export const deleteReview = (id) =>
  apiRequest("DELETE_REVIEW", { pathParams: { id } }, LANDING_ENDPOINTS, LANDING_SERVICES);

