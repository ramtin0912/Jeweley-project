/**
 * @file orders index
 * @description GET /api/admin/orders — all orders with items. Query: status.
 *
 * @status None
 * @issues None
 * @todo None
 */
import { prisma } from '~~/server/utils/prisma'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const query = getQuery(event)
  const status = typeof query.status === 'string' ? query.status : undefined

  return prisma.order.findMany({
    where: status ? { status: status as 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' } : {},
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 100
  })
})
