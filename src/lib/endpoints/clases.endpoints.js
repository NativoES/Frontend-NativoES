export const CLASSES_SERVICES = {
  CLASSES: process.env.NEXT_PUBLIC_API_SERVICE,
};

export const CLASSES_ENDPOINTS = {
  REGISTER_CLASS: {
    service: "CLASSES",
    path: "/classes",
    method: "POST",
  },

  GET_CLASSES: {
    service: "CLASSES",
    path: "/classes",
    method: "GET",
  },

  GET_CLASS_BY_ID: {
    service: "CLASSES",
    path: "/classes/ejercicios/:id",
    method: "GET",
  },

  UPDATE_CLASS: {
    service: "CLASSES",
    path: "/classes/:id",
    method: "PATCH",
  },

  DELETE_CLASS: {
    service: "CLASSES",
    path: "/classes/:id",
    method: "DELETE",
  },
};
