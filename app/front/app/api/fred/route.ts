// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     const series_id = searchParams.get('series_id')
    
//     const response = await fetch(
//       `https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${process.env.NEXT_PUBLIC_FRED_API_KEY}&file_type=json`
//     )
    
//     const data = await response.json()
//     return Response.json(data)
//   }

import { NextResponse } from "next/server"

const FRED_BASE_URL = "https://api.stlouisfed.org/fred"

async function fetchFredData(seriesId: string) {
  const response = await fetch(
    `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${process.env.NEXT_PUBLIC_FRED_API_KEY}&file_type=json`,
  )

  if (!response.ok) {
    throw new Error(`FRED API error: ${response.statusText}`)
  }

  return response.json()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const series = searchParams.get("series")

  if (!series) {
    return NextResponse.json({ error: "Series ID is required" }, { status: 400 })
  }

  try {
    const data = await fetchFredData(series)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching FRED data:", error)
    return NextResponse.json({ error: "Failed to fetch data from FRED" }, { status: 500 })
  }
}

