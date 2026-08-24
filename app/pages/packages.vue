<script setup lang="ts">
import type { Package } from '~/types/catalog'
import { formatToman } from '~/utils/formatToman'
import { useCartStore } from '~/stores/cartStore'
import { useCartDrawer } from '~/composables/useCartDrawer'

useSeoMeta({
  title: 'پکیج‌ها',
  description: 'پکیج‌های چند محصولی با قیمت ثابت.'
})

const { data: packages } = await useFetch<Package[]>('/api/packages', { default: () => [] })
const cart = useCartStore()
const { open } = useCartDrawer()

function addPackage(pkg: Package) {
  if (pkg.stockCount <= 0) return
  cart.addItem({
    itemType: 'package',
    itemId: pkg.id,
    nameFa: pkg.nameFa,
    priceToman: pkg.priceToman,
    quantity: 1,
    image: pkg.image,
    slug: pkg.slug,
    variantId: null,
    variantLabel: null
  })
  open()
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">پکیج‌ها</h1>
    <p class="mt-1 text-neutral-500">چند محصول در یک بسته با قیمت ثابت.</p>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <div v-for="pkg in packages" :key="pkg.id" class="rounded-lg border border-neutral-200 p-5">
        <h2 class="text-lg font-semibold">{{ pkg.nameFa }}</h2>
        <p class="mt-1 text-neutral-600">{{ pkg.descriptionFa }}</p>

        <ul class="mt-4 space-y-1 text-sm text-neutral-600">
          <li v-for="item in pkg.items" :key="item.id">
            {{ item.product.nameFa }} <span v-if="item.variant">({{ item.variant.value }})</span>
            × {{ item.quantity }}
          </li>
        </ul>

        <p class="mt-4 text-lg font-medium text-accent-dark">{{ formatToman(pkg.priceToman) }}</p>

        <button
          v-if="pkg.stockCount > 0"
          class="mt-4 w-full rounded-md bg-neutral-900 py-2 text-sm text-white hover:bg-neutral-700"
          @click="addPackage(pkg)"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  </div>
</template>
