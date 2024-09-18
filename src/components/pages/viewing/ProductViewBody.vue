<template>
    <div class="viewing-body">
        <h6>Description</h6>
        <p class="viewing-body__text">{{ product?.description }}</p>
        <h6>Warranty Information</h6>
        <p class="viewing-body__text">{{ product?.warrantyInformation }}</p>
        <h6>Shipping Information</h6>
        <p class="viewing-body__text">{{ product?.shippingInformation }}</p>

        <template v-if="product?.dimensions">
            <h6>Dimensions</h6>
            <product-property-row v-for="key of Object.keys(product?.dimensions)">
                <template #label>{{ key[0].toUpperCase() }}{{ key.slice(1, key.length) }}</template>
                <template #value>{{ product.dimensions[key] }}</template>
            </product-property-row>
        </template>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {Product} from "@/types/product";
import ProductPropertyRow from "@/components/pages/viewing/ProductPropertyRow.vue";

const props = defineProps({
    product: {type: Object as PropType<Product>,}
})
</script>

<style lang="scss" scoped>
.viewing-body {
  padding-top: 30px;

  &__text {
    font-size: 16px;
    margin: 0 0 10px;
    font-weight: 300;
    white-space: break-spaces;
  }

  h6 {
    font-size: 18px;
    font-weight: 600;
    line-height: 110%;
    margin: 15px 0 8px;
  }
}
</style>