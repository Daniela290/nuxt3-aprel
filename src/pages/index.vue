<template>
    <div class="main-page">
        <base-grid :items="filteredData">
            <template #item="{item}">
                <product-card :product="item"/>
            </template>
        </base-grid>
    </div>
</template>

<script setup lang="ts">
import BaseGrid from "@/components/common/BaseGrid.vue";
import type {Product} from "@/types/product";
import ProductCard from "@/components/common/ProductCard.vue";
import {searchStore} from "~/store/search";
import {convertProductToSearchProduct} from "@/types/product";

const {data} = useFetch('https://dummyjson.com/products?limit=5')

const filteredData = computed(() => {
    if (data?.value?.products?.length) {
        const result: Product[] = []
        data.value.products.forEach((nativeProduct: Product) => {
            const product = convertProductToSearchProduct(nativeProduct)
            // console.log(product)
            const values = Object.values(product)

            if (searchByPrimitiveValue(values)) {
                result.push(nativeProduct)
                return
            }
        })
        // console.log(result)
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

onMounted(() => {
    // console.log(data?.value?.products?.[0])
    // console.log(filteredData.value)
})
</script>

<style lang="scss" scoped>
.main-page {
  //max-width: 1200px;
}
</style>