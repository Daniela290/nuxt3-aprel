<template>
    <div class="product-row">
        <div class="product-row__index">{{ index + 1 }}</div>
        <div class="product-row__image">
            <base-rating class="product-row__rating"
                         :rating="product?.rating"/>
            <img :src="product?.images?.[0]"
                 alt="">
        </div>
        <div class="product-row__col product-row__col--main">
            <h5 class="product-row__title" v-html="title"></h5>
            <div class="product-row__brand">{{ product.brand }}</div>
        </div>

        <div class="product-row__col">
            <div class="product-row__barcode">
                {{ product.meta.barcode }}
            </div>
        </div>

        <div class="product-row__col">
            <div class="product-row__tags">
                <span v-for="tag in product?.tags">#{{ tag }}</span>
            </div>
        </div>

        <div class="product-row__col product-row__col--price">
            <div class="product-row__price">{{ product.price }} $</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from 'vue';
import type {Product} from "@/types/product";
import BaseRating from "@/components/common/BaseRating.vue";
import {searchStore} from "~/store/search";

const props = defineProps({
    product: {type: Object as PropType<Product>},
    index: {type: Number, default: 0}
})
console.log(props.product)

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
.product-row {
  padding: 0 0 10px;
  display: flex;
  gap: 20px;

  &__index {
    min-height: 100%;
    width: 90px;
    min-width: 90px;
    border-radius: $radius;
    background: rgba($main, .04);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: $main;
  }

  &__image {
    height: 200px;
    width: 200px;
    min-width: 200px;
    position: relative;

    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__title {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: 600;
    color: $main-hover;

    > :deep(span) {
      color: rgba($main-hover, .62);
    }
  }

  &__col {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 10px 0;
    flex-basis: 20%;

    &--main {
      flex-basis: 46%;
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
      font-size: 14px;
      font-style: italic;
    }
  }

  &__barcode {
    font-size: 16px;
    font-weight: 600;
    margin-top: 6px;
  }

  &__brand {
    font-size: 16px;
    font-style: italic;
  }

  &__rating {
    position: absolute;
    left: 8px;
    top: 5px;
    z-index: 1;
  }

  &__price {
    font-weight: 800;
    font-size: 20px;
    color: $dark-light;
    text-align: right;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 1500px) {
    gap: 16px;
    &__title {
      font-size: 20px;
      margin-bottom: 6px;
    }
    &__index {
      width: 70px;
      min-width: 70px;
      font-size: 16px
    }
    &__price {
      font-size: 18px;
    }
    &__image {
      height: 150px;
      width: 150px;
      min-width: 150px;
    }
  }

  @media (max-width: 1200px) {
    &__index {
      position: absolute;
      min-width: 0;
      min-height: 0;
      width: 60px;
      height: 30px;
      left: 0;
      border-radius: 30% 0;
      font-size: 14px;
      font-weight: 500;
      bottom: 0;
    }
    &__price {
      font-size: 16px;
      font-weight: 600;
    }
  }
  @media (max-width: 740px) {
    flex-direction: column;
    gap: 0;
    padding: 0 80px 10px 150px;
    &__image {
      position: absolute;
      left: 0;
      top: 0;
      height: 130px;
      width: 130px;
      min-width: 0;
    }
    &__col {
      padding: 0;
    }
    &__barcode {
      font-size: 14px;
    }
    &__title {
      font-size: 16px;
    }
    &__price {
      font-size: 16px;
    }
    &__tags {
      margin-top: 10px;

      > span {
        font-size: 12px;
      }
    }
    &__col--price {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%)
    }
  }
  @media (max-width: 380px) {
    flex-direction: column;
    gap: 0;
    padding: 0 80px 10px 110px;
    &__image {
      position: absolute;
      left: 0;
      top: 0;
      height: 100px;
      width: 100px;
    }
    &__title {
      line-height: 110%;
      margin-bottom: 2px;
    }
    &__barcode {
      font-size: 12px;
    }
  }
}
</style>