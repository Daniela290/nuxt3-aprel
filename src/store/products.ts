import {defineStore} from 'pinia'
import {ApiResponse} from "~/types/products";

export const productsStore = defineStore('products', {
    state: () => ({
        pagination: {
            page: 1,
            limit: 3,
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
                this.pagination.limit = resp.data.limit
                return resp.data
            } catch (e) {
                console.log(e)
                throw e
            } finally {
                this.loading = false
            }
        }
    }
})