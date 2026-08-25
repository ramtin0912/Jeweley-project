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
  <div
    class="group flex flex-col overflow-hidden border border-gold/15 bg-ink-800 transition-all duration-500 hover:border-gold/45 hover:shadow-[0_24px_70px_-28px_rgba(176,141,87,0.4)]"
  >
    <NuxtLink :to="`/products/${product.slug}`" class="flex flex-1 flex-col">
      <div class="relative aspect-square overflow-hidden bg-ink-900">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.nameFa"
          class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span v-else class="absolute inset-0 flex items-center justify-center font-serif text-6xl text-gold-500/50">
          {{ product.nameFa.charAt(0) }}
        </span>

        <div aria-hidden="true" class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"></div>

        <span
          v-if="product.stockCount === 0"
          class="absolute right-3 top-3 border border-white/10 bg-ink-950/85 px-2.5 py-1 text-[11px] text-ivory-400 backdrop-blur-sm"
        >
          ناموجود
        </span>
        <span
          v-else-if="product.isExclusive"
          class="absolute right-3 top-3 flex items-center gap-1.5 bg-gold px-2.5 py-1 text-[11px] font-bold text-ink-950"
        >
          <span aria-hidden="true">✦</span>
          اختصاصی
        </span>
      </div>

      <div class="flex flex-1 flex-col p-4">
        <p v-if="product.category" class="text-[11px] text-ivory-500">{{ product.category.nameFa }}</p>
        <h3 class="mt-1.5 font-serif text-lg leading-snug text-ivory transition-colors duration-300 group-hover:text-gold-300">
          {{ product.nameFa }}
        </h3>
        <p class="mt-3 font-medium text-gold-400">{{ formatToman(product.priceToman) }}</p>
      </div>
    </NuxtLink>

    <div class="px-4 pb-4">
      <button
        v-if="product.stockCount > 0"
        class="w-full border border-gold/40 py-2.5 text-sm font-medium text-gold-300 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink-950"
        @click="addToCart"
      >
        افزودن به سبد
      </button>
      <button v-else disabled class="w-full cursor-not-allowed border border-white/10 py-2.5 text-sm text-ivory-500">
        ناموجود
      </button>
    </div>
  </div>
</template>
