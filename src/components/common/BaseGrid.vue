<template>
    <div class="base-grid">
        <div class="base-grid__grid">
            <div v-for="(item, index) in items"
                 class="base-grid__item">
                <slot name="item" :item="item"
                      :index="index"></slot>
            </div>
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
.base-grid {
  container-type: inline-size;
  container-name: sidebar;
  width: 100%;

  &__grid {
    display: grid;
    gap: 50px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

@container sidebar (max-width:1460px) {
  &__grid {
    gap: 20px 30px;
  }
}
@container sidebar (max-width:1230px) {
    &__grid {
        gap: 26px 16px;
    }
}
@container sidebar (max-width:1070px) {
  &__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@container sidebar (max-width:890px) {
  &__grid {
    gap: 20px 10px;
  }

  &__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@container sidebar (max-width:600px) {

  &__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@container sidebar (max-width:360px) {
    &__grid {
        gap: 14px 6px;
    }}
}
</style>