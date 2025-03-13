"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import type { CreateExpenseDTO } from "../../../packages/shared/types"
// import { addExpense } from "../../lib/db"

export function ExpenseForm() {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const expenseData: CreateExpenseDTO = {
        description,
        amount: Number.parseFloat(amount),
        category,
        date: new Date().toISOString(),
      }

      // await addExpense(expenseData.description, expenseData.amount, expenseData.category, expenseData.date)
      setDescription("")
      setAmount("")
      setCategory("")
      router.refresh()
    } catch (error) {
      console.error("Error al agregar gasto:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Monto:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <button type="submit">Agregar Gasto</button>
    </form>
  )
}

