// app/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies() // 👈 AQUÍ
  const token = cookieStore.get('token')?.value

  if (token) {
    redirect('/home')
  }

  redirect('/auth/login')
}
