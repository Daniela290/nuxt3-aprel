<template>
    <div class="post-edit">
        <posts-form v-model:form="form"
                    @on-submit="onSubmit"
                    is-edit/>
    </div>
</template>

<script setup lang="ts">
import PostsForm from "~/components/pages/PostsForm.vue";
import type {PropType} from "@vue/runtime-core";
import type {Post, PostForm} from "~/types/posts";
import {usePosts} from "~/stores/posts";

const props = defineProps({
    item: {type: Object as PropType<Post>}
})
const emit = defineEmits(['success-update'])
const form = <PostForm>reactive({
    text: props.item?.text || '',
    title: props.item?.title || '',
    description: props.item?.description || ''
})
const postStore = usePosts()
const router = useRouter()

async function onSubmit() {
    if (!form?.title || !form?.text || !props.item?._id) return
    console.log('onSUBMIT', form)
    try {
        const resp: Post = await postStore.updatePost(form, props.item._id)
        if (resp?._id) {
            router.push(`/posts/${resp._id}`)
            emit('success-update', resp)
        }
    } catch (e) {
        console.log(e)
    }
}

watch(() => props.item, () => {
    form.text = props.item?.text || ''
    form.title = props.item?.title || ''
    form.description = props.item?.description || ''
})
</script>