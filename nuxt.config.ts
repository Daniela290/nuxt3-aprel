// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";
import {fileURLToPath} from 'url';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    typescript: {
        typeCheck: true
    },

    devtools: {enabled: true},
    srcDir: './client',
    css: ['~/assets/scss/main.scss'],

    alias: {
        '@': fileURLToPath(new URL('./client', import.meta.url)),
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // additionalData: '@use "@/assets/scss/mixins.scss" as *;',
                    api: 'modern-compiler'
                    //чтобы работали scss переменные добавить - @use "@/assets/scss/variables.scss" as *;
                },
            },
        },

        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                },
            }
        },
    },

    devServer: {
        port: 3000,
        host: 'localhost'
    },
    modules: ['@pinia/nuxt'],
});