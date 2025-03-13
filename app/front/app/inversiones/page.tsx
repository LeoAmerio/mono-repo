"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
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

export default function Inversiones() {
  const [inversiones, setInversiones] = useState([
    {
      id: 1,
      empresa: "Empresa A",
      sector: "Tecnología",
      fechaIngreso: "2023-01-01",
      montoInicial: 1000,
      montoActual: 1200,
    },
    {
      id: 2,
      empresa: "Empresa B",
      sector: "Finanzas",
      fechaIngreso: "2023-02-15",
      montoInicial: 1500,
      montoActual: 1450,
    },
    { id: 3, empresa: "Empresa C", sector: "Salud", fechaIngreso: "2023-03-10", montoInicial: 2000, montoActual: 2200 },
  ])

  const calcularPorcentajeCambio = (inicial: number, actual: number) => {
    return (((actual - inicial) / inicial) * 100).toFixed(2)
  }

  const agregarInversion = () => {
    const nuevaInversion = {
      id: inversiones.length + 1,
      empresa: "",
      sector: "",
      fechaIngreso: new Date().toISOString().split("T")[0],
      montoInicial: 0,
      montoActual: 0,
    }
    setInversiones([...inversiones, nuevaInversion])
  }

  const actualizarInversion = (id: number, campo: string, valor: string | number) => {
    const nuevasInversiones = inversiones.map((inversion) =>
      inversion.id === id ? { ...inversion, [campo]: valor } : inversion,
    )
    setInversiones(nuevasInversiones)
  }

  const datosGrafico = {
    labels: inversiones.map((inv) => inv.empresa),
    datasets: [
      {
        label: "Monto Inicial",
        data: inversiones.map((inv) => inv.montoInicial),
        backgroundColor: "rgba(75, 192, 0.5)",
      },
      {
        label: "Monto Actual",
        data: inversiones.map((inv) => inv.montoActual),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Seguimiento de Inversiones</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tabla de Inversiones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Fecha de Ingreso</TableHead>
                <TableHead>Monto Inicial</TableHead>
                <TableHead>Monto Actual</TableHead>
                <TableHead>% Cambio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inversiones.map((inversion) => (
                <TableRow key={inversion.id}>
                  <TableCell>
                    <Input
                      value={inversion.empresa}
                      onChange={(e) => actualizarInversion(inversion.id, "empresa", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={inversion.sector}
                      onChange={(e) => actualizarInversion(inversion.id, "sector", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={inversion.fechaIngreso}
                      onChange={(e) => actualizarInversion(inversion.id, "fechaIngreso", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={inversion.montoInicial}
                      onChange={(e) => actualizarInversion(inversion.id, "montoInicial", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={inversion.montoActual}
                      onChange={(e) => actualizarInversion(inversion.id, "montoActual", Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>{calcularPorcentajeCambio(inversion.montoInicial, inversion.montoActual)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={agregarInversion} className="mt-4">
            Agregar Inversión
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Inversiones</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={datosGrafico}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

