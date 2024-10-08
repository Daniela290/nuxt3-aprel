<template>
    <div class="main-page">
        <div class="main-page__head">
            <data-display-switch v-model="display"/>
        </div>

        <loading-wrapper :loading="products.loading">
            <div class="main-page__content">
                <div v-if="status === 'error'"
                     class="main-page__error">Error
                </div>
                <div v-else-if="!filteredData?.length"
                     class="main-page__empty">
                    No results
                </div>
                <component v-else
                           :is="dataComponent"
                           :data="filteredData"/>
            </div>

            <base-pagination v-if="status !== 'error'"
                             class="main-page__pagination"
                             :page="products.pagination.page"
                             :limit="products.pagination.limit"
                             :total="products.pagination.total"
                             @change="changePaginationHandler"/>
        </loading-wrapper>
    </div>
</template>

<script setup lang="ts">
import MainGrid from "@/components/pages/main/MainGrid.vue";
import type {ApiResponse} from "@/types/products";
import DataDisplaySwitch from "@/components/common/DataDisplaySwitch.vue";
import {convertProductToSearchProduct} from "@/types/product";
import type {Product} from "@/types/product";
import MainList from "@/components/pages/main/MainList.vue";
import BasePagination from "@/components/common/pagination/BasePagination.vue";
import {productsStore} from "@/store/products";
import {searchByPrimitiveValue} from "@/components/pages/main/products-sorting";
import type {Pagination} from "@/components/common/pagination/pagination.types";
import LoadingWrapper from "@/components/common/LoadingWrapper.vue";

const products = productsStore()

const {data, error, status} =
    await useAsyncData('products', () => products.getProducts(), {
        watch: [() => products.pagination],
        lazy: true
    })

const display = ref('grid')
const dataComponent = computed<string>(() => {
    return display.value === 'list' ? MainList : MainGrid
})

function changePaginationHandler(e: Pagination) {
    products.pagination = {...products.pagination, ...e}
}

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
</script>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  :deep(.loading-wrapper) {
    display: flex;
    flex-direction: column;
  }

  //max-width: 1200px;
  &__content, .loading-wrapper {
    flex-grow: 1;
  }

  &__content {
    margin-bottom: 30px;
  }

  &__head {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 30px;
  }

  &__empty {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    font-style: italic;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1600px) {
    &__head {
      padding-bottom: 20px;
    }
  }
}
</style>