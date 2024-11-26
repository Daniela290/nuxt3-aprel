import {usePosts} from "~/stores/posts";
import type {NuxtAppOptions} from "@nuxt/types";

export default defineNuxtPlugin(async (nuxtApp: NuxtAppOptions) => {
    const postsStore = usePosts(nuxtApp.$pinia)
    useAsyncData('posts', () => postsStore.getAll())
})