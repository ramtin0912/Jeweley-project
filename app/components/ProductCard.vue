<script setup lang="ts">
import type { Product } from '~/types/catalog'
import { formatToman } from '~/utils/formatToman'
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'

const props = defineProps<{ product: Product }>()
const cart = useCartStore()
const { open } = useCartDrawer()

function addToCart() {
  if (props.product.stockCount <= 0) return
  cart.addItem({
    itemType: 'product',
    itemId: props.product.id,
    nameFa: props.product.nameFa,
    priceToman: props.product.priceToman,
    quantity: 1,
    image: props.product.image,
    slug: props.product.slug,
    variantId: null,
    variantLabel: null
  })
  open()
}
</script>

<template>
  <div class="rounded-lg border border-neutral-200 p-3 transition hover:border-accent hover:shadow-sm">
    <NuxtLink :to="`/products/${product.slug}`" class="block">
      <div class="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-neutral-100">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.nameFa"
          class="h-full w-full object-cover"
        />
        <span v-else class="text-3xl text-neutral-400">{{ product.nameFa.charAt(0) }}</span>

        <span
          v-if="product.stockCount === 0"
          class="absolute right-2 top-2 rounded bg-neutral-800 px-2 py-0.5 text-xs text-white"
        >
          ناموجود
        </span>
        <span
          v-else-if="product.isExclusive"
          class="absolute right-2 top-2 rounded bg-accent px-2 py-0.5 text-xs text-white"
        >
          اختصاصی
        </span>
      </div>

      <h3 class="mt-3 text-sm font-medium">{{ product.nameFa }}</h3>
      <p class="mt-1 text-sm text-accent-dark">{{ formatToman(product.priceToman) }}</p>
    </NuxtLink>

    <button
      v-if="product.stockCount > 0"
      class="mt-2 w-full rounded-md bg-neutral-900 py-1.5 text-sm text-white transition hover:bg-neutral-700"
      @click="addToCart"
    >
      افزودن به سبد
    </button>
  </div>
</template>
