export const USER_SERVICES = {
  AUTH: process.env.NEXT_PUBLIC_API_USERS,
};

export const USER_ENDPOINTS = {
  LOGIN: {
    service: "AUTH",
    path: "/auth/login",
    method: "POST",
  },

  GET_USER_PROFILE: {
    service: "AUTH",
    path: "/user/profile",
    method: "GET",
  },

  GET_ALL_USERS: {
    service: 'AUTH',
    path: '/user',
    method: 'GET',
  },

  // enrollments seccion

  GET_ALL_STUDENTS: {
    service: "AUTH",
    path: "/user/userSpecific",
    method: "GET",
  },

  GET_ENROLLED_STUDENTS: {
    service: "AUTH",
    path: "/enrollment/students",
    method: "GET",
  },

  CREATE_ENROLLMENT: {
    service: "AUTH",
    path: "/enrollment",
    method: "POST",
  },
};
