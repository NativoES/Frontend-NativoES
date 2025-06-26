export const EXERCISE_SERVICES = {
  CLASSES: process.env.NEXT_PUBLIC_API_SERVICE,
};

export const EXERCISE_ENDPOINTS = {
  // Imagen
  UPLOAD_IMAGE: {
    service: 'CLASSES',
    path: '/image',
    method: 'POST',
  },
  EDIT_IMAGE: {
    service: 'CLASSES',
    path: '/image/:id',
    method: 'PATCH',
  },

  // GIF
  UPLOAD_GIF: {
    service: 'CLASSES',
    path: '/gif',
    method: 'POST',
  },
  EDIT_GIF: {
    service: 'CLASSES',
    path: '/gif/:id',
    method: 'PATCH',
  },

  // Audio
  UPLOAD_AUDIO: {
    service: 'CLASSES',
    path: '/audio',
    method: 'POST',
  },
  EDIT_AUDIO: {
    service: 'CLASSES',
    path: '/audio/:id',
    method: 'PATCH',
  },

  // Video
  UPLOAD_VIDEO: {
    service: 'CLASSES',
    path: '/video',
    method: 'POST',
  },
  EDIT_VIDEO: {
    service: 'CLASSES',
    path: '/video/:id',
    method: 'PATCH',
  },

  // Imagen y Palabra
  IMAGEN_PALABRA: {
    service: 'CLASSES',
    path: '/imagen-palabra',
    method: 'POST',
  },
  EDIT_IMAGEN_PALABRA: {
    service: 'CLASSES',
    path: '/imagen-palabra/:id',
    method: 'PATCH',
  },

  // Completar texto
  COMPLETAR_TEXTO: {
    service: 'CLASSES',
    path: '/completar-texto',
    method: 'POST',
  },
  EDIT_COMPLETAR_TEXTO: {
    service: 'CLASSES',
    path: '/completar-texto/:id',
    method: 'PATCH',
  },

  // Ordenar texto
  ORDENAR_TEXTO: {
    service: 'CLASSES',
    path: '/ordenar-texto',
    method: 'POST',
  },
  EDIT_ORDENAR_TEXTO: {
    service: 'CLASSES',
    path: '/ordenar-texto/:id',
    method: 'PATCH',
  },

  // Nota texto
  NOTA_TEXTO: {
    service: 'CLASSES',
    path: '/nota-texto',
    method: 'POST',
  },
  EDIT_NOTA_TEXTO: {
    service: 'CLASSES',
    path: '/nota-texto/:id',
    method: 'PATCH',
  },

  // Llenar espacio
  LLENAR_ESPACIO: {
    service: 'CLASSES',
    path: '/llenar-espacio',
    method: 'POST',
  },
  EDIT_LLENAR_ESPACIO: {
    service: 'CLASSES',
    path: '/llenar-espacio/:id',
    method: 'PATCH',
  },

  // Selección palabra
  SELECCION_PALABRA: {
    service: 'CLASSES',
    path: '/seleccion-palabra',
    method: 'POST',
  },
  EDIT_SELECCION_PALABRA: {
    service: 'CLASSES',
    path: '/seleccion-palabra/:id',
    method: 'PATCH',
  },

  // Falso Verdadero
  FALSO_VERDADERO: {
    service: 'CLASSES',
    path: '/falso-verdadero',
    method: 'POST',
  },
  EDIT_FALSO_VERDADERO: {
    service: 'CLASSES',
    path: '/falso-verdadero/:id',
    method: 'PATCH',
  },

  // Relacionar palabra
  RELACIONAR_PALABRA: {
    service: 'CLASSES',
    path: '/relacionar-palabra',
    method: 'POST',
  },
  EDIT_RELACIONAR_PALABRA: {
    service: 'CLASSES',
    path: '/relacionar-palabra/:id',
    method: 'PATCH',
  },

  // Formar palabra
  FORMAR_PALABRA: {
    service: 'CLASSES',
    path: '/formar-palabra',
    method: 'POST',
  },
  EDIT_FORMAR_PALABRA: {
    service: 'CLASSES',
    path: '/formar-palabra/:id',
    method: 'PATCH',
  },

  // Ordenar palabra
  ORDENAR_PALABRA: {
    service: 'CLASSES',
    path: '/ordenar-palabra',
    method: 'POST',
  },
  EDIT_ORDENAR_PALABRA: {
    service: 'CLASSES',
    path: '/ordenar-palabra/:id',
    method: 'PATCH',
  },

  // Enlace externo
  ENLACE_EXTERNO: {
    service: 'CLASSES',
    path: '/enlace-externo',
    method: 'POST',
  },
  EDIT_ENLACE_EXTERNO: {
    service: 'CLASSES',
    path: '/enlace-externo/:id',
    method: 'PATCH',
  },

  // Nota
  NOTA: {
    service: 'CLASSES',
    path: '/nota',
    method: 'POST',
  },
  EDIT_NOTA: {
    service: 'CLASSES',
    path: '/nota/:id',
    method: 'PATCH',
  },

  DELETE_EXERCISE: {
    service: 'CLASSES',
    path: '/ejercicios/:id',
    method: 'DELETE',
  },

  GET_EXERCISE: {
    service: 'CLASSES',
    path: '/ejercicios/:id',
    method: 'GET',
  },

  GET_PUBLIC_EXERCISE: {
    service: 'CLASSES',
    path: '/ejercicios/public-exercise',
    method: 'GET',
  },
};
