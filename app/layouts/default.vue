<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'

const cart = useCartStore()
const { toggle } = useCartDrawer()
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-900">
    <header class="border-b border-neutral-200">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-lg font-bold">زیورآلات دست‌ساز</NuxtLink>

        <nav class="flex items-center gap-6 text-sm">
          <NuxtLink to="/" class="hover:text-accent">فروشگاه</NuxtLink>
          <NuxtLink to="/packages" class="hover:text-accent">پکیج‌ها</NuxtLink>
          <NuxtLink to="/portfolio" class="hover:text-accent">نمونه‌کارها</NuxtLink>

          <button class="relative flex items-center gap-1 hover:text-accent" @click="toggle">
            سبد
            <span
              v-if="cart.itemCount"
              class="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white"
            >
              {{ cart.itemCount }}
            </span>
          </button>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
      زیورآلات دست‌ساز نقره
    </footer>

    <CartDrawer />
  </div>
</template>
