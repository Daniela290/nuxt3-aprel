<template>
    <div class="post-card">
        <p class="post-card__text">{{ item?.title || item.text }}</p>
        <div class="post-card__date">
            <span>Создана: </span> {{ new Date(item.createdAt).toLocaleDateString() }}
        </div>
        <div class="post-card__date">
            <span>Обновлена: </span> {{ new Date(item.updatedAt).toLocaleDateString() }}
        </div>

        <nuxt-link class="post-card__link common-link"
                   :to="`/posts/${item._id}`">
            Перейти к статье
        </nuxt-link>

        <button class="common-link post-card__link" @click="deletePost">Удалить</button>
        <nuxt-link class="common-link post-card__link"
                   :to="`/posts/${item._id}/edit`">
            Изменить
        </nuxt-link>
    </div>
</template>

<script setup lang="ts">
import type {Post} from "~/types/posts";
import type {PropType} from "@vue/runtime-core";
import {usePosts} from "~/stores/posts";

const props = defineProps({
    item: {
        type: Object as PropType<Post>,
        required: true
    }
})
const postsStore = usePosts()

async function deletePost() {
    if (!props.item?._id) return
    try {
        await postsStore.deletePost(props.item._id)
    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss" scoped>
.post-card {

  &__text {

  }

  &__date {
    font-size: 16px;
    color: rgba(#000, .8);

    > span {
      color: rgba(#000, .5);
    }
  }

  &__link {
    width: 100%;
    margin-top: 20px;
  }
}
</style>