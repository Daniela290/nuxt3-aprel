<template>
    <base-grid :items="filteredData">
        <template #item="{item}">
            <product-card :product="item"/>
        </template>
    </base-grid>
</template>

<script setup lang="ts">
import BaseGrid from "@/components/common/BaseGrid.vue";
import ProductCard from "@/components/common/ProductCard.vue";
import type {PropType} from "vue";
import {convertProductToSearchProduct} from "@/types/product";
import type {Product} from "@/types/product";
import {searchStore} from "~/store/search";
import type {ApiResponse} from "~/types/products";

const props = defineProps({
    data: {type: Object as PropType<ApiResponse>}
})

const filteredData = computed(() => {
    if (props.data?.products?.length) {
        const result: Product[] = []
        props.data.products.forEach((nativeProduct: Product) => {
            const product = convertProductToSearchProduct(nativeProduct)
            const values = Object.values(product)

            if (searchByPrimitiveValue(values)) {
                result.push(nativeProduct)
                return
            }
        })
        return result
    }
    return []
})

function searchByPrimitiveValue(value: any) {
    if (typeof value === 'string' || typeof value === 'number') {
        if (value.toString().toLowerCase()
            .includes(searchStore().search?.toLowerCase())) {
            return true
        }
        return false
    } else if (Array.isArray(value)) {
        for (let arrEl of value) {
            if (searchByPrimitiveValue(arrEl)) return true
        }
    } else if (typeof value === 'object') {
        const valueValues = Object.values(value)
        for (let childValue of valueValues) {
            if (searchByPrimitiveValue(childValue)) return true
        }
    }
}
</script>