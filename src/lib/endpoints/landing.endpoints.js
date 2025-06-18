export const LANDING_SERVICES = {
    LANDING: process.env.NEXT_PUBLIC_API_NATIVOES,
};

export const LANDING_ENDPOINTS = {
    REGISTER_HERO: {
        service: "LANDING",
        path: "/hero",
        method: "POST",
    },

    UPDATE_HERO: {
        service: "LANDING",
        path: "/hero/:id",
        method: "PATCH",
    },

    GET_HERO: {
        service: "LANDING",
        path: "/hero",
        method: "GET",
    },

    //   Form Study
    REGISTER_FORM_STUDY: {
        service: "LANDING",
        path: "/form-study",
        method: "POST",
    },

    UPDATE_FORM_STUDY: {
        service: "LANDING",
        path: "/form-study/:id",
        method: "PATCH",
    },
    
    GET_FORM_STUDY: {
        service: "LANDING",
        path: "/form-study",
        method: "GET",
    },
    
    DELETE_FORM_STUDY: {
        service: "LANDING",
        path: "/form-study/:id",
        method: "DELETE",
    },

    //   teachers
    REGISTER_TEACHER: {
        service: "LANDING",
        path: "/teacher",
        method: "POST",
    },

    UPDATE_TEACHER: {
        service: "LANDING",
        path: "/teacher/:id",
        method: "PATCH",
    },
    
    GET_TEACHER: {
        service: "LANDING",
        path: "/teacher",
        method: "GET",
    },
    
    DELETE_TEACHER: {
        service: "LANDING",
        path: "/teacher/:id",
        method: "DELETE",
    },
};
