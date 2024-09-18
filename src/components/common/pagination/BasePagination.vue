<template>
    <div class="base-pagination">
        <div class="base-pagination__data">
            <span>Всего продуктов: {{ total }}</span>
            <span>Стр. {{ page }} / {{ allPages }}</span>
        </div>

        <ul class="base-pagination__list">
            <li v-if="isShowArrow"
                :class="{disabled:disabledPrevArrow}"
                class="base-pagination__item arrow arrow--prev"
                @click="clickByPrev">
                <arrow-icon/>
            </li>
            <li v-for="item in showedPages"
                class="base-pagination__item"
                :class="{active:item===page}"
                @click="clickByPage(item)">
                <span>{{ item }}</span>
            </li>
            <li v-if="isShowArrow"
                :class="{disabled:disabledNextArrow}"
                class="base-pagination__item arrow arrow--next"
                @click="clickByNext">
                <arrow-icon/>
            </li>
        </ul>

        <div v-if="isChangeLimit"
             class="base-pagination__limit">
            <base-input placeholder="Limit"
                        :model-value="limit"
                        number
                        small
                        @update:model-value="inputLimit"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import {debounce} from "@/utils/debounce";

const props = defineProps({
    page: {type: Number, default: 1},
    total: {type: Number, default: 1000},
    limit: {type: Number, default: 4},
    isShowLimit: {type: Boolean, default: true},
    isChangeLimit: {type: Boolean, default: true},
    isShowArrow: {type: Boolean, default: true},
    pages: {type: Number, default: 5}
})
const emit = defineEmits(['change'])

const allPages = computed(() => {
    return Math.floor(props.total / props.limit) + (props.total % props.limit === 0 ? 0 : 1)
})

const showedPages = ref(Array.from({length: props.pages}).map((_, i) => i + 1))
if (props.pages >= allPages.value) {
    showedPages.value = Array.from({length: allPages.value}).map((_, i) => i + 1)
}

function setShowedPages() {
    if (props.pages >= allPages.value) {
        showedPages.value = Array.from({length: allPages.value}).map((_, i) => i + 1)
        return
    }
    showedPages.value = Array.from({length: props.pages}).map((_, i) => i + 1)
}

const disabledNextArrow = computed(() => {
    return showedPages.value[showedPages.value.length - 1] === allPages.value
})
const disabledPrevArrow = computed(() => {
    return showedPages.value[0] === 1
})

function clickByPage(e: number) {
    emit('change', {page: e})
}

function clickByNext() {
    if (disabledNextArrow.value) return

    const lastShowPage = showedPages.value[showedPages.value.length - 1]
    if (lastShowPage <= allPages.value - props.pages) {
        // console.log('1')
        showedPages.value = Array.from({length: props.pages}).map((_, i) => i + 1 + lastShowPage)
    } else {
        // console.log('2')
        showedPages.value = Array.from({length: props.pages}).map((_, i) => allPages.value - props.pages + i + 1)
    }
}

function clickByPrev() {
    if (disabledPrevArrow.value) return

    const firstShowPage = showedPages.value[0]
    if (firstShowPage >= props.pages) {
        showedPages.value = Array.from({length: props.pages}).map((_, i) => firstShowPage - props.pages + i)
    } else {
        showedPages.value = Array.from({length: props.pages}).map((_, i) => i + 1)
    }
}

const inputLimit = debounce((e: number) => {
    // console.log('debounce', e)
    if (e > 0 && e <= props.total) {
        emit('change', {page: 1, limit: Number(e)})
        nextTick(setShowedPages)
    }
}, 400)
</script>

<style lang="scss" scoped>
.base-pagination {
  width: 100%;
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: 0;
    padding: 0;
  }

  &__item {
    height: 40px;
    width: 40px;
    border-radius: $radius;
    white-space: nowrap;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms;
    cursor: pointer;

    &:not(.disabled):not(.active):hover {
      background: rgba($dark-light, .1);
    }

    &.active {
      background: rgba($main, .1);
      font-weight: 600;
    }

    &.disabled {
      opacity: .6;
      cursor: no-drop;
    }

    &.arrow {
      :deep(svg) {
        height: 60%;
        width: 60%;
      }

      &--next {
        :deep(svg) {
          transform: rotate(180deg);
        }
      }
    }
  }

  &__limit {
    max-width: 100px;
    width: 100%;
  }

  &__data {
    display: flex;
    gap: 4px 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }
  @media (max-width: 320px) {
    &__item {
      height: 35px;
      width: 35px;
    }
  }
}
</style>