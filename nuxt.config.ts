// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "url";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    srcDir: './src',
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    css: ["@/assets/scss/index.scss"],
    app: {
        head: {
            title: 'Test',
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, interactive-widget=resizes-content, minimal-ui'
                },
                // {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                // {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
            ],
            link: [
                {rel: 'icon', type: 'image/x-ico', href: '/logo.ico', sizes: 'any'}
            ],
        },
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'opacity', mode: 'out-in'}
    },
    modules: [
        '@pinia/nuxt',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/vars.scss" as *;'
                }
            }
        },
        server: {
            port: 3000,
            host: process.env.DEV_API_HOST,
        }
    }
})