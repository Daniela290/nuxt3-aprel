<template>
    <div class="data-display-switch">
        <div v-for="item in items"
             :class="['data-display-switch__item', `data-display-switch__item--${item.key}`,
                        {active:item.key === modelValue}]"
             @click="emit('update:model-value', item.key)">
            <component :is="item.icon"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import ListIcon from "@/components/icons/ListIcon.vue";
import GridIcon from "@/components/icons/GridIcon.vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: 'grid',
        validator(value: string): boolean {
            return value === 'grid' || value === 'list'
        }
    }
})
const emit = defineEmits(['update:model-value'])

const items = shallowRef([{
    key: 'list',
    icon: ListIcon
}, {
    key: 'grid',
    icon: GridIcon
}])
</script>

<style lang="scss" scoped>
.data-display-switch {
  display: flex;
  gap: 20px;

  &__item {
    height: 40px;
    width: 40px;
    background: rgba($dark-light, .05);
    transition: 300ms;
    border-radius: $radius;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    > :deep(svg) {
      height: 60%;
      width: 60%;

      path, rect {
        stroke: rgba($dark-light, .8);
      }
    }

    &:not(.active):hover {
      background: rgba($dark-light, .1);
    }

    &.active {
      background: rgba($main, .08);

      > :deep(svg) {
        path, rect {
          stroke: rgba($main, .8);
        }
      }
    }
  }
}
</style>