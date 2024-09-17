<template>
    <div class="main-page">
        <div class="main-page__head">
            <data-display-switch v-model="display"/>
        </div>

        <div class="main-page__content">
            <component v-if="status !== 'error'"
                       :is="dataComponent"
                       :data="filteredData"/>

            <span v-else>Error</span>
        </div>

        <base-pagination v-if="status !== 'error'"
                         class="main-page__pagination"
                         :page="products.pagination.page"
                         :limit="products.pagination.limit"
                         :total="54"
                         @change-limit="(e)=>products.pagination.limit = e"
                         @change-page="(e)=>products.pagination.page = e"/>
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
import BasePagination from "~/components/common/pagination/BasePagination.vue";
import {productsStore} from "@/store/products";

const products = productsStore()

const {data, error, status}: { data: { value: ApiResponse }, status: string, error: any } =
    await useAsyncData('products', () => products.getProducts(), {
        watch: [() => products.pagination.limit, () => products.pagination.page]
    })

const display = ref('grid')
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