<script setup lang="ts">
import type { BlogPostSummary } from '~/types/blog'
import { toShamsiDate } from '~/utils/shamsiDate'

useSeoMeta({ title: 'وبلاگ', description: 'مقالات راهنمای خرید زیورآلات دست‌ساز' })

const { data: posts } = await useFetch<BlogPostSummary[]>('/api/posts', { default: () => [] })
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <p dir="ltr" class="font-engraved text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400/80">
      Journal
    </p>
    <div class="mt-3 flex items-center gap-4">
      <h1 class="font-serif text-3xl font-bold text-ivory sm:text-4xl">وبلاگ</h1>
      <span class="h-px flex-1 bg-gold/15"></span>
    </div>

    <div class="mt-8 divide-y divide-gold/10 border-y border-gold/15">
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group block py-6 transition-colors duration-300"
      >
        <h2 class="font-serif text-xl font-bold text-ivory transition-colors duration-300 group-hover:text-gold-300">
          {{ post.titleFa }}
        </h2>
        <p v-if="post.seoDescription" class="mt-2 leading-relaxed text-ivory-400">{{ post.seoDescription }}</p>
        <p class="mt-3 text-xs text-ivory-500">
          {{ toShamsiDate(post.publishedAt) }}
          <span aria-hidden="true" class="mx-1.5 text-gold-500">✦</span>
          <span class="text-gold-400/70">مطالعه</span>
        </p>
      </NuxtLink>
    </div>

    <p v-if="!posts?.length" class="mt-8 text-ivory-400">مقاله‌ای منتشر نشده است.</p>
  </div>
</template>
