import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"

interface NewsModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  date: string
  url: string
}

export function NewsModal({ isOpen, onClose, title, content, date, url }: NewsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{new Date(date).toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>{content}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
            Leer artículo completo
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

