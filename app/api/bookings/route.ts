import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const bookings = await sql`
      SELECT b.*, d.name as destination_name, d.location
      FROM bookings b
      LEFT JOIN destinations d ON b.destination_id = d.id
      ORDER BY b.created_at DESC
    `
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination_id, customer_name, customer_email, customer_phone, travel_date, guests, total_amount } = body

    const result = await sql`
      INSERT INTO bookings (destination_id, customer_name, customer_email, customer_phone, travel_date, guests, total_amount)
      VALUES (${destination_id}, ${customer_name}, ${customer_email}, ${customer_phone}, ${travel_date}, ${guests}, ${total_amount})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
