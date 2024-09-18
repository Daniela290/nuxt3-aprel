<template>
    <div class="viewing-head">
        <h6 class="viewing-head__barcode">{{ product?.meta?.barcode }}</h6>
        <h1 class="viewing-head__title">{{ product?.title }}</h1>
        <div v-if="product?.images?.length"
            class="viewing-head__images">
            <div v-for="img in product?.images?.slice(0, 4)">
                <img :src="img"/>
            </div>
        </div>

        <h3 class="viewing-head__brand">{{ product?.brand }}</h3>
        <div class="viewing-head__price">{{ product?.price }} $</div>
        <product-property-row class="viewing-head__row">
            <template #label>Rating</template>
            <template #value>
                <base-rating style="width:fit-content; margin-left:auto"
                             :rating="product?.rating"/>
            </template>
        </product-property-row>
        <product-property-row class="viewing-head__row">
            <template #label>Weight</template>
            <template #value>{{ product?.weight }}</template>
        </product-property-row>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {Product} from "@/types/product";
import ProductPropertyRow from "~/components/pages/viewing/ProductPropertyRow.vue";
import BaseRating from "~/components/common/BaseRating.vue";

const props = defineProps({
    product: {type: Object as PropType<Product>,}
})
</script>

<style lang="scss" scoped>
.viewing-head {
  position: relative;

  &__title {
    margin: 0 0 10px;
    line-height: 110%;
    padding: 0;
    font-size: 28px;
    font-weight: 800;
  }

  &__brand {
    margin: 0 0 6px;
    line-height: 110%;
    padding: 0;
    font-size: 22px;
    font-style: italic;
    font-weight: 600;
  }

  &__price {
    margin: 0 0 10px;
    padding: 0;
    line-height: 110%;
    font-size: 18px;
    font-weight: 600;
    text-align: right;
  }

  &__images {
    display: flex;
    height: 250px;
    gap: 30px;
    margin-bottom: 10px;
    justify-content: space-between;

    > div {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 30%;

      > img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }

  &__barcode {
    position: absolute;
    top: -16px;
    right: 0;
    margin: 0;
    line-height: 110%;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }
}
</style>