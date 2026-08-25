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

useSeoMeta({
  title: () => product.value?.seoTitle || product.value?.nameFa || 'محصول',
  description: () => product.value?.seoDescription || product.value?.descriptionFa || '',
  ogTitle: () => product.value?.seoTitle || product.value?.nameFa || 'محصول',
  ogDescription: () => product.value?.seoDescription || product.value?.descriptionFa || '',
  ogImage: () => product.value?.image || ''
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.value?.nameFa ?? '',
        description: product.value?.descriptionFa ?? '',
        ...(product.value?.image ? { image: product.value.image } : {}),
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IRR',
          price: (product.value?.priceToman ?? 0) * 10,
          availability: product.value && product.value.stockCount > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock'
        }
      })
    }
  ]
})

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
  <div v-if="product" class="grid gap-10 md:grid-cols-2 md:gap-12">
    <!-- Image -->
    <div class="reveal relative aspect-square overflow-hidden border border-gold/15 bg-ink-900">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.nameFa"
        class="h-full w-full object-cover"
      />
      <span v-else class="absolute inset-0 flex items-center justify-center font-serif text-8xl text-gold-500/40">
        {{ product.nameFa.charAt(0) }}
      </span>
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"></div>
    </div>

    <!-- Details -->
    <div class="reveal" style="animation-delay: 100ms">
      <p v-if="product.category" class="text-sm text-gold-400/80">{{ product.category.nameFa }}</p>
      <h1 class="mt-2 font-serif text-3xl font-bold leading-snug text-ivory sm:text-4xl">{{ product.nameFa }}</h1>
      <p class="mt-4 text-2xl font-medium text-gold-400">{{ formatToman(displayPrice) }}</p>

      <div class="mt-6 border-y border-gold/15 py-4">
        <dl class="space-y-3 text-sm">
          <div v-if="product.material" class="flex justify-between gap-6">
            <dt class="text-ivory-500">جنس</dt>
            <dd class="text-ivory">{{ product.material }}</dd>
          </div>
          <div v-if="product.weightGrams" class="flex justify-between gap-6">
            <dt class="text-ivory-500">وزن</dt>
            <dd class="text-ivory">{{ product.weightGrams }} گرم</dd>
          </div>
          <div class="flex items-center justify-between gap-6">
            <dt class="text-ivory-500">وضعیت</dt>
            <dd class="flex items-center gap-2">
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="product.stockCount > 0 ? 'bg-gold-400' : 'bg-red-400'"
              ></span>
              <span :class="product.stockCount > 0 ? 'text-gold-300' : 'text-red-400'">
                {{ product.stockCount > 0 ? `موجود (${product.stockCount} عدد)` : 'ناموجود' }}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div v-if="product.variants.length" class="mt-6">
        <p class="mb-3 text-sm text-ivory-500">انتخاب</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="variant in product.variants"
            :key="variant.id"
            class="border px-4 py-2 text-sm transition-colors duration-300"
            :class="selectedVariantId === variant.id ? 'border-gold bg-gold/15 text-gold-300' : 'border-gold/20 text-ivory-400 hover:border-gold/50 hover:text-ivory'"
            @click="selectedVariantId = variant.id"
          >
            {{ variant.value }}
            <span v-if="variant.priceDeltaToman" class="text-gold-500">(+{{ formatToman(variant.priceDeltaToman) }})</span>
          </button>
        </div>
      </div>

      <div v-if="product.stockCount > 0" class="mt-8 flex items-center gap-3">
        <div class="flex items-center border border-gold/25">
          <button class="px-4 py-2.5 text-sm text-ivory-400 transition-colors hover:text-ivory" @click="quantity = Math.max(1, quantity - 1)">−</button>
          <span class="min-w-10 border-x border-gold/25 text-center text-sm">{{ quantity }}</span>
          <button class="px-4 py-2.5 text-sm text-ivory-400 transition-colors hover:text-ivory" @click="quantity = quantity + 1">+</button>
        </div>
        <button
          class="flex-1 border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink-950 transition-all duration-300 hover:bg-gold-300"
          @click="addToCart"
        >
          افزودن به سبد
        </button>
      </div>

      <p v-if="product.descriptionFa" class="mt-8 leading-relaxed text-ivory-400">{{ product.descriptionFa }}</p>
    </div>
  </div>
</template>
