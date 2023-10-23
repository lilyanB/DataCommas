import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
  const networks = searchParams.get('networks')
  const API = process.env.NEXT_PUBLIC_DECOMMAS_API
  const res = await fetch(`https://datalayer.decommas.net/datalayer/api/v1/transactions/${address}?networks=${networks}&api-key=${API}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()

  return NextResponse.json({ data: data.result }, { status: 200 })
}