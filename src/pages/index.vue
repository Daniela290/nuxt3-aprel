<template>
    <div class="main-page">
        <main-grid :data="data"/>
    </div>
</template>

<script setup lang="ts">
import MainGrid from "~/components/pages/main/MainGrid.vue";
import type {ApiResponse} from "~/types/products";

const {data}: { data: ApiResponse } = useFetch('https://dummyjson.com/products?limit=15')

onMounted(() => {
    // console.log(data?.value)
    // console.log(filteredData.value)
})
</script>

<style lang="scss" scoped>
.main-page {
  //max-width: 1200px;
}
</style>