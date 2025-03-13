import React from 'react'
import { Badge } from "./ui/badge"

interface NewsBadgeProps {
  category: string
  isSelected: boolean
  onClick: () => void
}

export function NewsBadge({ category, isSelected, onClick }: NewsBadgeProps) {
  return (
    <Badge variant={isSelected ? "default" : "outline"} className="cursor-pointer" onClick={onClick}>
      {category}
    </Badge>
  )
}

