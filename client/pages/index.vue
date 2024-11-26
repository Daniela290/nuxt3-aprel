<template>
    <div class="main-page container">
        <h2 class="title">Главная</h2>

        {{ posts }}
    </div>
</template>

<script setup lang="ts">

const postsStore = usePosts()
const {posts} = storeToRefs(postsStore)
</script>