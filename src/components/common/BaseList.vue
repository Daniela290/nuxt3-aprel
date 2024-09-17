<template>
    <div class="base-list">
        <div v-for="(item, index) in items"
             class="base-list__item">
            <slot name="item" :item="item"
                  :index="index"></slot>

            <div v-if="index !== items.length - 1"
                 class="base-list__separator"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import type {Product} from "@/types/product";

const props = defineProps({
    items: {type: Array as PropType<Product[]>, default: () => ([])}
})
</script>

<style lang="scss" scoped>
.base-list {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__item {
    width: 100%;
    position: relative;
  }

  &__separator {
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -20px;
    background: $main;
  }

  @media (max-width: 1460px) {
    gap: 30px;
    &__separator {
      bottom: -15px;
    }
  }
  @media (max-width: 1230px) {
    gap: 26px;
    &__separator {
      bottom: -13px;
    }
  }
  @media (max-width: 890px) {
    gap: 20px;
    &__separator {
      bottom: -10px;
    }
  }
  @media (max-width: 360px) {
    gap: 14px;
    &__separator {
      bottom: -7px;
    }
  }
}
</style>