<template>
    <div class="product-card">
        <div class="product-card__head">
            <base-rating class="product-card__rating"
                         :rating="product?.rating"/>
            <img class="product-card__img"
                 :src="product?.images?.[0]"
                 alt="">

            <div class="product-card__price">{{ product.price }} $</div>
        </div>
        <div class="product-card__body">
            <h6 class="product-card__title" v-html="title"></h6>
            <div class="product-card__brand">{{ product.brand }}</div>
        </div>
        <div class="product-card__tags">
            <span v-for="tag in product?.tags">#{{ tag }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from 'vue';
import type {Product} from "@/types/product";
import BaseRating from "@/components/common/BaseRating.vue";
import {searchStore} from "~/store/search";

const props = defineProps({
    product: {type: Object as PropType<Product>}
})

const title = computed(() => {
    if (searchStore().search) {
        return props.product.title
            .replaceAll(
                new RegExp(searchStore().search, 'gi'),
                (e) => `<span>${e}</span>`
            )
    }
    return props.product.title
})
</script>

<style lang="scss" scoped>
.product-card {
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px 2px rgba($main-focus, .08);
  border-radius: $radius;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__head {
    height: 200px;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
  }

  &__img {
    position: absolute;
    inset: 0;
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }

  &__body {
    flex-grow: 1;
    padding: 10px 0 0;
    border-top: 1px solid rgba($dark-light, .1);
  }

  &__title {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 600;
    line-height: 110%;
    color: $main-hover;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    > :deep(span) {
      color: rgba($main-hover, .62);
    }
  }

  &__tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;

    > span {
      display: block;
      background: rgba($main, .1);
      border-radius: $radius;
      padding: 2px 6px;
      font-size: 12px;
      font-style: italic;
    }
  }

  &__price {
    position: absolute;
    bottom: 6px;
    max-width: calc(100% - 30px);
    background: rgba($dark-light, .5);
    font-weight: 600;
    font-size: 16px;
    border-radius: $radius;
    padding: 2px 12px;
    color: #fff;
  }

  &__brand {
    font-size: 16px;
    font-style: italic;
    margin-bottom: 5px;
  }

  &__rating {
    position: absolute;
    right: 8px;
    top: 5px;
    z-index: 1;
  }

  @media (max-width: 1500px) {
    padding: 15px;
    &__head {
      height: 160px;
    }
  }
  @media (max-width: 600px) {
    padding: 10px;
    &__head {
      height: 140px;
    }
    &__title {
      font-size: 14px;
    }
    &__brand {
      font-size: 14px;
    }
    &__price {
      font-size: 14px;
    }
  }
}
</style>