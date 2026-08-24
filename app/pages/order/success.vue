<script setup lang="ts">
const route = useRoute()
const orderNumber = (route.query.orderNumber as string) ?? ''
</script>

<template>
  <div class="mx-auto max-w-md py-12 text-center">
    <div class="rounded-lg border border-green-200 bg-green-50 p-6">
      <h1 class="text-xl font-bold text-green-800">پرداخت موفق</h1>
      <p class="mt-2 text-sm text-green-700">سفارش شما با موفقیت ثبت و پرداخت شد.</p>
      <p v-if="orderNumber" class="mt-1 text-sm text-green-700">شماره سفارش: {{ orderNumber }}</p>
      <NuxtLink to="/" class="mt-4 inline-block rounded-md bg-neutral-900 px-6 py-2 text-sm text-white">
        بازگشت به فروشگاه
      </NuxtLink>
    </div>
  </div>
</template>
