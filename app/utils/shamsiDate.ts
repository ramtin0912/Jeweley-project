/**
 * @file shamsiDate
 * @description Shamsi (Persian) date formatting via Intl.DateTimeFormat.
 *
 * @status None
 * @issues None
 * @todo None
 */
export function toShamsiDate(value: Date | string | null | undefined): string {
  if (!value) return '—'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return '—'
  try {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch {
    return date.toLocaleDateString('fa-IR')
  }
}
