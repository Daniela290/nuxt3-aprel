<template>
    <div class="product-property">
        <div class="product-property__label">
            <slot name="label"></slot>
        </div>

        <div class="product-property__value">
            <slot name="value"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.product-property {
  display: flex;
  padding: 6px 0;
  gap: 10px;
  border-bottom: 1px solid rgba($dark-light, .1);

  &__label {
    max-width: 40%;
    min-width: 40%;
    font-size: 16px;
    color: rgba($dark-light, .5);
    line-height: 110%;
  }

  &__value {
    flex-grow: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 110%;
    text-align: right;
  }
}
</style>