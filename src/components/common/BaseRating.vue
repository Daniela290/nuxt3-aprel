<template>
    <div :class="['base-rating', ratingColor]">
        <star-icon/>
        {{ rating }}
    </div>
</template>

<script setup lang="ts">
import StarIcon from "@/components/icons/StarIcon.vue";

const props = defineProps({
    rating: {type: Number}
})
const ratingColor = computed(() => {
    if (props.rating < 3) return 'red'
    if (props.rating < 4.4) return 'yellow'
    return 'green'
})
</script>

<style lang="scss" scoped>
.base-rating {
  font-weight: 500;
  font-size: 14px;
  color: $main;
  border-radius: $radius;
  padding: 2px 8px;
  background: rgba($main, .06);

  :deep(svg) {
    height: 14px;
    width: 14px;

    path:nth-last-child(1) {
      fill: $main;
    }
  }

  &.red {
    color: $red;
    background: rgba($red, .06);

    :deep(svg) {
      path:nth-last-child(1) {
        fill: $red;
      }
    }
  }

  &.yellow {
    color: $yellow;
    background: rgba($yellow, .06);

    :deep(svg) {
      path:nth-last-child(1) {
        fill: $yellow;
      }
    }
  }
}
</style>