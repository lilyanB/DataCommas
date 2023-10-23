export async function GET(request: Request) {
  const API = process.env.NEXT_PUBLIC_DECOMMAS_API
  const res = await fetch(`https://datalayer.decommas.net/datalayer/api/v1/all_tokens_metadata?api-key=${API}`)
  const data = await res.json()

  return Response.json({ data })
}