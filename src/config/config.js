const API_BASE_URL_AWS = "nomadnook-env-1.eba-k2m2rsbd.us-east-1.elasticbeanstalk.com";
const API_BASE_URL_RAILWAY = "https://nomadnook-nomadnook.up.railway.app";
export const API_BASE_URL = API_BASE_URL_RAILWAY;

export const ENDPOINTS = {
    // ALOJAMIENTOS
    GET_ALL_CABINS: `${API_BASE_URL}/api/alojamientos/listarTodos`,
    GET_CABIN_BY_ID: `${API_BASE_URL}/api/alojamientos/buscar`,
    ADD_CABIN: `${API_BASE_URL}/api/alojamientos/guardar`,

    // CATEGORIAS
    GET_ALL_CATEGORIES: `${API_BASE_URL}/api/categorias/listarTodas`,

    // USUARIOS
    LOGIN: `${API_BASE_URL}/api/usuarios/login`,
    REGISTER: `${API_BASE_URL}/api/usuarios/registrar`,
    GET_ALL_USERS: `${API_BASE_URL}/api/usuarios/listarTodos`,
}; 