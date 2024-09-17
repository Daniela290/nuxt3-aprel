<template>
    <div class="main-page">
        <div class="main-page__head">
            <data-display-switch v-model="display"/>
        </div>

        <component :is="dataComponent"
                   :data="filteredData"/>
    </div>
</template>

<script setup lang="ts">
import MainGrid from "@/components/pages/main/MainGrid.vue";
import type {ApiResponse} from "@/types/products";
import DataDisplaySwitch from "@/components/common/DataDisplaySwitch.vue";
import {convertProductToSearchProduct} from "@/types/product";
import type {Product} from "@/types/product";
import {searchStore} from "@/store/search";
import MainList from "@/components/pages/main/MainList.vue";

const {data}: { data: { value: ApiResponse } } = useFetch('https://dummyjson.com/products?limit=15')
const display = ref('list')
const dataComponent = computed<string>(() => {
    return display.value === 'list' ? MainList : MainGrid
})

const filteredData = computed(() => {
    if (data?.value?.products?.length) {
        const result: Product[] = []
        data.value.products.forEach((nativeProduct: Product) => {
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

<style lang="scss" scoped>
.main-page {
  //max-width: 1200px;
  &__head {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 30px;
  }

  @media (max-width: 1600px) {
    &__head {
      padding-bottom: 20px;
    }
  }
}
</style>