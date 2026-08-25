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
    <p dir="ltr" class="font-engraved text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400/80">
      Portfolio
    </p>
    <div class="mt-3 flex items-center gap-4">
      <h1 class="font-serif text-3xl font-bold text-ivory sm:text-4xl">نمونه‌کارها</h1>
      <span class="h-px flex-1 bg-gold/15"></span>
    </div>
    <p class="mt-3 max-w-xl text-ivory-400">آثار قبلی و سفارشی — گواهِ دستانِ سازنده.</p>

    <div class="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
      <figure
        v-for="(work, index) in works"
        :key="work.id"
        class="reveal group mb-6 break-inside-avoid"
        :style="{ animationDelay: `${Math.min(index, 5) * 70}ms` }"
      >
        <div class="relative overflow-hidden border border-gold/15 bg-ink-900">
          <img
            v-if="work.image"
            :src="work.image"
            :alt="work.titleFa"
            class="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            v-else
            class="flex aspect-square w-full items-center justify-center font-serif text-6xl text-gold-500/40"
          >
            {{ work.titleFa.charAt(0) }}
          </div>
          <div aria-hidden="true" class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"></div>
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></div>
        </div>

        <figcaption class="mt-3.5">
          <h2 class="font-serif text-xl font-bold text-ivory transition-colors duration-300 group-hover:text-gold-300">
            {{ work.titleFa }}
          </h2>
          <p v-if="work.descriptionFa" class="mt-1.5 text-sm leading-relaxed text-ivory-400">{{ work.descriptionFa }}</p>
          <p class="mt-2 text-xs text-ivory-500">
            {{ work.material }}
            <span v-if="work.year" class="mx-1.5 text-gold-500">✦</span>
            <span v-if="work.year">{{ work.year }}</span>
          </p>
        </figcaption>
      </figure>

      <p v-if="!works?.length" class="text-ivory-400">نمونه‌کاری ثبت نشده است.</p>
    </div>
  </div>
</template>
