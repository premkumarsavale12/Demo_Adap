// app/lib/Getposts.js
export async function fetchPosts() {
  try {
    const res = await fetch('/api/posts')  // ← Changed to proxy
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    //  console.log('✅ Proxy API response:', data)
    return data.docs || []
  } catch (error) {
    console.error('❌ fetchPosts error:', error)
    return []
  }
}
