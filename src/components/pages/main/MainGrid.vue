<template>
    <base-grid :items="data">
        <template #item="{item}">
            <product-card :product="item"/>
        </template>
    </base-grid>
</template>

<script setup lang="ts">
import BaseGrid from "@/components/common/BaseGrid.vue";
import ProductCard from "@/components/common/ProductCard.vue";
import type {PropType} from "vue";
import type {Product} from "@/types/product";

const props = defineProps({
    data: {type: Array as PropType<Product[]>}
})
</script>