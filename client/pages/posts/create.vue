<template>
    <div class="post-creating container">
        <h2 class="post-creating__title title">
            Создание поста
        </h2>

        <posts-form v-model:form="form"
                    @on-submit="onSubmit"/>
    </div>
</template>

<script setup lang="ts">
import type {Post, PostForm} from "~/types/posts";
import PostsForm from "~/components/pages/PostsForm.vue";
import {usePosts} from "~/stores/posts";
import type {Reactive} from "@vue/reactivity";

const router = useRouter()
const postStore = usePosts()

const form = <PostForm>reactive({
    title: '',
    text: '',
    description: ''
})

async function onSubmit() {
    if (!form?.title || !form?.text) return
    console.log('onSUBMIT')
    try {
        const resp: Post = await postStore.addPost(form)

        if (resp?._id) {
            router.push(`/posts/${resp._id}`)
        }
    } catch (e) {
        console.log(e)
    }
}
</script>

<style lang="scss">
.post-creating {
  &__form {
  }
}
</style>