import { getInvestments } from "@/lib/db"
import React from 'react'

export async function InvestmentList() {
  const investments = await getInvestments()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Inversiones</h2>
      <ul className="space-y-2">
        {investments.map((investment) => (
          <li key={investment.id} className="border p-2 rounded">
            <p>
              <strong>{investment.name}</strong>
            </p>
            <p>Monto: ${investment.amount}</p>
            <p>Tipo: {investment.type}</p>
            <p>Fecha: {new Date(investment.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

