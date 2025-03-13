import React from 'react'
// import { getExpenses } from "../../lib/db"

export async function ExpenseList() {
  const expenses = await getExpenses()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Gastos</h2>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="border p-2 rounded">
            <p>
              <strong>{expense.description}</strong>
            </p>
            <p>Monto: ${expense.amount}</p>
            <p>Categoría: {expense.category}</p>
            <p>Fecha: {new Date(expense.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}