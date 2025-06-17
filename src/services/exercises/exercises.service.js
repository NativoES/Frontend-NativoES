
import { apiRequest } from "@/lib/api/user.apiClient";
import { EXERCISE_ENDPOINTS, EXERCISE_SERVICES } from "@/lib/endpoints/exercise.endpoints";

// Crear
export const uploadImage = (formData) =>
  apiRequest('UPLOAD_IMAGE', { body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const uploadGif = (formData) =>
  apiRequest('UPLOAD_GIF', { body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const uploadAudio = (formData) =>
  apiRequest('UPLOAD_AUDIO', { body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const uploadVideo = (formData) =>
  apiRequest('UPLOAD_VIDEO', { body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const palabraImagen = (formData) =>
  apiRequest('IMAGEN_PALABRA', { body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const completarTexto = (body) =>
  apiRequest('COMPLETAR_TEXTO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const ordenarTexto = (body) =>
  apiRequest('ORDENAR_TEXTO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const notaTexto = (body) =>
  apiRequest('NOTA_TEXTO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const llenarEspacio = (body) =>
  apiRequest('LLENAR_ESPACIO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const seleccionPalabra = (body) =>
  apiRequest('SELECCION_PALABRA', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const falsoVerdadero = (body) =>
  apiRequest('FALSO_VERDADERO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const relacionarPalabra = (body) =>
  apiRequest('RELACIONAR_PALABRA', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const formarPalabra = (body) =>
  apiRequest('FORMAR_PALABRA', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const ordenarPalabra = (body) =>
  apiRequest('ORDENAR_PALABRA', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const enlaceExterno = (body) =>
  apiRequest('ENLACE_EXTERNO', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const notaColores = (body) =>
  apiRequest('NOTA', { body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

// Editar
export const updateImage = (id, formData) =>
  apiRequest('EDIT_IMAGE', { pathParams: { id }, body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateGif = (id, formData) =>
  apiRequest('EDIT_GIF', { pathParams: { id }, body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateAudio = (id, formData) =>
  apiRequest('EDIT_AUDIO', { pathParams: { id }, body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateVideo = (id, formData) =>
  apiRequest('EDIT_VIDEO', { pathParams: { id }, body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updatePalabraImagen = (id, formData) =>
  apiRequest('EDIT_IMAGEN_PALABRA', { pathParams: { id }, body: formData }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateCompletarTexto = (id, body) =>
  apiRequest('EDIT_COMPLETAR_TEXTO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateOrdenarTexto = (id, body) =>
  apiRequest('EDIT_ORDENAR_TEXTO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateNotaTexto = (id, body) =>
  apiRequest('EDIT_NOTA_TEXTO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateLlenarEspacio = (id, body) =>
  apiRequest('EDIT_LLENAR_ESPACIO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateSeleccionPalabra = (id, body) =>
  apiRequest('EDIT_SELECCION_PALABRA', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateFalsoVerdadero = (id, body) =>
  apiRequest('EDIT_FALSO_VERDADERO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateRelacionarPalabra = (id, body) =>
  apiRequest('EDIT_RELACIONAR_PALABRA', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateFormarPalabra = (id, body) =>
  apiRequest('EDIT_FORMAR_PALABRA', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateOrdenarPalabra = (id, body) =>
  apiRequest('EDIT_ORDENAR_PALABRA', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateEnlaceExterno = (id, body) =>
  apiRequest('EDIT_ENLACE_EXTERNO', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
export const updateNotaColores = (id, body) =>
  apiRequest('EDIT_NOTA', { pathParams: { id }, body }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);

export const deleteExercises = (id) =>
  apiRequest('DELETE_EXERCISE', { pathParams: { id }  }, EXERCISE_ENDPOINTS, EXERCISE_SERVICES);
