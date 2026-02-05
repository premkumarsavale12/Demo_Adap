// app/api/posts/route.ts
export async function GET() {
  try {
    const res = await fetch('https://adaptive-payload-cms.vercel.app/api/posts', {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
    })
    
    if (!res.ok) throw new Error('Failed to fetch')
    
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ docs: [] , error }, { status: 500 })
  }
}
