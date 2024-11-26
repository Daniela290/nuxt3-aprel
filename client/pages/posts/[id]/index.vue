<template>
    <div class="post-page-main">
        <h3 class="post-page-main__title">Заголовок: {{ item?.title || '-' }}</h3>
        <p class="post-page-main__text">Текст: {{ item?.text }}</p>
        <p class="post-page-main__text">Описание: {{ item?.description || '-' }}</p>

        <div v-if="item?.createdAt"
             class="post-card__date">
            <span>Создана: </span> {{ new Date(item.createdAt).toLocaleDateString() }}
        </div>
        <div v-if="item?.updatedAt"
             class="post-card__date">
            <span>Обновлена: </span> {{ new Date(item.updatedAt).toLocaleDateString() }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import type {Post} from "~/types/posts";

const props = defineProps({
    item: {type: Object as PropType<Post>}
})
</script>

<style lang="scss">
.post-page-main {
}
</style>