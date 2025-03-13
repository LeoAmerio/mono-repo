"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
// import { addInvestment } from "../lib/db"

export function InvestmentForm() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addInvestment(name, Number.parseFloat(amount), type, new Date().toISOString())
      setName("")
      setAmount("")
      setType("")
      router.refresh() // Actualiza la página para mostrar la nueva inversión
    } catch (error) {
      console.error("Error al agregar inversión:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la inversión"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Tipo de inversión"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
        Agregar Inversión
      </button>
    </form>
  )
}

