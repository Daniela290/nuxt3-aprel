import type {Ref} from "@vue/reactivity";
import type {AsyncDataOptions} from "#app";
import type {DefaultAsyncData} from "@nuxt/types/app/vue";

export type PostId = string | number

export interface PostForm {
    text?: string,
    title?: string,
    description?: string
}

export interface Post extends PostForm {
    _id: PostId,
    createdAt: string | Date,
    updatedAt: string | Date
}

export interface ApiPostsI {
    data: Ref<Post[]>
}

export interface ApiPostI {
    data: Ref<Post>,
    status: Ref<string>,
    clear: Function
}

