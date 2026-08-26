<script setup lang="ts">
import type { Earnings } from '~/types/admin'
import { formatToman } from '~/utils/formatToman'
import { toShamsiDate } from '~/utils/shamsiDate'

definePageMeta({ layout: 'admin' })

const { data } = await useFetch<Earnings>('/api/admin/earnings')
</script>

<template>
  <div>
    <div class="flex items-center gap-3">
      <h1 class="font-serif text-3xl font-bold text-neutral-900">داشبورد</h1>
      <span class="h-px flex-1 bg-neutral-200"></span>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="mbx-panel">
        <p class="text-sm text-neutral-500">درآمد کل</p>
        <p class="mt-2 text-3xl font-bold text-clay">{{ formatToman(data?.totalRevenue ?? 0) }}</p>
      </div>
      <div class="mbx-panel">
        <p class="text-sm text-neutral-500">سفارش‌های پرداخت‌شده</p>
        <p class="mt-2 text-3xl font-bold">{{ data?.orderCount ?? 0 }}</p>
      </div>
    </div>

    <h2 class="mt-8 flex items-center gap-2 text-lg font-semibold">
      <span aria-hidden="true" class="text-ice-500">✦</span>
      فروش به تفکیک محصول
    </h2>
    <div class="mbx-panel mt-3 overflow-x-auto p-0">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-neutral-200 text-right">
            <th class="p-3 font-medium text-neutral-500">محصول</th>
            <th class="p-3 font-medium text-neutral-500">تعداد</th>
            <th class="p-3 font-medium text-neutral-500">درآمد</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.perProduct ?? []" :key="item.nameFa" class="border-b border-neutral-100 last:border-0">
            <td class="p-3">{{ item.nameFa }}</td>
            <td class="p-3">{{ item.quantity }}</td>
            <td class="p-3 text-clay">{{ formatToman(item.revenue) }}</td>
          </tr>
          <tr v-if="!data?.perProduct?.length">
            <td colspan="3" class="p-3 text-center text-neutral-500">هنوز فروشی ثبت نشده است.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="mt-8 flex items-center gap-2 text-lg font-semibold">
      <span aria-hidden="true" class="text-ice-500">✦</span>
      آخرین سفارش‌ها
    </h2>
    <ul class="mt-3 space-y-2">
      <li
        v-for="order in data?.recentOrders ?? []"
        :key="order.orderNumber"
        class="flex flex-wrap justify-between gap-2 rounded-xl border border-neutral-200 bg-white p-3.5 text-sm transition-colors hover:border-neutral-300"
      >
        <span>{{ order.orderNumber }} — {{ order.customerName }}</span>
        <span>{{ formatToman(order.totalToman) }} · {{ toShamsiDate(order.paidAt) }}</span>
      </li>
      <li v-if="!data?.recentOrders?.length" class="rounded-xl border border-neutral-200 bg-white p-3.5 text-sm text-neutral-500">
        سفارشی ثبت نشده است.
      </li>
    </ul>
  </div>
</template>
