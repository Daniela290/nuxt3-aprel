// import type {$Fetch} from "nitropack";
export default defineNuxtPlugin((nuxtApp) => {
    // const { session } = useUserSession()

    const api = $fetch.create({
        baseURL: 'http://localhost:3000/api',
        // onRequest({ request, options, error }) {
        //     // if (session.value?.token) {
        //     //     // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        //     //     options.headers.set('Authorization', `Bearer ${session.value?.token}`)
        //     // }
        // },
        async onResponseError({response}: { response: unknown }) {
            console.log('ERROR ', response)
            // if (response.status === 401) {
            //     // await nuxtApp.runWithContext(() => navigateTo('/login'))
            // }
        }
    })

    return {
        provide: {
            api
        }
    }
})
