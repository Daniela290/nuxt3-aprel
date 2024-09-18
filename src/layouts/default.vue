<template>
    <div class="default-layout ">
        <header class="default-layout__header default-header">
            <div class="container default-header__wrapper">
                <base-input v-model="searchStore().search" placeholder="Search...">
                    <template #suffix>
                        <search-icon/>
                    </template>
                </base-input>
            </div>
        </header>

        <main class="default-layout__body container">
            <nuxt-page/>
        </main>

        <footer class="default-layout__footer container">
            2024
        </footer>
    </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/common/BaseInput.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import {searchStore} from "~/store/search";

const search = ref('')
</script>

<style lang="scss" scoped>
.default-layout {
  &__header {
    min-height: 60px;
    padding: 10px 0;
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba($dark-light, .06);
  }

  &__body {
    padding-top: 50px;
    padding-bottom: 50px;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
  }

  &__footer {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $dark;
  }

  @media (max-width: 1600px) {
    &__body {
      padding-top: 30px;
      padding-bottom: 40px;
    }
  }
}
</style>