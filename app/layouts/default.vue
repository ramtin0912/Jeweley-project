<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'

const cart = useCartStore()
const { toggle } = useCartDrawer()

const navLinks = [
  { to: '/', label: 'فروشگاه' },
  { to: '/packages', label: 'پکیج‌ها' },
  { to: '/portfolio', label: 'نمونه‌کارها' },
  { to: '/blog', label: 'وبلاگ' }
]
</script>

<template>
  <div class="atelier-root atelier-glow relative min-h-screen overflow-x-clip bg-ink-950 text-ivory">
    <div aria-hidden="true" class="noise-overlay"></div>

    <header class="sticky top-0 z-40 border-b border-gold/15 bg-ink-950/80 backdrop-blur-sm">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NuxtLink to="/" class="group flex flex-col leading-none">
          <span class="flex items-center gap-2 font-serif text-2xl font-bold text-ivory">
            <span aria-hidden="true" class="text-gold-400">✦</span>
            زیورآلات دست‌ساز
          </span>
          <span dir="ltr" class="mt-1.5 self-start font-engraved text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-400/80">
            Handmade Silver
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="relative py-1 text-ivory-400 transition-colors duration-300 after:absolute after:-bottom-0.5 after:right-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:text-ivory hover:after:w-full"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <button
          class="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-ivory transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
          aria-label="باز کردن سبد خرید"
          @click="toggle"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" />
          </svg>
          <span
            v-if="cart.itemCount"
            class="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink-950"
          >
            {{ cart.itemCount }}
          </span>
        </button>
      </div>

      <nav class="flex items-center gap-6 overflow-x-auto border-t border-gold/10 px-4 py-3 text-sm md:hidden sm:px-6">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="shrink-0 text-ivory-400 transition-colors duration-300 hover:text-ivory"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <slot />
    </main>

    <footer class="border-t border-gold/15">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6">
        <p class="flex items-center gap-2 font-serif text-xl font-bold text-ivory">
          <span aria-hidden="true" class="text-gold-400">✦</span>
          زیورآلات دست‌ساز
        </p>
        <p dir="ltr" class="font-engraved text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-400/70">
          Handmade Silver Atelier
        </p>
        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ivory-500">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="transition-colors duration-300 hover:text-ivory">
            {{ link.label }}
          </NuxtLink>
        </nav>
        <p class="text-xs text-ivory-500">هر قطعه، یک اثر یکتا — ساخته‌شده با دقت و حوصله.</p>
      </div>
    </footer>

    <CartDrawer />
  </div>
</template>
