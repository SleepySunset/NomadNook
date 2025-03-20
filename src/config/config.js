// const API_BASE_URL_AWS = "http://nomadnook-env-1.eba-k2m2rsbd.us-east-1.elasticbeanstalk.com";
// const API_BASE_URL_RAILWAY = "https://nomadnook-nomadnook.up.railway.app";
const API_BASE_URL_CLOUDFRONT = "https://d27f1re7xc3m2a.cloudfront.net";

export const API_BASE_URL = API_BASE_URL_CLOUDFRONT;

export const ENDPOINTS = {
    // ALOJAMIENTOS
    GET_ALL_CABINS: `${API_BASE_URL}/api/alojamientos/listarTodos`,
    GET_CABIN_BY_ID: `${API_BASE_URL}/api/alojamientos/buscar`,
    ADD_CABIN: `${API_BASE_URL}/api/alojamientos/guardar`,
    DELETE_CABIN: `${API_BASE_URL}/api/alojamientos/eliminar`,
    UPDATE_CABIN: `${API_BASE_URL}/api/alojamientos/actualizar`,

    // CATEGORIAS
    GET_ALL_CATEGORIES: `${API_BASE_URL}/api/categorias/listarTodos`,

    // CARACTERISTICAS
    GET_ALL_FEATURES: `${API_BASE_URL}/api/caracteristicas/listarTodos`,
    GET_CABIN_FEATURES: `${API_BASE_URL}/api/caracteristicas/buscar/alojamiento`,
    ADD_FEATURE: `${API_BASE_URL}/api/caracteristicas/guardar`,
    DELETE_FEATURE: `${API_BASE_URL}/api/caracteristicas/eliminar`,
    UPDATE_FEATURE: `${API_BASE_URL}/api/caracteristicas/actualizar`,

    // USUARIOS
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GET_ALL_USERS: `${API_BASE_URL}/api/usuarios/listarTodos`,
    ADD_ADMIN_ROLE: `${API_BASE_URL}/api/usuarios/asignar-admin`,
    REMOVE_ADMIN_ROLE: `${API_BASE_URL}/api/usuarios/desasignar-admin`,

    //IMAGENES
    DELETE_IMAGE: `${API_BASE_URL}/api/imagenes/eliminar`
}; 