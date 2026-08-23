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
      <div class="absolute inset-0 bg-black/40" @click="close"></div>

      <aside class="absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl">
        <div class="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <h2 class="font-semibold">سبد خرید</h2>
          <button class="text-neutral-500 hover:text-neutral-800" @click="close">بستن</button>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <p v-if="cart.items.length === 0" class="py-10 text-center text-neutral-500">
            سبد خرید خالی است.
          </p>

          <ul v-else class="space-y-3">
            <li
              v-for="item in cart.items"
              :key="`${item.itemType}-${item.itemId}-${item.variantId}`"
              class="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3"
            >
              <div>
                <p class="text-sm font-medium">{{ item.nameFa }}</p>
                <p v-if="item.variantLabel" class="text-xs text-neutral-500">{{ item.variantLabel }}</p>
                <p class="text-xs text-accent-dark">{{ formatToman(item.priceToman) }}</p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  class="h-6 w-6 rounded border border-neutral-300 text-sm"
                  @click="cart.updateQuantity(item.itemType, item.itemId, item.variantId, item.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-4 text-center text-sm">{{ item.quantity }}</span>
                <button
                  class="h-6 w-6 rounded border border-neutral-300 text-sm"
                  @click="cart.updateQuantity(item.itemType, item.itemId, item.variantId, item.quantity + 1)"
                >
                  +
                </button>
                <button
                  class="text-xs text-red-500"
                  @click="cart.removeItem(item.itemType, item.itemId, item.variantId)"
                >
                  حذف
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="cart.items.length" class="border-t border-neutral-200 p-4">
          <p class="flex justify-between font-semibold">
            <span>جمع کل</span>
            <span>{{ formatToman(cart.totalToman) }}</span>
          </p>
          <NuxtLink
            to="/checkout"
            class="mt-3 block rounded-md bg-neutral-900 py-2 text-center text-sm text-white hover:bg-neutral-700"
            @click="close"
          >
            ثبت سفارش
          </NuxtLink>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
