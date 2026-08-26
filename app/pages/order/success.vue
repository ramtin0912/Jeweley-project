<script setup lang="ts">
const route = useRoute()
const orderNumber = (route.query.orderNumber as string) ?? ''
</script>

<template>
  <div class="mx-auto max-w-md py-16 text-center">
    <div class="rounded-2xl border border-silver/70 bg-white p-8">
      <span aria-hidden="true" class="font-serif text-4xl text-ice-500">✦</span>
      <h1 class="mt-4 font-serif text-3xl font-bold text-ink">پرداخت موفق</h1>
      <p class="mt-2 text-ink-400">سفارش شما با موفقیت ثبت و پرداخت شد.</p>
      <p v-if="orderNumber" class="mt-2 text-ink-500">شماره سفارش: {{ orderNumber }}</p>
      <NuxtLink to="/" class="btn-primary mt-6">بازگشت به فروشگاه</NuxtLink>
    </div>
  </div>
</template>
