<script setup lang="ts">
import type { PortfolioWork } from '~/types/catalog'
import { getErrorMessage } from '~/utils/getErrorMessage'

definePageMeta({ layout: 'admin' })

const { data: works, refresh } = await useFetch<PortfolioWork[]>('/api/admin/portfolio')

const showForm = ref(false)
const editingId = ref<number | null>(null)
const saving = ref(false)
const errorMessage = ref('')

interface PortfolioForm {
  titleFa: string
  descriptionFa: string
  image: string | null
  material: string
  year: string
  isFeatured: boolean
}

const emptyForm = (): PortfolioForm => ({
  titleFa: '', descriptionFa: '', image: null, material: '', year: '', isFeatured: false
})

const form = reactive<PortfolioForm>(emptyForm())

function openCreate() {
  Object.assign(form, emptyForm())
  editingId.value = null
  showForm.value = true
  errorMessage.value = ''
}

function openEdit(work: PortfolioWork) {
  Object.assign(form, {
    titleFa: work.titleFa,
    descriptionFa: work.descriptionFa ?? '',
    image: work.image ?? null,
    material: work.material ?? '',
    year: work.year != null ? String(work.year) : '',
    isFeatured: work.isFeatured
  })
  editingId.value = work.id
  showForm.value = true
  errorMessage.value = ''
}

async function save() {
  saving.value = true
  errorMessage.value = ''
  try {
    const payload = {
      titleFa: form.titleFa,
      descriptionFa: form.descriptionFa || null,
      image: form.image?.trim() || null,
      material: form.material || null,
      year: form.year.trim() ? Number(form.year) : null,
      isFeatured: form.isFeatured
    }
    if (editingId.value) {
      await $fetch(`/api/admin/portfolio/${editingId.value}`, { method: 'PATCH', body: payload })
    } else {
      await $fetch('/api/admin/portfolio', { method: 'POST', body: payload })
    }
    showForm.value = false
    refresh()
  } catch (error) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    saving.value = false
  }
}

async function remove(work: PortfolioWork) {
  if (!confirm(`حذف «${work.titleFa}»؟`)) return
  try {
    await $fetch(`/api/admin/portfolio/${work.id}`, { method: 'DELETE' })
    refresh()
  } catch (error) {
    alert(getErrorMessage(error))
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">نمونه‌کارها</h1>
      <button class="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white" @click="openCreate">
        نمونه‌کار جدید
      </button>
    </div>

    <form v-if="showForm" class="mt-6 rounded-lg border border-neutral-200 bg-white p-5" @submit.prevent="save">
      <h2 class="font-semibold">{{ editingId ? 'ویرایش نمونه‌کار' : 'نمونه‌کار جدید' }}</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm">عنوان
          <input v-model="form.titleFa" type="text" required class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm">جنس
          <input v-model="form.material" type="text" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <AdminImageUpload v-model="form.image" folder="portfolio" label="تصویر" />
        <label class="block text-sm">سال
          <input v-model="form.year" type="text" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2" />
        </label>
        <label class="block text-sm sm:col-span-2">توضیحات
          <textarea v-model="form.descriptionFa" rows="2" class="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"></textarea>
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="form.isFeatured" type="checkbox" />
          نمایش ویژه
        </label>
      </div>

      <p v-if="errorMessage" class="mt-3 text-sm text-red-600">{{ errorMessage }}</p>

      <div class="mt-4 flex gap-2">
        <button :disabled="saving" class="rounded-md bg-neutral-900 px-5 py-2 text-sm text-white disabled:opacity-50">
          {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
        </button>
        <button type="button" class="rounded-md border border-neutral-300 px-5 py-2 text-sm" @click="showForm = false">
          انصراف
        </button>
      </div>
    </form>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="work in works" :key="work.id" class="rounded-lg border border-neutral-200 bg-white p-4">
        <h3 class="font-semibold">{{ work.titleFa }}</h3>
        <p class="mt-1 text-sm text-neutral-600">{{ work.descriptionFa }}</p>
        <p class="mt-2 text-xs text-neutral-500">{{ work.material }}<span v-if="work.year"> · {{ work.year }}</span></p>
        <div class="mt-3 flex gap-3">
          <button class="text-sm text-accent-dark" @click="openEdit(work)">ویرایش</button>
          <button class="text-sm text-red-600" @click="remove(work)">حذف</button>
        </div>
      </div>
      <p v-if="!works?.length" class="text-neutral-500">نمونه‌کاری ثبت نشده است.</p>
    </div>
  </div>
</template>
