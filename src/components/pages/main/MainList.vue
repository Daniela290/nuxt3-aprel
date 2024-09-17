<template>
  <base-list class="main-list"
             :items="data">
      <template #item="{item, index}">
          <product-row :product="item" :index="index"/>
      </template>
  </base-list>
</template>

<script setup lang="ts">
import BaseList from "@/components/common/BaseList.vue";
import type {PropType} from "vue";
import type {Product} from "@/types/product";
import ProductRow from "@/components/common/ProductRow.vue";

const props = defineProps({
    data: {type: Array as PropType<Product[]>}
})
</script>