<template>
    <loading-wrapper class="viewing-product"
                     :loading="products.loading">
        <router-link to="/"
                     class="viewing-product__back">
            BACK
        </router-link>

        <product-view-haed class="viewing-product__head" :product="data"/>

        <product-view-body class="viewing-product__body" :product="data"/>
    </loading-wrapper>
</template>

<script setup lang="ts">
import ProductViewHaed from "@/components/pages/viewing/ProductViewHaed.vue";
import ProductViewBody from "@/components/pages/viewing/ProductViewBody.vue";
import type {Product} from "@/types/product";
import {productsStore} from "@/store/products";
import LoadingWrapper from "@/components/common/LoadingWrapper.vue";

const products = productsStore()

const route = useRoute()
const id: any = route.params.id

const {data, error, status} =
    await useAsyncData('product-data', () => products.getProductById(id), {
        lazy: true
    })
</script>

<style lang="scss" scoped>
.viewing-product {
  padding: 20px 0;
  position: relative;

  &__back {
    position: absolute;
    top: -30px;
    background: rgba($dark-light, .2);
    border-radius: $radius;
    padding: 2px 10px;
    left: 0;
    font-size: 13px;
    color: $dark;
    text-decoration: none;
  }

  @media (max-width: 1600px) {
    padding: 26px 0;
    &__back {
      top: -24px;
    }
  }
}
</style>