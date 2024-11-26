<template>
    <div class="post-page container">
        <div class="post-page__status">
            Request status: <span>{{ status }}</span>
        </div>

        <div class="post-page__head">
            <div @click="router.back()" class="back-btn"><</div>

            <h2 class="post-page__title title">
                Пост {{ post?.title || post?.text }}
            </h2>

            <nuxt-link v-if="linkOptions"
                       class="post-page__link common-link"
                       :to="linkOptions.link">
                {{ linkOptions.title }}
            </nuxt-link>
        </div>

        <nuxt-page :item="post"
                   @success-update="onUpdateData"/>
    </div>
</template>

<script setup lang="ts">
import type {ApiPostI, Post, PostId} from "~/types/posts";
import {usePosts} from "~/stores/posts";

const route = useRoute()
const router = useRouter()
const postsStore = usePosts()
const {data: post, status} =
    await <ApiPostI>useAsyncData(`post-${route.params.id}`,
        () => postsStore.getPostById(route.params.id as PostId),
        {
            lazy: true,
        })


const linkOptions = computed(() => {
    if (!post.value?._id) return null
    const res = {
        title: 'Редактировать',
        link: `/posts/${post.value._id}/edit`
    }
    if (route.path.endsWith('/edit')) {
        res.title = 'Просмотр'
        res.link = `/posts/${post.value._id}`
    }
    return res
})

function onUpdateData(data: Post) {
    post.value = {...post.value, ...data}
}
</script>

<style lang="scss">
.post-page {
  &__head {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  &__link {
    margin-left: auto;
  }

  &__status {
    text-transform: uppercase;
    color: #20014D;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    padding: 15px 20px;
    margin-bottom: 20px;
    background: rgba(#20014D, .1);
    border-radius: 10px;

    > span {
      font-size: 20px;
      font-weight: 800;
    }
  }
}
</style>