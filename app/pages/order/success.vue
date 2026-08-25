<script setup lang="ts">
const route = useRoute()
const orderNumber = (route.query.orderNumber as string) ?? ''
</script>

<template>
  <div class="mx-auto max-w-md py-12 text-center">
    <div class="border border-gold/40 bg-ink-800 p-8">
      <span aria-hidden="true" class="font-serif text-4xl text-gold-400">✦</span>
      <h1 class="mt-4 font-serif text-2xl font-bold text-ivory">پرداخت موفق</h1>
      <p class="mt-2 text-ivory-400">سفارش شما با موفقیت ثبت و پرداخت شد.</p>
      <p v-if="orderNumber" class="mt-2 text-gold-300">شماره سفارش: {{ orderNumber }}</p>
      <NuxtLink
        to="/"
        class="mt-6 inline-block border border-gold bg-gold px-8 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300"
      >
        بازگشت به فروشگاه
      </NuxtLink>
    </div>
  </div>
</template>
