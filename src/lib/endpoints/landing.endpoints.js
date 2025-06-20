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

    //   characteristic
    REGISTER_CHARACTERISTIC: {
        service: "LANDING",
        path: "/characteristic",
        method: "POST",
    },

    UPDATE_CHARACTERISTIC: {
        service: "LANDING",
        path: "/characteristic/:id",
        method: "PATCH",
    },
    
    GET_CHARACTERISTIC: {
        service: "LANDING",
        path: "/characteristic",
        method: "GET",
    },
    
    DELETE_CHARACTERISTIC: {
        service: "LANDING",
        path: "/characteristic/:id",
        method: "DELETE",
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
    
    //   teachers
    REGISTER_METHOD_COURSE: {
        service: "LANDING",
        path: "/method-course",
        method: "POST",
    },

    UPDATE_METHOD_COURSE: {
        service: "LANDING",
        path: "/method-course/:id",
        method: "PATCH",
    },
    
    GET_METHOD_COURSE: {
        service: "LANDING",
        path: "/method-course",
        method: "GET",
    },
    
    DELETE_METHOD_COURSE: {
        service: "LANDING",
        path: "/method-course/:id",
        method: "DELETE",
    },

    //   planes
    REGISTER_PRICE: {
        service: "LANDING",
        path: "/plan",
        method: "POST",
    },

    UPDATE_PRICE: {
        service: "LANDING",
        path: "/plan/:id",
        method: "PATCH",
    },
    
    GET_PRICE: {
        service: "LANDING",
        path: "/plan",
        method: "GET",
    },
    
    DELETE_PRICE: {
        service: "LANDING",
        path: "/plan/:id",
        method: "DELETE",
    },

    //   contact
    REGISTER_CONTACT: {
        service: "LANDING",
        path: "/information",
        method: "POST",
    },

    UPDATE_CONTACT: {
        service: "LANDING",
        path: "/information/:id",
        method: "PATCH",
    },
    
    GET_CONTACT: {
        service: "LANDING",
        path: "/information",
        method: "GET",
    },
    
    DELETE_CONTACT: {
        service: "LANDING",
        path: "/information/:id",
        method: "DELETE",
    },

    //   review
    REGISTER_REVIEW: {
        service: "LANDING",
        path: "/review",
        method: "POST",
    },

    UPDATE_REVIEW: {
        service: "LANDING",
        path: "/review/:id",
        method: "PATCH",
    },
    
    GET_REVIEW: {
        service: "LANDING",
        path: "/review",
        method: "GET",
    },
    
    DELETE_REVIEW: {
        service: "LANDING",
        path: "/review/:id",
        method: "DELETE",
    },
};
