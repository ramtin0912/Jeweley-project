/**
 * @file admin
 * @description Admin panel DTO types.
 *
 * @status None
 * @issues None
 * @todo None
 */

export interface OrderItem {
  id: number
  nameFa: string
  priceToman: number
  quantity: number
  variantLabel: string | null
}

export interface Order {
  id: number
  orderNumber: string
  customerName: string
  customerPhone: string
  province: string
  city: string
  address: string
  postalCode: string | null
  status: string
  totalToman: number
  paidAt: string | null
  createdAt: string
  items: OrderItem[]
}

export interface Earnings {
  totalRevenue: number
  orderCount: number
  perProduct: Array<{ nameFa: string; quantity: number; revenue: number }>
  recentOrders: Array<{
    orderNumber: string
    customerName: string
    totalToman: number
    paidAt: string | null
    itemCount: number
  }>
}
