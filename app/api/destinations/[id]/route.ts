import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const destination = await sql`
      SELECT * FROM destinations WHERE id = ${params.id}
    `

    if (destination.length === 0) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, description, price, image_url, location, duration, rating, featured } = body

    const result = await sql`
      UPDATE destinations 
      SET name = ${name}, description = ${description}, price = ${price}, 
          image_url = ${image_url}, location = ${location}, duration = ${duration}, 
          rating = ${rating}, featured = ${featured}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await sql`
      DELETE FROM destinations WHERE id = ${params.id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Destination deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 })
  }
}
