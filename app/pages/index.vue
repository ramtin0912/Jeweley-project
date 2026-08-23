<script setup lang="ts">
import type { Category, Product } from '~/types/catalog'

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
  const q = searchQuery.value.trim()
  if (q) {
    list = list.filter(
      (product) => product.nameFa.includes(q) || (product.descriptionFa ?? '').includes(q)
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
    <h1 class="text-2xl font-bold">فروشگاه</h1>
    <p class="mt-1 text-neutral-500">محصول را ببینید و بلافاصله به سبد اضافه کنید.</p>

    <div class="mt-6 flex flex-wrap gap-2">
      <button
        class="rounded-full border px-4 py-1.5 text-sm"
        :class="selectedCategory === null ? 'border-accent bg-accent text-white' : 'border-neutral-300 hover:border-accent'"
        @click="selectCategory(null)"
      >
        همه
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        class="rounded-full border px-4 py-1.5 text-sm"
        :class="selectedCategory === category.slug ? 'border-accent bg-accent text-white' : 'border-neutral-300 hover:border-accent'"
        @click="selectCategory(category.slug)"
      >
        {{ category.nameFa }}
      </button>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="جستجو..."
        class="w-full max-w-xs rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <label class="flex items-center gap-2 text-sm">
        <input v-model="inStockOnly" type="checkbox" />
        فقط موجود
      </label>
    </div>

    <div
      v-if="filteredProducts.length"
      class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <p v-else class="mt-10 text-center text-neutral-500">محصولی یافت نشد.</p>
  </div>
</template>
