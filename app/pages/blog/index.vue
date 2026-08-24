<script setup lang="ts">
import type { BlogPostSummary } from '~/types/blog'
import { toShamsiDate } from '~/utils/shamsiDate'

useSeoMeta({ title: 'وبلاگ', description: 'مقالات راهنمای خرید زیورآلات دست‌ساز' })

const { data: posts } = await useFetch<BlogPostSummary[]>('/api/posts', { default: () => [] })
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="text-2xl font-bold">وبلاگ</h1>

    <div class="mt-6 space-y-4">
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="block rounded-lg border border-neutral-200 p-4 transition hover:border-accent"
      >
        <h2 class="font-semibold">{{ post.titleFa }}</h2>
        <p v-if="post.seoDescription" class="mt-1 text-sm text-neutral-600">{{ post.seoDescription }}</p>
        <p class="mt-2 text-xs text-neutral-500">{{ toShamsiDate(post.publishedAt) }}</p>
      </NuxtLink>

      <p v-if="!posts?.length" class="text-neutral-500">مقاله‌ای منتشر نشده است.</p>
    </div>
  </div>
</template>
