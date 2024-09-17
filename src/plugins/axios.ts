import axios from "axios";
// import type { AxiosStatic} from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    // const defaultUrl = process.env.BASE_API_URL;
    const config = useRuntimeConfig()
    const api = axios.create({
        baseURL:'https://dummyjson.com/'
    });

    nuxtApp.provide('api', api);
});