<template>
    <div class="base-input"
         :class="{'move-placeholder':isMovePlaceholder,
                 'focus':isFocus,
                 'with-suffix':slots?.suffix}">
        <div class="base-input__wrapper">
            <input class="base-input__input"
                   ref="baseInputRef"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onInput"
                   :placeholder="movingPlaceholder?'':placeholder"
                   type="text">
            <label class="base-input__placeholder" v-if="movingPlaceholder">{{ placeholder }}</label>

            <div class="base-input__suffix" v-if="slots?.suffix">
                <slot name="suffix"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    placeholder: {type: String, default: 'Input value ...'},
    movingPlaceholder: {type: Boolean, default: true},
    disabled: {type: Boolean, default: false},
    modelValue: {type: [String, Number], default: null}
})
const emit = defineEmits(['update:model-value'])
const isMovePlaceholder = computed(() => {
    return props.movingPlaceholder && (isFocus.value || !!props.modelValue)
})
const isFocus = ref(false)
const slots = useSlots()
console.log(slots)
const baseInputRef = ref()

function onFocus() {
    isFocus.value = true
}

function onBlur() {
    isFocus.value = false
}

function onInput(e) {
    emit('update:model-value', e.target.value)
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  height: 60px;

  &__wrapper {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  &__input {
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid $main;
    border-radius: $radius;
    overflow: hidden;
    padding: 20px 10px 0;
    transition: 300ms;
  }

  &__placeholder, &__input::placeholder {
    color: $main-color;
    font-size: 16px;
    font-weight: 500;
  }

  &__placeholder {
    position: absolute;
    pointer-events: none;
    top: 0;
    transform: translateY(18px);
    left: 10px;
    transition: 300ms;
  }

  &__suffix {
    position: absolute;
    height: 30px;
    width: 30px;
    transform: translateY(-50%);
    top: 50%;
    right: 10px;
    padding: 4px 0 4px 4px;
    cursor: pointer;

    :deep(svg) {
      path {
        stroke: $main-color;
      }
    }
  }

  &:not(.disabled) {
    .base-input {
      &__input:hover {
        border-color: $main-hover;
      }
    }

    &.focus {
      .base-input {
        &__input {
          border-color: $main-focus;
        }
      }
    }
  }

  &.move-placeholder {
    .base-input {
      &__placeholder {
        font-size: 12px;
        transform: translateY(8px);
      }
    }
  }

  &.with-suffix {
    .base-input {
      &__input {
        padding-right: 50px;
      }
    }
  }
}
</style>