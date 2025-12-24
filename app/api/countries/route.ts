import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


// GET all countries
export async function GET() {
const countries = await prisma.country.findMany()
return NextResponse.json(countries)
}


// CREATE country
export async function POST(req: Request) {
const { name } = await req.json()
const country = await prisma.country.create({ data: { name } })
return NextResponse.json(country)
}


// UPDATE country
export async function PUT(req: Request) {
const { id, name } = await req.json()
const country = await prisma.country.update({
where: { id },
data: { name },
})
return NextResponse.json(country)
}


// DELETE country
export async function DELETE(req: Request) {
const { id } = await req.json()
await prisma.country.delete({ where: { id } })
return NextResponse.json({ message: "Deleted" })
}