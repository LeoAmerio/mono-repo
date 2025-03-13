import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

interface NewsCardProps {
  title: string
  summary: string
  date: string
  onSelect: () => void
}

export function NewsCard({ title, summary, date, onSelect }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2">{new Date(date).toLocaleDateString()}</p>
        <p className="text-sm line-clamp-3">{summary}</p>
      </CardContent>
      <div className="p-4 pt-0">
        <Button onClick={onSelect} variant="outline" className="w-full">
          Leer más
        </Button>
      </div>
    </Card>
  )
}

