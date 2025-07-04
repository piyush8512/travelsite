import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const destinations = await sql`
      SELECT * FROM destinations 
      ORDER BY created_at DESC
    `
    return NextResponse.json(destinations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image_url, location, duration, rating, featured } = body

    const result = await sql`
      INSERT INTO destinations (name, description, price, image_url, location, duration, rating, featured)
      VALUES (${name}, ${description}, ${price}, ${image_url}, ${location}, ${duration}, ${rating}, ${featured})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
  }
}
