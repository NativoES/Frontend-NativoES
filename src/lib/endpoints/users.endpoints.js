export const SERVICES = {
  AUTH: process.env.NEXT_PUBLIC_API_USERS,
};

export const ENDPOINTS = {
  LOGIN: {
    service: "AUTH",
    path: "/auth/login",
    method: "POST",
  },
};
