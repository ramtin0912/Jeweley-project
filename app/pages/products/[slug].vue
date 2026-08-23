<script setup lang="ts">
import type { Product } from '~/types/catalog'
import { formatToman } from '~/utils/formatToman'
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'

const route = useRoute()
const slug = route.params.slug as string

const { data: product, error } = await useFetch<Product>(`/api/products/${slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'محصول یافت نشد', fatal: true })
}

const cart = useCartStore()
const { open } = useCartDrawer()

const selectedVariantId = ref<number | null>(null)
const quantity = ref(1)

const displayPrice = computed(() => {
  const base = product.value?.priceToman ?? 0
  const variant = product.value?.variants.find((v) => v.id === selectedVariantId.value)
  return base + (variant?.priceDeltaToman ?? 0)
})

function addToCart() {
  if (!product.value || product.value.stockCount <= 0) return
  const variant = product.value.variants.find((v) => v.id === selectedVariantId.value)
  cart.addItem({
    itemType: 'product',
    itemId: product.value.id,
    nameFa: product.value.nameFa,
    priceToman: displayPrice.value,
    quantity: quantity.value,
    image: product.value.image,
    slug: product.value.slug,
    variantId: variant?.id ?? null,
    variantLabel: variant ? `${variant.label}: ${variant.value}` : null
  })
  open()
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
      <p class="mt-3 text-xl font-medium text-accent-dark">{{ formatToman(displayPrice) }}</p>

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
          <button
            v-for="variant in product.variants"
            :key="variant.id"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="selectedVariantId === variant.id ? 'border-accent bg-accent text-white' : 'border-neutral-300 hover:border-accent'"
            @click="selectedVariantId = variant.id"
          >
            {{ variant.value }}
            <span v-if="variant.priceDeltaToman">(+{{ formatToman(variant.priceDeltaToman) }})</span>
          </button>
        </div>
      </div>

      <div v-if="product.stockCount > 0" class="mt-6 flex items-center gap-3">
        <div class="flex items-center rounded-md border border-neutral-300">
          <button class="px-3 py-2 text-sm" @click="quantity = Math.max(1, quantity - 1)">−</button>
          <span class="min-w-8 text-center text-sm">{{ quantity }}</span>
          <button class="px-3 py-2 text-sm" @click="quantity = quantity + 1">+</button>
        </div>
        <button class="rounded-md bg-neutral-900 px-6 py-2 text-sm text-white hover:bg-neutral-700" @click="addToCart">
          افزودن به سبد
        </button>
      </div>

      <p class="mt-6 leading-relaxed text-neutral-700">{{ product.descriptionFa }}</p>
    </div>
  </div>
</template>
