import axios from "axios";

const URL = import.meta.env.VITE_API_URL;
const APIKEY = import.meta.env.VITE_LLAMA_API_KEY;

export const llamaApi = axios.create({
    baseURL: URL,
    headers: {
        'Authorization' : `Bearer ${APIKEY}`,
        'Content-Type' : 'application/json'
    }
})