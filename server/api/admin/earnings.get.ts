/**
 * @file earnings
 * @description GET /api/admin/earnings — paid-order revenue summary.
 *
 * @status None
 * @issues None
 * @todo Add date-range filter when needed.
 */
import { prisma } from '~~/server/utils/prisma'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const paidOrders = await prisma.order.findMany({
    where: { status: 'PAID' },
    include: { items: true },
    orderBy: { paidAt: 'desc' }
  })

  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalToman, 0)

  const byItem = new Map<number, { nameFa: string; quantity: number; revenue: number }>()
  for (const order of paidOrders) {
    for (const item of order.items) {
      const existing = byItem.get(item.itemId)
      const revenue = item.priceToman * item.quantity
      if (existing) {
        existing.quantity += item.quantity
        existing.revenue += revenue
      } else {
        byItem.set(item.itemId, { nameFa: item.nameFa, quantity: item.quantity, revenue })
      }
    }
  }

  return {
    totalRevenue,
    orderCount: paidOrders.length,
    perProduct: [...byItem.values()].sort((a, b) => b.revenue - a.revenue),
    recentOrders: paidOrders.slice(0, 10).map((o) => ({
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalToman: o.totalToman,
      paidAt: o.paidAt,
      itemCount: o.items.length
    }))
  }
})
