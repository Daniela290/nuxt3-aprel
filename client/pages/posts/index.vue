<template>
    <div class="posts-page container">
        <div class="posts-page__head">
            <h2 class="title posts-page__title">POSTS</h2>

            <nuxt-link to="/posts/create"
                       class="common-link">
                Создать
            </nuxt-link>
        </div>

        <div class="posts-page__wrapper">
            <post-card v-for="(item, index) in postsStore.posts"
                       :item="item"
                       class="posts-page__card">

            </post-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import PostCard from "~/components/common/PostCard.vue";

const postsStore = usePosts()
</script>


<style lang="scss" scoped>
.posts-page {
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }

  &__card {
    border-radius: 10px;
    border: 2px solid rgba(#000, .2);
    padding: 20px;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
}
</style>