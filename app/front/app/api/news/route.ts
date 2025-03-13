/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server"

// const FINNHUB_BASE_URL = "https://finnhub.io/api/v1"

// async function fetchFinnhubNews(category: string) {
//   const response = await fetch(`${FINNHUB_BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY}`)

//   if (!response.ok) {
//     throw new Error(`Finnhub API error: ${response.statusText}`)
//   }

//   return response.json()
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const category = searchParams.get("category") || "general"
//   const page = Number.parseInt(searchParams.get("page") || "1")
//   const limit = Number.parseInt(searchParams.get("limit") || "5")

//   try {
//     const allNews = await fetchFinnhubNews(category)
//     const startIndex = (page - 1) * limit
//     const endIndex = startIndex + limit
//     const paginatedNews = allNews.slice(startIndex, endIndex)

//     return NextResponse.json({
//       news: paginatedNews,
//       totalPages: Math.ceil(allNews.length / limit),
//       currentPage: page,
//     })
//   } catch (error) {
//     console.error("Error fetching news:", error)
//     return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1"

async function fetchFinnhubNews(category: string) {
  let finnhubCategory = "general"
  switch (category) {
    case "Macroeconomia":
      finnhubCategory = "general"
      break
    case "FED":
      finnhubCategory = "general"
      break
    case "USA":
      finnhubCategory = "general"
      break
    case "Argentina":
      finnhubCategory = "general"
      break
    case "Finanzas":
      finnhubCategory = "forex"
      break
  }

  const response = await fetch(
    `${FINNHUB_BASE_URL}/news?category=${finnhubCategory}&token=${process.env.FINNHUB_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error(`Finnhub API error: ${response.statusText}`)
  }

  const data = await response.json()

  // Filtrar las noticias según la categoría seleccionada
  return data.filter((news: any) => {
    switch (category) {
      case "Macroeconomia":
        return news.category === "economy"
      case "FED":
        return news.related.includes("Federal Reserve") || news.related.includes("FED") || news.related.includes("IMF")
      case "USA":
        return news.related.includes("United States") || news.related.includes("US economy")
      case "Argentina":
        return news.related.includes("Argentina") || news.related.includes("YPF") || news.related.includes("Galicia")
      case "Finanzas":
        return news.category === "forex" || news.category === "crypto" || news.category === "merger"
      default:
        return true
    }
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "Macroeconomia"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "5")

  try {
    const allNews = await fetchFinnhubNews(category)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = allNews.slice(startIndex, endIndex)

    return NextResponse.json({
      news: paginatedNews,
      totalPages: Math.ceil(allNews.length / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

