/**
 * @file seed
 * @description Demo catalog seed (categories, products, packages, portfolio).
 *   Real catalog is entered through the admin panel in a later stage.
 *
 * @status Demo data only
 * @issues None
 * @todo Replace with the real product catalog.
 */
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })

async function main() {
  // Clear existing data (order matters for foreign keys).
  await prisma.packageItem.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.portfolioWork.deleteMany()
  await prisma.package.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Categories
  const necklace = await prisma.category.create({
    data: { nameFa: 'گردنبند', slug: 'necklace', sortOrder: 1 }
  })
  const bracelet = await prisma.category.create({
    data: { nameFa: 'دستبند', slug: 'bracelet', sortOrder: 2 }
  })
  const earrings = await prisma.category.create({
    data: { nameFa: 'گوشواره', slug: 'earrings', sortOrder: 3 }
  })
  const ring = await prisma.category.create({
    data: { nameFa: 'انگشتر', slug: 'ring', sortOrder: 4 }
  })

  // Products
  const necklaceMoon = await prisma.product.create({
    data: {
      categoryId: necklace.id,
      nameFa: 'گردنبند نقره طرح ماه',
      slug: 'gardanband-mah',
      descriptionFa: 'گردنبند نقره ۹۲۵ با آویز طرح ماه، سبک و مناسب استفاده روزمره.',
      priceToman: 1_250_000,
      material: 'نقره ۹۲۵',
      weightGrams: 8.5,
      stockCount: 3,
      variants: {
        create: [
          { label: 'طول زنجیر', value: '۴۰ سانتی‌متر', priceDeltaToman: 0, stockCount: 3 },
          { label: 'طول زنجیر', value: '۴۵ سانتی‌متر', priceDeltaToman: 100_000, stockCount: 2 }
        ]
      }
    }
  })

  const necklaceMinimal = await prisma.product.create({
    data: {
      categoryId: necklace.id,
      nameFa: 'گردنبند نقره مینیمال',
      slug: 'gardanband-minimal',
      descriptionFa: 'گردنبند ظریف و مینیمال نقره، بدون نگین و مناسب استایل روزمره.',
      priceToman: 980_000,
      material: 'نقره ۹۲۵',
      weightGrams: 5.2,
      stockCount: 5
    }
  })

  const braceletChain = await prisma.product.create({
    data: {
      categoryId: bracelet.id,
      nameFa: 'دستبند نقره زنجیری',
      slug: 'dastband-zanjiri',
      descriptionFa: 'دستبند زنجیری نقره با قفل محکم و روکش ضد حساسیت.',
      priceToman: 1_450_000,
      material: 'نقره ۹۲۵',
      weightGrams: 12.0,
      stockCount: 4
    }
  })

  const earringsDrop = await prisma.product.create({
    data: {
      categoryId: earrings.id,
      nameFa: 'گوشواره نقره اشکی',
      slug: 'gushvare-ashki',
      descriptionFa: 'گوشواره آویز اشکی نقره، سبک و مناسب هدیه.',
      priceToman: 720_000,
      material: 'نقره ۹۲۵',
      weightGrams: 4.0,
      stockCount: 6
    }
  })

  const ringAgate = await prisma.product.create({
    data: {
      categoryId: ring.id,
      nameFa: 'انگشتر نقره عقیق',
      slug: 'angoshtar-aghigh',
      descriptionFa: 'انگشتر نقره با نگین عقیق طبیعی، سایز قابل تنظیم.',
      priceToman: 1_100_000,
      material: 'نقره ۹۲۵ و عقیق',
      weightGrams: 7.8,
      stockCount: 2
    }
  })

  const necklaceExclusive = await prisma.product.create({
    data: {
      categoryId: necklace.id,
      nameFa: 'گردنبند نقره اختصاصی',
      slug: 'gardanband-ekhtesasi',
      descriptionFa: 'قطعه تک و اختصاصی با دست‌ساز کامل و طرح منحصر به فرد.',
      priceToman: 3_500_000,
      material: 'نقره ۹۲۵',
      weightGrams: 15.0,
      stockCount: 1,
      isExclusive: true
    }
  })

  // Packages (admin-curated, fixed price, sold as a single unit)
  await prisma.package.create({
    data: {
      nameFa: 'ست نقره هدیه',
      slug: 'set-noqreh-hediyeh',
      descriptionFa: 'ست گردنبند و دستبند نقره، بسته‌بندی هدیه.',
      priceToman: 2_200_000,
      stockCount: 2,
      items: {
        create: [
          { productId: necklaceMoon.id, quantity: 1 },
          { productId: braceletChain.id, quantity: 1 }
        ]
      }
    }
  })

  await prisma.package.create({
    data: {
      nameFa: 'پکیج هدیه عروس',
      slug: 'hediyeh-aroos',
      descriptionFa: 'ست گردنبند مینیمال و گوشواره اشکی، مناسب هدیه عروس.',
      priceToman: 1_650_000,
      stockCount: 1,
      items: {
        create: [
          { productId: necklaceMinimal.id, quantity: 1 },
          { productId: earringsDrop.id, quantity: 1 }
        ]
      }
    }
  })

  // Portfolio (past works — display only)
  await prisma.portfolioWork.create({
    data: {
      titleFa: 'گردنبند سفارشی عروس',
      descriptionFa: 'سفارش اختصاصی با زیرکن و پرداخت دستی.',
      material: 'نقره و زیرکن',
      year: 1403,
      isFeatured: true
    }
  })

  await prisma.portfolioWork.create({
    data: {
      titleFa: 'دستبند دست‌ساز گره',
      descriptionFa: 'بافت گره سنتی با مفتول نقره.',
      material: 'نقره ۹۲۵',
      year: 1402
    }
  })

  await prisma.portfolioWork.create({
    data: {
      titleFa: 'ست گوشواره و گردنبند مروارید',
      descriptionFa: 'ترکیب مروارید طبیعی و نقره.',
      material: 'نقره و مروارید',
      year: 1401
    }
  })

  // Admin (single admin; default password via ADMIN_PASSWORD env, fallback admin1234)
  await prisma.admin.deleteMany()
  await prisma.admin.create({
    data: {
      username: 'admin',
      passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin1234', 10)
    }
  })

  console.log('Seed complete.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
