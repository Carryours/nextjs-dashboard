import { PrismaClient, Prisma } from '@prisma/client'
import { invoices, customers, revenue, users } from '../lib/placeholder-data';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

const usersData: Prisma.usersCreateInput[] = users.map(item => ({...item, id: uuidv4()}))
const invoicesData: Prisma.invoicesCreateInput[] = invoices.map(item => ({...item, id: uuidv4()}))
const customersData: Prisma.customersCreateInput[] = customers.map(item => ({...item }))
const revenueData: Prisma.revenueCreateInput[] = revenue.map(item => ({ ...item, id: uuidv4() }))
export async function GET() {
  try {
    await prisma.users.createMany({
      data: usersData
    })
    await prisma.customers.createMany({
      data: customersData
    })
    await prisma.revenue.createMany({
      data: revenueData
    })
    await prisma.invoices.createMany({
      data: invoicesData
    })

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}