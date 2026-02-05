import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
 
export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
 
    const data = await payload.find({
      collection: 'posts',
      limit: 10,
      depth: 2,
    })
 
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to fetch related posts' },
      { status: 500 }
    )
  }
}
 