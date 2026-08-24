<script setup lang="ts">
import type { BlogPostDetail } from '~/types/blog'
import { toShamsiDate } from '~/utils/shamsiDate'

const route = useRoute()
const slug = route.params.slug as string

const { data: post, error } = await useFetch<BlogPostDetail>(`/api/posts/${slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'پست یافت نشد', fatal: true })
}

useSeoMeta({
  title: () => post.value?.seoTitle || post.value?.titleFa || 'وبلاگ',
  description: () => post.value?.seoDescription || ''
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl">
    <h1 class="text-2xl font-bold">{{ post.titleFa }}</h1>
    <p class="mt-2 text-sm text-neutral-500">{{ toShamsiDate(post.publishedAt) }}</p>
    <div class="markdown-content mt-6" v-html="post.contentHtml"></div>
  </article>
</template>
