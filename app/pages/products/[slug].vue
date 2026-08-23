<script setup lang="ts">
import type { Product } from '~/types/catalog'
import { formatToman } from '~/utils/formatToman'

const route = useRoute()
const slug = route.params.slug as string

const { data: product, error } = await useFetch<Product>(`/api/products/${slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'محصول یافت نشد', fatal: true })
}
</script>

<template>
  <div v-if="product" class="grid gap-8 md:grid-cols-2">
    <div class="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.nameFa"
        class="h-full w-full object-cover"
      />
      <span v-else class="text-5xl text-neutral-400">{{ product.nameFa.charAt(0) }}</span>
    </div>

    <div>
      <p v-if="product.category" class="text-sm text-neutral-500">{{ product.category.nameFa }}</p>
      <h1 class="mt-1 text-2xl font-bold">{{ product.nameFa }}</h1>
      <p class="mt-3 text-xl font-medium text-accent-dark">{{ formatToman(product.priceToman) }}</p>

      <div class="mt-6 space-y-2 text-sm">
        <p v-if="product.material"><span class="text-neutral-500">جنس:</span> {{ product.material }}</p>
        <p v-if="product.weightGrams">
          <span class="text-neutral-500">وزن:</span> {{ product.weightGrams }} گرم
        </p>
        <p :class="product.stockCount > 0 ? 'text-green-700' : 'text-red-600'">
          {{ product.stockCount > 0 ? `موجود (${product.stockCount} عدد)` : 'ناموجود' }}
        </p>
      </div>

      <div v-if="product.variants.length" class="mt-6">
        <p class="mb-2 text-sm font-medium">انتخاب:</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="variant in product.variants"
            :key="variant.id"
            class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm"
          >
            {{ variant.label }}: {{ variant.value }}
            <span v-if="variant.priceDeltaToman" class="text-accent-dark">
              (+{{ formatToman(variant.priceDeltaToman) }})
            </span>
          </span>
        </div>
      </div>

      <p class="mt-6 leading-relaxed text-neutral-700">{{ product.descriptionFa }}</p>
    </div>
  </div>
</template>
