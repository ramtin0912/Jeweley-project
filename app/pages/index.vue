<script setup lang="ts">
import type { Category, Product } from '~/types/catalog'

useSeoMeta({
  title: 'فروشگاه زیورآلات دست‌ساز',
  description: 'زیورآلات دست‌ساز نقره؛ محصول را ببینید و بلافاصله سفارش دهید.'
})

const { data: categories } = await useFetch<Category[]>('/api/categories', { default: () => [] })
const { data: products } = await useFetch<Product[]>('/api/products', { default: () => [] })

const selectedCategory = ref<string | null>(null)
const searchQuery = ref('')
const inStockOnly = ref(false)

const filteredProducts = computed(() => {
  let list = products.value ?? []
  if (selectedCategory.value) {
    list = list.filter((product) => product.category?.slug === selectedCategory.value)
  }
  if (inStockOnly.value) {
    list = list.filter((product) => product.stockCount > 0)
  }
  const query = searchQuery.value.trim()
  if (query) {
    list = list.filter(
      (product) => product.nameFa.includes(query) || (product.descriptionFa ?? '').includes(query)
    )
  }
  return list
})

function selectCategory(slug: string | null) {
  selectedCategory.value = slug
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex flex-col items-center px-4 py-16 text-center sm:py-24">
      <p dir="ltr" class="reveal font-engraved text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400/80">
        One-of-a-kind · Handmade Silver
      </p>

      <h1 class="reveal mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.25] text-ivory sm:text-6xl sm:leading-[1.2]" style="animation-delay: 90ms">
        هر قطعه، یک اثرِ یکتا
      </h1>

      <p class="reveal mt-6 max-w-xl leading-relaxed text-ivory-400" style="animation-delay: 180ms">
        زیورآلات نقرهٔ دست‌ساز، آثار اختصاصی و پکیج‌های چند محصولی — هر قطعه با دقت و حوصله
        ساخته می‌شود تا تنها یک‌بار در جهان وجود داشته باشد.
      </p>

      <div class="reveal mt-10 flex flex-wrap items-center justify-center gap-4" style="animation-delay: 270ms">
        <a
          href="#catalog"
          class="border border-gold bg-gold px-8 py-3 text-sm font-medium text-ink-950 transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_12px_40px_-12px_rgba(176,141,87,0.7)]"
        >
          مشاهده مجموعه
        </a>
        <NuxtLink
          to="/portfolio"
          class="border border-gold/40 px-8 py-3 text-sm font-medium text-gold-300 transition-all duration-300 hover:border-gold hover:text-gold-200"
        >
          نمونه‌کارها
        </NuxtLink>
      </div>

      <div class="reveal mt-14 flex items-center gap-3 text-gold-400/60" style="animation-delay: 360ms">
        <span class="h-px w-16 bg-gold/25"></span>
        <span aria-hidden="true">✦</span>
        <span class="h-px w-16 bg-gold/25"></span>
      </div>
    </section>

    <!-- Catalog -->
    <section id="catalog" class="scroll-mt-24 border-t border-gold/15 pt-12">
      <div class="flex items-center justify-between gap-4">
        <h2 class="font-serif text-2xl font-bold text-ivory sm:text-3xl">مجموعه</h2>
        <span class="h-px flex-1 bg-gold/15"></span>
      </div>

      <!-- Filters -->
      <div class="mt-6 flex flex-wrap items-center gap-2">
        <button
          class="border px-4 py-1.5 text-sm transition-colors duration-300"
          :class="selectedCategory === null ? 'border-gold bg-gold/15 text-gold-300' : 'border-gold/20 text-ivory-400 hover:border-gold/50 hover:text-ivory'"
          @click="selectCategory(null)"
        >
          همه
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="border px-4 py-1.5 text-sm transition-colors duration-300"
          :class="selectedCategory === category.slug ? 'border-gold bg-gold/15 text-gold-300' : 'border-gold/20 text-ivory-400 hover:border-gold/50 hover:text-ivory'"
          @click="selectCategory(category.slug)"
        >
          {{ category.nameFa }}
        </button>
      </div>

      <div class="mt-5 flex flex-wrap items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو..."
          class="w-full max-w-xs border border-gold/20 bg-ink-800 px-3.5 py-2 text-sm text-ivory placeholder:text-ivory-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
        />
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ivory-400">
          <input v-model="inStockOnly" type="checkbox" class="h-4 w-4 accent-gold-400" />
          فقط موجود
        </label>
      </div>

      <!-- Grid -->
      <div v-if="filteredProducts.length" class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        <ProductCard
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :product="product"
          class="reveal"
          :style="{ animationDelay: `${Math.min(index, 7) * 60}ms` }"
        />
      </div>

      <div v-else class="mt-16 flex flex-col items-center gap-3 py-8 text-center">
        <span aria-hidden="true" class="font-serif text-3xl text-gold-500/50">✦</span>
        <p class="text-ivory-400">محصولی یافت نشد.</p>
      </div>
    </section>
  </div>
</template>
