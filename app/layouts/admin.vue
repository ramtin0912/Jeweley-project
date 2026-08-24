<script setup lang="ts">
const checking = ref(true)

onMounted(async () => {
  try {
    await $fetch('/api/admin/auth/me')
  } catch {
    navigateTo('/admin/login')
  } finally {
    checking.value = false
  }
})

async function logout() {
  await $fetch('/api/admin/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}

const links = [
  { to: '/admin', label: 'داشبورد' },
  { to: '/admin/products', label: 'محصولات' },
  { to: '/admin/packages', label: 'پکیج‌ها' },
  { to: '/admin/portfolio', label: 'نمونه‌کارها' },
  { to: '/admin/orders', label: 'سفارش‌ها' }
]
</script>

<template>
  <div dir="rtl" class="min-h-screen bg-neutral-100">
    <header class="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3">
      <div class="flex flex-wrap items-center gap-6">
        <span class="font-bold">مدیریت فروشگاه</span>
        <nav class="flex gap-4 text-sm">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="hover:text-accent">
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
      <button class="text-sm text-neutral-600 hover:text-red-600" @click="logout">خروج</button>
    </header>

    <main v-if="!checking" class="mx-auto max-w-6xl px-6 py-8">
      <slot />
    </main>
    <p v-else class="p-10 text-center text-neutral-500">در حال بارگذاری...</p>
  </div>
</template>
