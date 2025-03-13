"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface SentimentData {
  date: string
  sentiment: number
}

export function MarketSentimentChart() {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([])

  useEffect(() => {
    // Aquí iría la lógica para obtener los datos de sentimiento del mercado
    // Por ahora, usaremos datos de ejemplo
    const mockData: SentimentData[] = [
      { date: "2023-06-01", sentiment: 0.6 },
      { date: "2023-06-02", sentiment: 0.7 },
      { date: "2023-06-03", sentiment: 0.5 },
      { date: "2023-06-04", sentiment: 0.8 },
      { date: "2023-06-05", sentiment: 0.4 },
    ]
    setSentimentData(mockData)
  }, [])

  const chartData = {
    labels: sentimentData.map((d) => d.date),
    datasets: [
      {
        label: "Sentimiento del Mercado",
        data: sentimentData.map((d) => d.sentiment),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sentimiento del Mercado",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentimiento del Mercado</CardTitle>
      </CardHeader>
      <CardContent>
        <Line options={chartOptions} data={chartData} />
      </CardContent>
    </Card>
  )
}

