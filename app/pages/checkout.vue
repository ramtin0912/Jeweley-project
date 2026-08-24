<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore'
import { formatToman } from '~/utils/formatToman'
import { getErrorMessage } from '~/utils/getErrorMessage'
import type { OrderResult } from '~/types/order'

const cart = useCartStore()

const form = reactive({
  customerName: '',
  phone: '',
  province: '',
  city: '',
  address: '',
  postalCode: ''
})
const otpCode = ref('')
const otpSent = ref(false)
const sending = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const result = ref<OrderResult | null>(null)

async function sendOtp() {
  errorMessage.value = ''
  sending.value = true
  try {
    await $fetch('/api/auth/otp/send', { method: 'POST', body: { phone: form.phone } })
    otpSent.value = true
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    sending.value = false
  }
}

async function submitOrder() {
  errorMessage.value = ''
  submitting.value = true
  try {
    const items = cart.items.map((item) => ({
      itemType: item.itemType,
      itemId: item.itemId,
      quantity: item.quantity,
      variantId: item.variantId ?? undefined
    }))
    const response = await $fetch<OrderResult>('/api/orders', {
      method: 'POST',
      body: { ...form, otpCode: otpCode.value, items }
    })
    cart.clear()
    if (response.redirectUrl) {
      window.location.href = response.redirectUrl
      return
    }
    result.value = response
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <!-- Success -->
    <div v-if="result" class="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
      <h1 class="text-xl font-bold text-green-800">سفارش ثبت شد</h1>
      <p class="mt-2 text-sm text-green-700">شماره سفارش: {{ result.orderNumber }}</p>
      <p class="mt-1 text-sm text-green-700">مبلغ قابل پرداخت: {{ formatToman(result.totalToman) }}</p>
      <p class="mt-4 text-sm text-neutral-500">پرداخت آنلاین در مرحله بعدی فعال می‌شود.</p>
      <NuxtLink to="/" class="mt-4 inline-block rounded-md bg-neutral-900 px-6 py-2 text-sm text-white">
        بازگشت به فروشگاه
      </NuxtLink>
    </div>

    <!-- Empty cart -->
    <div v-else-if="cart.items.length === 0" class="py-16 text-center">
      <p class="text-neutral-500">سبد خرید خالی است.</p>
      <NuxtLink to="/" class="mt-4 inline-block rounded-md bg-neutral-900 px-6 py-2 text-sm text-white">
        مشاهده محصولات
      </NuxtLink>
    </div>

    <!-- Checkout form -->
    <div v-else>
      <h1 class="text-2xl font-bold">ثبت سفارش</h1>

      <!-- Cart summary -->
      <ul class="mt-4 space-y-2 rounded-lg border border-neutral-200 p-4 text-sm">
        <li v-for="item in cart.items" :key="`${item.itemType}-${item.itemId}-${item.variantId}`" class="flex justify-between">
          <span>{{ item.nameFa }} <span v-if="item.variantLabel" class="text-neutral-500">({{ item.variantLabel }})</span> × {{ item.quantity }}</span>
          <span>{{ formatToman(item.priceToman * item.quantity) }}</span>
        </li>
        <li class="flex justify-between border-t border-neutral-200 pt-2 font-semibold">
          <span>جمع کل</span>
          <span>{{ formatToman(cart.totalToman) }}</span>
        </li>
      </ul>

      <!-- Customer info -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm">
          نام و نام خانوادگی
          <input v-model="form.customerName" type="text" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm">
          شماره موبایل
          <input v-model="form.phone" type="tel" dir="ltr" placeholder="09xxxxxxxxx" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm">
          استان
          <input v-model="form.province" type="text" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm">
          شهر
          <input v-model="form.city" type="text" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm sm:col-span-2">
          آدرس کامل
          <input v-model="form.address" type="text" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm">
          کد پستی (اختیاری)
          <input v-model="form.postalCode" type="text" dir="ltr" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
      </div>

      <!-- OTP -->
      <div class="mt-6 rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center gap-3">
          <input
            v-model="otpCode"
            type="text"
            inputmode="numeric"
            maxlength="5"
            dir="ltr"
            placeholder="کد ۵ رقمی"
            class="w-40 rounded-md border border-neutral-300 px-3 py-2 text-center tracking-widest"
          />
          <button
            :disabled="sending"
            class="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:border-accent disabled:opacity-50"
            @click="sendOtp"
          >
            {{ sending ? 'در حال ارسال...' : otpSent ? 'ارسال مجدد' : 'ارسال کد' }}
          </button>
        </div>
        <p v-if="otpSent" class="mt-2 text-xs text-neutral-500">کد تأیید ارسال شد.</p>
      </div>

      <p v-if="errorMessage" class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{{ errorMessage }}</p>

      <button
        :disabled="submitting || !otpSent"
        class="mt-6 w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        @click="submitOrder"
      >
        {{ submitting ? 'در حال ثبت...' : 'ثبت نهایی سفارش' }}
      </button>
    </div>
  </div>
</template>
