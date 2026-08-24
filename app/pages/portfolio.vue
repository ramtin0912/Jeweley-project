<script setup lang="ts">
import type { PortfolioWork } from '~/types/catalog'

useSeoMeta({
  title: 'نمونه‌کارها',
  description: 'آثار قبلی و سفارشی.'
})

const { data: works } = await useFetch<PortfolioWork[]>('/api/portfolio', { default: () => [] })
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">نمونه‌کارها</h1>
    <p class="mt-1 text-neutral-500">آثار قبلی برای نمایش.</p>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="work in works" :key="work.id" class="rounded-lg border border-neutral-200 p-4">
        <div class="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-neutral-100">
          <img
            v-if="work.image"
            :src="work.image"
            :alt="work.titleFa"
            class="h-full w-full object-cover"
          />
          <span v-else class="text-4xl text-neutral-400">{{ work.titleFa.charAt(0) }}</span>
        </div>
        <h2 class="mt-3 font-medium">{{ work.titleFa }}</h2>
        <p class="mt-1 text-sm text-neutral-600">{{ work.descriptionFa }}</p>
        <p class="mt-2 text-xs text-neutral-500">
          {{ work.material }}<span v-if="work.year"> · {{ work.year }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
