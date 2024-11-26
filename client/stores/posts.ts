import {useAPI} from "~/composables/useApi";
import {defineStore} from 'pinia'
import type {ApiPostI, Post, PostForm, PostId} from "~/types/posts";

interface StateI {
    posts: Post[]
}

export const usePosts = defineStore('posts', {
    state: (): StateI => ({
        posts: [],
    }),

    actions: {
        async getAll(): Promise<Post[]> {
            try {
                const data: Post[] = await this.$customApi('/posts')
                this.posts = data
                return data
            } catch (e) {
                throw e
            }
        },
        getPostById(id: PostId): Promise<void> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // return this.$customApi(`/posts/${id}`)
                    resolve(this.$customApi(`/posts/${id}`))
                }, 2900)
            })
            // return this.$customApi(`/posts/${id}`)
        },
        async deletePost(id: PostId): Promise<void> {
            try {
                await this.$customApi(`/posts/${id}`, {
                    method: 'DELETE'
                })
                const index = this.posts.findIndex(el => el._id === id)
                if (index !== -1) this.posts.splice(index, 1)
            } catch (e) {
                throw e
            }
        },
        async addPost(payload: PostForm): Promise<Post> {
            try {
                const resp: Post = await this.$customApi('/add-post', {
                    method: 'POST',
                    body: payload
                })
                console.log('RESPONSE ', resp)
                return resp
            } catch (e) {
                throw e
            }
        },
        async updatePost(payload: PostForm, id: PostId): Promise<Post> {
            try {
                const resp: Post = await this.$customApi(`/posts/edit/${id}`, {
                    method: 'PUT',
                    body: payload
                })
                const index = this.posts.findIndex(el => el._id === id)
                if (index !== -1) {
                    this.posts[index] = resp
                }
                return resp
            } catch (e) {
                throw e
            }
        }
    }
})