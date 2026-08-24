<script setup lang="ts">
import { getErrorMessage } from '~/utils/getErrorMessage'

definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function login() {
  loading.value = true
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    navigateTo('/admin')
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div dir="rtl" class="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
    <form class="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-6" @submit.prevent="login">
      <h1 class="text-xl font-bold">ورود مدیریت</h1>

      <label class="mt-4 block text-sm">
        نام کاربری
        <input v-model="username" type="text" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <label class="mt-3 block text-sm">
        رمز عبور
        <input v-model="password" type="password" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
      </label>

      <p v-if="errorMessage" class="mt-3 text-sm text-red-600">{{ errorMessage }}</p>

      <button :disabled="loading" class="mt-4 w-full rounded-md bg-neutral-900 py-2 text-sm text-white disabled:opacity-50">
        {{ loading ? 'در حال ورود...' : 'ورود' }}
      </button>
    </form>
  </div>
</template>
