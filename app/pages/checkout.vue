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
    <div v-if="result" class="border border-gold/40 bg-ink-800 p-10 text-center">
      <span aria-hidden="true" class="font-serif text-4xl text-gold-400">✦</span>
      <h1 class="mt-4 font-serif text-2xl font-bold text-ivory">سفارش ثبت شد</h1>
      <p class="mt-3 text-gold-300">شماره سفارش: {{ result.orderNumber }}</p>
      <p class="mt-1 text-ivory-400">مبلغ قابل پرداخت: {{ formatToman(result.totalToman) }}</p>
      <p class="mt-4 text-sm text-ivory-500">پرداخت آنلاین در مرحله بعدی فعال می‌شود.</p>
      <NuxtLink
        to="/"
        class="mt-6 inline-block border border-gold bg-gold px-8 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300"
      >
        بازگشت به فروشگاه
      </NuxtLink>
    </div>

    <!-- Empty cart -->
    <div v-else-if="cart.items.length === 0" class="flex flex-col items-center py-20 text-center">
      <span aria-hidden="true" class="font-serif text-4xl text-gold-500/50">✦</span>
      <p class="mt-4 text-ivory-400">سبد خرید خالی است.</p>
      <NuxtLink
        to="/"
        class="mt-6 border border-gold/40 px-8 py-2.5 text-sm font-medium text-gold-300 transition-all hover:border-gold hover:text-gold-200"
      >
        مشاهده محصولات
      </NuxtLink>
    </div>

    <!-- Checkout form -->
    <div v-else>
      <div class="flex items-center gap-4">
        <h1 class="font-serif text-3xl font-bold text-ivory">ثبت سفارش</h1>
        <span class="h-px flex-1 bg-gold/15"></span>
      </div>

      <!-- Cart summary -->
      <ul class="mt-6 space-y-2.5 border border-gold/15 bg-ink-800 p-5 text-sm">
        <li
          v-for="item in cart.items"
          :key="`${item.itemType}-${item.itemId}-${item.variantId}`"
          class="flex justify-between gap-4"
        >
          <span class="text-ivory-400">
            {{ item.nameFa }}
            <span v-if="item.variantLabel" class="text-ivory-500">({{ item.variantLabel }})</span>
            × {{ item.quantity }}
          </span>
          <span class="text-ivory">{{ formatToman(item.priceToman * item.quantity) }}</span>
        </li>
        <li class="flex justify-between border-t border-gold/15 pt-3 font-medium text-ivory">
          <span>جمع کل</span>
          <span class="text-gold-400">{{ formatToman(cart.totalToman) }}</span>
        </li>
      </ul>

      <!-- Customer info -->
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm text-ivory-400">
          نام و نام خانوادگی
          <input v-model="form.customerName" type="text" required class="field-input" />
        </label>
        <label class="block text-sm text-ivory-400">
          شماره موبایل
          <input v-model="form.phone" type="tel" dir="ltr" placeholder="09xxxxxxxxx" required class="field-input" />
        </label>
        <label class="block text-sm text-ivory-400">
          استان
          <input v-model="form.province" type="text" required class="field-input" />
        </label>
        <label class="block text-sm text-ivory-400">
          شهر
          <input v-model="form.city" type="text" required class="field-input" />
        </label>
        <label class="block text-sm text-ivory-400 sm:col-span-2">
          آدرس کامل
          <input v-model="form.address" type="text" required class="field-input" />
        </label>
        <label class="block text-sm text-ivory-400">
          کد پستی (اختیاری)
          <input v-model="form.postalCode" type="text" dir="ltr" class="field-input" />
        </label>
      </div>

      <!-- OTP -->
      <div class="mt-6 border border-gold/15 bg-ink-800 p-5">
        <div class="flex flex-wrap items-center gap-3">
          <input
            v-model="otpCode"
            type="text"
            inputmode="numeric"
            maxlength="5"
            dir="ltr"
            placeholder="کد ۵ رقمی"
            class="w-40 border border-gold/20 bg-ink-700 px-3 py-2.5 text-center tracking-widest text-ivory placeholder:text-ivory-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
          />
          <button
            :disabled="sending"
            class="border border-gold/40 px-5 py-2.5 text-sm text-gold-300 transition-all duration-300 hover:border-gold hover:text-gold-200 disabled:cursor-not-allowed disabled:opacity-50"
            @click="sendOtp"
          >
            {{ sending ? 'در حال ارسال...' : otpSent ? 'ارسال مجدد' : 'ارسال کد' }}
          </button>
        </div>
        <p v-if="otpSent" class="mt-3 text-xs text-gold-400/80">کد تأیید ارسال شد.</p>
      </div>

      <p v-if="errorMessage" class="mt-4 border border-red-400/30 bg-red-950/40 p-3.5 text-sm text-red-300">{{ errorMessage }}</p>

      <button
        :disabled="submitting || !otpSent"
        class="mt-6 w-full border border-gold bg-gold py-3.5 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        @click="submitOrder"
      >
        {{ submitting ? 'در حال ثبت...' : 'ثبت نهایی سفارش' }}
      </button>
    </div>
  </div>
</template>
