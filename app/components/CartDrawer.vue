<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'
import { formatToman } from '~/utils/formatToman'

const cart = useCartStore()
const { isOpen, close } = useCartDrawer()
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

      <aside class="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col border-r border-gold/20 bg-ink-900 shadow-2xl">
        <div class="flex items-center justify-between border-b border-gold/15 px-5 py-4">
          <h2 class="flex items-center gap-2 font-serif text-xl font-bold text-ivory">
            <span aria-hidden="true" class="text-gold-400">✦</span>
            سبد خرید
          </h2>
          <button class="text-ivory-500 transition-colors hover:text-ivory" aria-label="بستن سبد خرید" @click="close">بستن</button>
        </div>

        <div class="flex-1 overflow-y-auto p-5">
          <p v-if="cart.items.length === 0" class="flex flex-col items-center py-16 text-center">
            <span aria-hidden="true" class="font-serif text-3xl text-gold-500/50">✦</span>
            <span class="mt-3 text-ivory-400">سبد خرید خالی است.</span>
          </p>

          <ul v-else class="space-y-4">
            <li
              v-for="item in cart.items"
              :key="`${item.itemType}-${item.itemId}-${item.variantId}`"
              class="flex items-start justify-between gap-3 border-b border-gold/10 pb-4"
            >
              <div>
                <p class="text-sm font-medium text-ivory">{{ item.nameFa }}</p>
                <p v-if="item.variantLabel" class="mt-0.5 text-xs text-ivory-500">{{ item.variantLabel }}</p>
                <p class="mt-1 text-xs text-gold-400">{{ formatToman(item.priceToman) }}</p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class="flex h-7 w-7 items-center justify-center border border-gold/25 text-sm text-ivory-400 transition-colors hover:border-gold/60 hover:text-ivory"
                  @click="cart.updateQuantity(item.itemType, item.itemId, item.variantId, item.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-5 text-center text-sm text-ivory">{{ item.quantity }}</span>
                <button
                  class="flex h-7 w-7 items-center justify-center border border-gold/25 text-sm text-ivory-400 transition-colors hover:border-gold/60 hover:text-ivory"
                  @click="cart.updateQuantity(item.itemType, item.itemId, item.variantId, item.quantity + 1)"
                >
                  +
                </button>
                <button
                  class="mr-1 text-xs text-red-300/80 transition-colors hover:text-red-300"
                  @click="cart.removeItem(item.itemType, item.itemId, item.variantId)"
                >
                  حذف
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="cart.items.length" class="border-t border-gold/15 p-5">
          <p class="flex justify-between font-medium text-ivory">
            <span>جمع کل</span>
            <span class="text-gold-400">{{ formatToman(cart.totalToman) }}</span>
          </p>
          <NuxtLink
            to="/checkout"
            class="mt-4 block border border-gold bg-gold py-3 text-center text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300"
            @click="close"
          >
            ثبت سفارش
          </NuxtLink>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
