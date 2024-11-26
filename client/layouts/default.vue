<template>
    <div class="default-layout">
        <header class="default-layout__header default-header">
            <div class="default-layout__wrapper container">
                <nav class="default-header__nav">
                    <nuxt-link v-for="link in links"
                               :to="link.link"
                               class="default-header__link">
                        {{ link.title }}
                    </nuxt-link>
                </nav>
            </div>
        </header>

        <main class="default-layout__main">
            <slot/>
        </main>

        <footer class="default-layout__footer"></footer>
    </div>
</template>

<script setup lang="ts">
const links = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Посты',
    link: '/posts'
}]
</script>

<style lang="scss">
.default-layout {
  &__header {
    height: 80px;
    border-bottom: 1px solid black;
  }

  &__main {
    padding-top: 40px;
    padding-bottom: 60px;
  }
}

.default-header {
  padding: 20px 0;
  display: flex;
  align-items: center;

  &__nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__link {
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 8px;
    background: rgba(#000, .09);
    transition: 300ms;
    color: #20014d;

    &:hover {
      background: rgba(#000, .19);
    }

    &.router-link-active {
      background: rgba(#20014D, .79);
      color: #fff;
    }
  }
}
</style>

