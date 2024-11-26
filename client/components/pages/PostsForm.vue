<template>
    <form class="post-form" novalidate @submit.prevent="emit('on-submit')">
        <input type="text"
               class="common-field"
               v-model="formData.title"
               placeholder="title">
        <input type="text"
               class="common-field"
               v-model="formData.text"
               placeholder="text">

        <textarea id="story"
                  class="common-field"
                  v-model="formData.description"
                  placeholder="description"
                  name="description"
                  rows="5" cols="33"></textarea>


        <button type="submit" class="common-link">
            {{ isEdit ? 'Изменить' : 'Создать' }}
        </button>
    </form>
</template>

<script setup lang="ts">
import type {PostForm} from "~/types/posts";
import type {PropType} from "@vue/runtime-core";

const props = defineProps({
    form: {type: Object as PropType<PostForm>, default: () => ({})},
    isEdit: {type: Boolean, default: false}
})
const emit = defineEmits(['on-submit', 'update:form'])

const formData = computed({
    get: () => {
        return props.form
    },
    set: (val) => {
        emit('update:form', val)
    }
})

</script>

<style lang="scss" scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}
</style>