<script setup lang="ts">
import type { Product } from '~/types/catalog'
import { formatToman } from '~/utils/formatToman'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="group block rounded-lg border border-neutral-200 p-3 transition hover:border-accent hover:shadow-sm"
  >
    <div class="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-md bg-neutral-100">
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

    <h3 class="text-sm font-medium">{{ product.nameFa }}</h3>
    <p class="mt-1 text-sm text-accent-dark">{{ formatToman(product.priceToman) }}</p>
  </NuxtLink>
</template>
