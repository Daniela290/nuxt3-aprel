<template>
    <div class="loading-wrapper">
        <transition name="opacity">
            <div class="loading-wrapper__layer" v-if="loading">
                <div class="loading-wrapper__spinner">
                    <loading-icon/>
                </div>
            </div>
        </transition>

        <slot/>
    </div>
</template>

<script setup lang="ts">
import LoadingIcon from "@/components/icons/LoadingIcon.vue";

const props = defineProps({
    loading: {type: Boolean, default: false}
})
</script>

<style lang="scss" scoped>
.loading-wrapper {
  position: relative;

  &__layer {
    position: absolute;
    inset: 0 0;
    height: 100%;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: rgba(#fff, .2);
    //filter: blur(100px);
    backdrop-filter: blur(9px);
    border-radius: $radius;
  }

  &__spinner {
    position: sticky;
    height: 40px;
    top: 40%;
    left: 0;
    //transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    transition: all 0.5s ease;

    :deep(svg) {
      width: 40px;
      animation: rotate 2s linear infinite;

      circle {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: $main;
        stroke-linecap: round;
        @keyframes loading-dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40px;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120px;
          }
        }
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>