import type {PiniaPluginContext} from 'pinia'
import type {NuxtAppOptions} from "@nuxt/types";
import type {$Fetch} from "nitropack";

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $customApi: $Fetch
    }
}

export default defineNuxtPlugin(({$pinia}: NuxtAppOptions) => {
    const {$api} = useNuxtApp()
    $pinia.use((): { $customApi: $Fetch } => {
        return {
            $customApi: $api
        }
    })
})