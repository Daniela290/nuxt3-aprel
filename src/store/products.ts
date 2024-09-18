import {defineStore} from 'pinia'
import {ApiResponse} from "@/types/products";

export const productsStore = defineStore('products', {
    state: () => ({
        pagination: {
            page: 1,
            limit: 10,
            total: 1000,
        },
        loading: false
    }),

    actions: {
        async getProducts() {
            const {$api} = useNuxtApp()

            this.loading = true
            try {
                const resp: { data: ApiResponse } = await $api.get('products', {
                    params: {
                        limit: this.pagination.limit,
                        skip: (this.pagination.page - 1) * this.pagination.limit
                    }
                })

                this.pagination.total = resp.data.total
                return resp.data
            } catch (e) {
                console.log(e)
                throw e
            } finally {
                this.loading = false
            }
        },

        async getProductById(id: number | string) {
            const {$api} = useNuxtApp()

            this.loading = true
            try {
                const resp: { data: ApiResponse } = await $api.get(`products/${id}`)

                return resp.data
            } catch (e) {
                throw e
            } finally {
                this.loading = false
            }
        }
    }
})