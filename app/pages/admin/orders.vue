<script setup lang="ts">
import type { Order } from '~/types/admin'
import { formatToman } from '~/utils/formatToman'
import { toShamsiDate } from '~/utils/shamsiDate'
import { getErrorMessage } from '~/utils/getErrorMessage'

definePageMeta({ layout: 'admin' })

const { data: orders, refresh } = await useFetch<Order[]>('/api/admin/orders')

const statusFilter = ref('')
const filtered = computed(() => {
  if (!statusFilter.value) return orders.value ?? []
  return (orders.value ?? []).filter((o) => o.status === statusFilter.value)
})

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'در انتظار پرداخت',
  PAID: 'پرداخت شده',
  SHIPPED: 'ارسال شده',
  DELIVERED: 'تحویل شده',
  CANCELED: 'لغو شده'
}

async function updateStatus(order: Order, status: string) {
  try {
    await $fetch(`/api/admin/orders/${order.id}`, { method: 'PATCH', body: { status } })
    refresh()
  } catch (error) {
    alert(getErrorMessage(error))
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">سفارش‌ها</h1>

    <div class="mt-4 flex items-center gap-2">
      <span class="text-sm text-neutral-500">فیلتر وضعیت:</span>
      <select v-model="statusFilter" class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm">
        <option value="">همه</option>
        <option v-for="(label, key) in STATUS_LABELS" :key="key" :value="key">{{ label }}</option>
      </select>
    </div>

    <div class="mt-4 space-y-3">
      <div v-for="order in filtered" :key="order.id" class="rounded-lg border border-neutral-200 bg-white p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="font-medium">{{ order.orderNumber }}</p>
            <p class="text-sm text-neutral-500">{{ order.customerName }} · {{ order.customerPhone }}</p>
            <p class="mt-1 text-sm text-neutral-600">{{ order.province }}، {{ order.city }} — {{ order.address }}</p>
          </div>
          <div class="text-left">
            <p class="font-medium text-accent-dark">{{ formatToman(order.totalToman) }}</p>
            <p class="text-xs text-neutral-500">{{ toShamsiDate(order.createdAt) }}</p>
          </div>
        </div>

        <div class="mt-3 border-t border-neutral-100 pt-3">
          <p class="mb-1 text-sm font-medium">اقلام:</p>
          <ul class="text-sm text-neutral-600">
            <li v-for="item in order.items" :key="item.id">
              {{ item.nameFa }} <span v-if="item.variantLabel">({{ item.variantLabel }})</span> × {{ item.quantity }} — {{ formatToman(item.priceToman) }}
            </li>
          </ul>
        </div>

        <div class="mt-3 flex items-center gap-2">
          <span class="text-sm">وضعیت:</span>
          <select :value="order.status" class="rounded-md border border-neutral-300 px-3 py-1.5 text-sm" @change="updateStatus(order, ($event.target as HTMLSelectElement).value)">
            <option v-for="(label, key) in STATUS_LABELS" :key="key" :value="key">{{ label }}</option>
          </select>
        </div>
      </div>

      <p v-if="!filtered.length" class="rounded-lg border border-neutral-200 bg-white p-6 text-center text-neutral-500">
        سفارشی یافت نشد.
      </p>
    </div>
  </div>
</template>
